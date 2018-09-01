import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { PurchaseService } from '../../services';
import {
    PurchaseActionTypes,
    PurchaseTicket,
    PurchaseTicketFail,
    PurchaseTicketSuccess
} from '../actions';

/**
 * Purchase effects
 */
@Injectable()
export class PurchaseEffects {

    constructor(
        private actions: Actions,
        private purchase: PurchaseService
    ) { }

    /**
     * PurchaseTicket
     */
    @Effect()
    public purchaseTicket = this.actions.pipe(
        ofType<PurchaseTicket>(PurchaseActionTypes.PurchaseTicket),
        map(action => action.payload),
        mergeMap(async () => {
            try {
                this.purchase.purchaseTicket();
                return new PurchaseTicketSuccess();
            } catch (error) {
                return new PurchaseTicketFail({error: error});
            }
        })
    );
}
