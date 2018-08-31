import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { UserService } from '../../services';
import {
    CreateUser,
    CreateUserFail,
    CreateUserSuccess,
    UpdateUser,
    UpdateUserFail,
    UpdateUserSuccess,
    UserActionTypes
} from '../actions';

/**
 * User effects
 */
@Injectable()
export class UserEffects {

    constructor(
        private actions: Actions,
        private user: UserService
    ) { }

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
            console.log('Effect updateUser', payload);
            try {
                const user = await this.user.updateUser({ user: payload.user });
                return new UpdateUserSuccess({ user: user });
            } catch (error) {
                return new UpdateUserFail({ error: error });
            }
        })
    );
}
