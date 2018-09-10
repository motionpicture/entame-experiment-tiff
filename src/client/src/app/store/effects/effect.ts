import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { CoinService } from '../../services';
import { UserService } from '../../services';
import { FidoAction, NativeService } from '../../services/native';
import {
    AuthFido,
    AuthFidoFail,
    AuthFidoSuccess,
    CreateUser,
    CreateUserFail,
    CreateUserSuccess,
    DeleteFido,
    DeleteFidoFail,
    DeleteFidoSuccess,
    FidoActionTypes,
    LoadFido,
    LoadFidoFail,
    LoadFidoSuccess,
    PurchaseActionTypes,
    RegisterFido,
    RegisterFidoFail,
    RegisterFidoSuccess,
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
        private user: UserService,
        private native: NativeService
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

    /**
     * RegisterFido
     */
    @Effect()
    public registerFido = this.actions.pipe(
        ofType<RegisterFido>(FidoActionTypes.RegisterFido),
        map(action => action.payload),
        mergeMap(async () => {
            try {
                const device = await this.native.device();
                if (device === null) {
                    throw new Error('device is null');
                }
                const registerResult = await this.native.fido({
                    action: FidoAction.Register,
                    user: `${environment.APP_NAME}-${environment.ENV}-${device.uuid}`
                });
                if (!registerResult.isSuccess) {
                    throw Error(registerResult.error);
                }
                return new RegisterFidoSuccess();
            } catch (error) {
                return new RegisterFidoFail({ error: error });
            }
        })
    );

    /**
     * LoadFido
     */
    @Effect()
    public loadFido = this.actions.pipe(
        ofType<LoadFido>(FidoActionTypes.LoadFido),
        map(action => action.payload),
        mergeMap(async () => {
            try {
                const device = await this.native.device();
                if (device === null) {
                    throw new Error('device is null');
                }
                const registerListResult = await this.native.fido({
                    action: FidoAction.RegisterList,
                    user: `${environment.APP_NAME}-${environment.ENV}-${device.uuid}`
                });
                if (!registerListResult.isSuccess) {
                    throw new Error('registerList fail');
                }
                return new LoadFidoSuccess({ registerList: registerListResult.result });
            } catch (error) {
                return new LoadFidoFail({ error: error });
            }
        })
    );

    /**
     * AuthFido
     */
    @Effect()
    public authFido = this.actions.pipe(
        ofType<AuthFido>(FidoActionTypes.AuthFido),
        map(action => action.payload),
        mergeMap(async () => {
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
                return new AuthFidoSuccess();
            } catch (error) {
                return new AuthFidoFail({ error: error });
            }
        })
    );

    /**
     * DeleteFido
     */
    @Effect()
    public deleteFido = this.actions.pipe(
        ofType<DeleteFido>(FidoActionTypes.DeleteFido),
        map(action => action.payload),
        mergeMap(async () => {
            try {
                const device = await this.native.device();
                if (device === null) {
                    throw new Error('device is null');
                }
                const registerListResult = await this.native.fido({
                    action: FidoAction.RegisterList,
                    user: `${environment.APP_NAME}-${environment.ENV}-${device.uuid}`
                });
                if (!registerListResult.isSuccess) {
                    throw new Error('registerList fail');
                }
                const registerList = registerListResult.result;
                const removeResult = await this.native.fido({
                    action: FidoAction.Remove,
                    user: `${environment.APP_NAME}-${environment.ENV}-${device.uuid}`,
                    handle: registerList[0].handle
                });
                if (!removeResult.isSuccess) {
                    throw Error(removeResult.error);
                }
                return new DeleteFidoSuccess();
            } catch (error) {
                return new DeleteFidoFail({ error: error });
            }
        })
    );
}
