import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable, race } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { goodsInfo, IGoodsInfo } from '../../../../data/goods';
import { User } from '../../../../models';
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
        private userStore: Store<reducers.IUserState>,
        private purchaseStore: Store<reducers.IPurchaseState>,
        private actions: Actions,
        private router: Router,
        private modal: NgbModal
    ) { }

    public ngOnInit() {
        this.goodsInfo = goodsInfo;
        this.user = this.userStore.select(reducers.getUser);
        this.isLoading = this.purchaseStore.select(reducers.getPurchaseLoading);
        this.isGoods = this.purchaseStore.select(reducers.getGoods);
    }

    public onSubmit() {
        this.user.subscribe((result) => {
            if (result === null) {
                this.router.navigate(['/error']);
                return;
            }
            const user = result;
            if (user.coinAccounts[0].availableBalance < this.goodsInfo.amount) {
                this.openAlert({
                    title: 'エラー',
                    body: 'コインが不足しています'
                });
                return;
            }

            this.purchaseStore.dispatch(new UseCoin({
                type: 'goods',
                userName: user.userName,
                coinAccount: user.coinAccounts[0],
                amount: this.goodsInfo.amount,
                notes: this.goodsInfo.usedNotes
            }));

        });

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
