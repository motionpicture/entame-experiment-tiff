import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { Observable, race } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment';
import { ITicketInfo, ticketInfo } from '../../../../data/ticket';
import { User } from '../../../../models';
import { FidoAction, NativeService } from '../../../../services/native';
import { PurchaseActionTypes, UseCoin } from '../../../../store/actions';
import * as reducers from '../../../../store/reducers';
import { AlertModalComponent } from '../../../parts/alert-modal/alert-modal.component';

@Component({
    selector: 'app-ticket-confirm',
    templateUrl: './ticket-confirm.component.html',
    styleUrls: ['./ticket-confirm.component.scss']
})
export class TicketConfirmComponent implements OnInit {
    public ticketInfo: ITicketInfo;
    public user: Observable<User | null>;
    public isTicket: Observable<boolean>;

    constructor(
        private store: Store<reducers.IState>,
        private actions: Actions,
        private router: Router,
        private modal: NgbModal,
        private native: NativeService
    ) { }

    public ngOnInit() {
        this.ticketInfo = ticketInfo;
        this.user = this.store.pipe(select(reducers.getUser));
        this.isTicket = this.store.pipe(select(reducers.getTicket));
    }

    public async onSubmit() {
        try {
            const device = await this.native.device();
            if (device === null) {
                throw new Error('device is null');
            }
            const authenticationResult = await this.native.fido({
                action: FidoAction.Authentication,
                user: `${environment.APP_NAME}-${environment.ENV}-${device.uuid}`
            });
            if (!authenticationResult.isSuccess) {
                throw Error(authenticationResult.error);
            }
        } catch (error) {
            this.openAlert({ title: 'エラー', body: error.message });
            return;
        }
        this.user.subscribe((result) => {
            if (result === null) {
                this.router.navigate(['/error']);
                return;
            }
            const user = result;
            if (user.coinAccounts[0].availableBalance < this.ticketInfo.amount) {
                this.openAlert({ title: 'エラー', body: 'コインが不足しています' });
                return;
            }

            this.store.dispatch(new UseCoin({
                type: 'ticket',
                userName: user.userName,
                coinAccount: user.coinAccounts[0],
                amount: this.ticketInfo.amount,
                notes: this.ticketInfo.usedNotes
            }));

        }).unsubscribe();

        const success = this.actions.pipe(
            ofType(PurchaseActionTypes.UseCoinSuccess),
            tap(() => {
                // 成功時の処理
                this.router.navigate(['/ticket/complete']);
            })
        );

        const fail = this.actions.pipe(
            ofType(PurchaseActionTypes.UseCoinFail),
            tap(() => {
                // エラー時の処理
                this.router.navigate(['/error']);
                return;
            })
        );
        race(success, fail).pipe(take(1)).subscribe();
    }

    private openAlert(args: {
        title: string;
        body: string;
    }) {
        const modalRef = this.modal.open(AlertModalComponent, {
            centered: true
        });
        modalRef.componentInstance.title = args.title;
        modalRef.componentInstance.body = args.body;
    }

}
