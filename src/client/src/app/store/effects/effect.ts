import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { CoinService } from '../../services';
import { UserService } from '../../services';
import {
    CreateUser,
    CreateUserFail,
    CreateUserSuccess,
    PurchaseActionTypes,
    ResetUser,
    ResetUserFail,
    ResetUserSuccess,
    UpdateUser,
    UpdateUserFail,
    UpdateUserSuccess,
    UseCoin,
    UseCoinFail,
    UseCoinSuccess,
    UserActionTypes
} from '../actions';

/**
 * UseCoin effects
 */
@Injectable()
export class Effects {

    constructor(
        private actions: Actions,
        private coin: CoinService,
        private user: UserService
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

    /**
     * CreateUser
     */
    @Effect()
    public createUser = this.actions.pipe(
        ofType<CreateUser>(UserActionTypes.CreateUser),
        map(action => action.payload),
        mergeMap(async () => {
            try {
                const user = await this.user.createUser();
                return new CreateUserSuccess({ user: user });
            } catch (error) {
                return new CreateUserFail({ error: error });
            }
        })
    );

    /**
     * UpdateUser
     */
    @Effect()
    public updateUser = this.actions.pipe(
        ofType<UpdateUser>(UserActionTypes.UpdateUser),
        map(action => action.payload),
        mergeMap(async (payload) => {
            try {
                const user = await this.user.updateUser({ user: payload.user });
                return new UpdateUserSuccess({ user: user });
            } catch (error) {
                return new UpdateUserFail({ error: error });
            }
        })
    );

    /**
     * ResetUser
     */
    @Effect()
    public resetUser = this.actions.pipe(
        ofType<ResetUser>(UserActionTypes.ResetUser),
        map(action => action.payload),
        mergeMap(async (payload) => {
            try {
                const user = await this.user.resetUser({ user: payload.user });
                return new ResetUserSuccess({ user: user });
            } catch (error) {
                return new ResetUserFail({ error: error });
            }
        })
    );
}
