import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { Observable, race } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { ITicketInfo, ticketInfo } from '../../../../data/ticket';
import { User } from '../../../../models';
import { AuthFido, FidoActionTypes, PurchaseActionTypes, UseCoin } from '../../../../store/actions';
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
    public error: Observable<Error | null>;

    constructor(
        private store: Store<reducers.IState>,
        private actions: Actions,
        private router: Router,
        private modal: NgbModal
    ) { }

    public ngOnInit() {
        this.ticketInfo = ticketInfo;
        this.user = this.store.pipe(select(reducers.getUser));
        this.isTicket = this.store.pipe(select(reducers.getPurchaseTicket));
        this.error = this.store.pipe(select(reducers.getError));
    }

    public onSubmit() {
        this.user.subscribe(async (user) => {
            if (user === null) {
                this.router.navigate(['/error']);
                return;
            }
            if (user.coinAccounts[0].availableBalance < this.ticketInfo.amount) {
                this.openAlert({ title: 'エラー', body: 'コインが不足しています' });
                return;
            }
            try {
                await this.authFido();
            } catch (error) {
                this.error.subscribe((error) => {
                    this.openAlert({ title: 'エラー', body: (error === null) ? '' : error.message });
                }).unsubscribe();
                return;
            }
            try {
                await this.useCoin(user);
                this.router.navigate(['/ticket/complete']);
            } catch (error) {
                this.router.navigate(['/error']);
            }
        }).unsubscribe();
    }

    private async authFido() {
        this.store.dispatch(new AuthFido());
        return new Promise((resolve, reject) => {
            const success = this.actions.pipe(
                ofType(FidoActionTypes.AuthFidoSuccess),
                tap(() => resolve())
            );
            const fail = this.actions.pipe(
                ofType(FidoActionTypes.AuthFidoFail),
                tap(() => {
                    this.error.subscribe((error) => {
                        reject(error);
                    });
                })
            );
            race(success, fail).pipe(take(1)).subscribe();
        });
    }

    private async useCoin(user: User) {
        this.store.dispatch(new UseCoin({
            type: 'ticket',
            userName: user.userName,
            coinAccount: user.coinAccounts[0],
            amount: this.ticketInfo.amount,
            notes: this.ticketInfo.usedNotes
        }));
        return new Promise((resolve, reject) => {
            const success = this.actions.pipe(
                ofType(PurchaseActionTypes.UseCoinSuccess),
                tap(() => resolve())
            );
            const fail = this.actions.pipe(
                ofType(PurchaseActionTypes.UseCoinFail),
                tap(() => {
                    this.error.subscribe((error) => {
                        reject(error);
                    });
                })
            );
            race(success, fail).pipe(take(1)).subscribe();
        });
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
