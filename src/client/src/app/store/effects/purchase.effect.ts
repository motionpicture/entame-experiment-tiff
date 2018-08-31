import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { PurchaseService } from '../../services';
import {
    CreatePurchase,
    CreatePurchaseFail,
    CreatePurchaseSuccess,
    PurchaseActionTypes
} from '../actions';

/**
 * Purchase effects
 */
@Injectable()
export class PurchaseEffects {

    constructor(
        private actions: Actions,
        private user: PurchaseService
    ) { }

    /**
     * CreatePurchase
     */
    @Effect()
    public createPurchase = this.actions.pipe(
        ofType<CreatePurchase>(PurchaseActionTypes.CreatePurchase),
        map(action => action.payload),
        mergeMap(async () => {
            // return this.user.createPurchase().then((user) => {
            //     return new CreatePurchaseSuccess({ user: user });
            // }).catch((error) => {
            //     console.error(error);
            //     return new CreatePurchaseFail({ error: error });
            // });
            try {
                const user = await this.user.createPurchase();
                return new CreatePurchaseSuccess({ user: user });
            } catch (error) {
                return new CreatePurchaseFail({error: error});
            }
        })
    );
}
