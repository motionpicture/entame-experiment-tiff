import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { Observable, race } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment';
import { goodsInfo, IGoodsInfo } from '../../../../data/goods';
import { User } from '../../../../models';
import { FidoAction, NativeService } from '../../../../services/native';
import { PurchaseActionTypes, UseCoin } from '../../../../store/actions';
import * as reducers from '../../../../store/reducers';
import { AlertModalComponent } from '../../../parts/alert-modal/alert-modal.component';


@Component({
    selector: 'app-goods-confirm',
    templateUrl: './goods-confirm.component.html',
    styleUrls: ['./goods-confirm.component.scss']
})
export class GoodsConfirmComponent implements OnInit {
    public goodsInfo: IGoodsInfo;
    public user: Observable<User | null>;
    public isLoading: Observable<boolean>;
    public isGoods: Observable<boolean>;

    constructor(
        private store: Store<reducers.IState>,
        private actions: Actions,
        private router: Router,
        private modal: NgbModal,
        private native: NativeService
    ) { }

    public ngOnInit() {
        this.goodsInfo = goodsInfo;
        this.user = this.store.pipe(select(reducers.getUser));
        this.isLoading = this.store.pipe(select(reducers.getLoading));
        this.isGoods = this.store.pipe(select(reducers.getGoods));
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
            if (user.coinAccounts[0].availableBalance < this.goodsInfo.amount) {
                this.openAlert({ title: 'エラー', body: 'コインが不足しています' });
                return;
            }

            this.store.dispatch(new UseCoin({
                type: 'goods',
                userName: user.userName,
                coinAccount: user.coinAccounts[0],
                amount: this.goodsInfo.amount,
                notes: this.goodsInfo.usedNotes
            }));

        }).unsubscribe();

        const success = this.actions.pipe(
            ofType(PurchaseActionTypes.UseCoinSuccess),
            tap(() => {
                // 成功時の処理
                this.router.navigate(['/goods/complete']);
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
