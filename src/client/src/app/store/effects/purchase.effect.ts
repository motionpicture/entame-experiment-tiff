import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { CoinService } from '../../services';
import {
    PurchaseActionTypes,
    UseCoin,
    UseCoinFail,
    UseCoinSuccess
} from '../actions';

/**
 * UseCoin effects
 */
@Injectable()
export class PurchaseEffects {

    constructor(
        private actions: Actions,
        private coin: CoinService
    ) { }

    /**
     * UseCoin
     */
    @Effect()
    public purchaseTicket = this.actions.pipe(
        ofType<UseCoin>(PurchaseActionTypes.UseCoin),
        map(action => action.payload),
        mergeMap(async (payload) => {
            try {
                await this.coin.useCoinProcess({
                    amount: payload.amount,
                    userName: payload.userName,
                    coinAccount: payload.coinAccount,
                    notes: payload.notes
                });
                return new UseCoinSuccess({ type: payload.type });
            } catch (error) {
                return new UseCoinFail({ error: error });
            }
        })
    );
}
