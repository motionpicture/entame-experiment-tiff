import { Action } from '@ngrx/store';
import { User } from '../../models';

/**
 * Action types
 */
export enum UserActionTypes {
    CreateUser = '[User] Create',
    CreateUserSuccess = '[User] Create Success',
    CreateUserFail = '[User] Create Fail',
    UpdateUser = '[User] Update',
    UpdateUserSuccess = '[User] Update Success',
    UpdateUserFail = '[User] Update Fail',
    ResetUser = '[User] Reset',
    ResetUserSuccess = '[User] Reset Success',
    ResetUserFail = '[User] Reset Fail',
}

/**
 * CreateUser
 */
export class CreateUser implements Action {
    public readonly type = UserActionTypes.CreateUser;
    constructor(public payload?: {}) { }
}

/**
 * CreateUserSuccess
 */
export class CreateUserSuccess implements Action {
    public readonly type = UserActionTypes.CreateUserSuccess;
    constructor(public payload: { user: User }) { }
}

/**
 * CreateUserFail
 */
export class CreateUserFail implements Action {
    public readonly type = UserActionTypes.CreateUserFail;
    constructor(public payload: { error: Error }) { }
}

/**
 * UpdateUser
 */
export class UpdateUser implements Action {
    public readonly type = UserActionTypes.UpdateUser;
    constructor(public payload: { user: User }) { }
}

/**
 * UpdateUserSuccess
 */
export class UpdateUserSuccess implements Action {
    public readonly type = UserActionTypes.UpdateUserSuccess;
    constructor(public payload: { user: User }) { }
}

/**
 * UpdateUserFail
 */
export class UpdateUserFail implements Action {
    public readonly type = UserActionTypes.UpdateUserFail;
    constructor(public payload: { error: Error }) { }
}


/**
 * ResetUser
 */
export class ResetUser implements Action {
    public readonly type = UserActionTypes.ResetUser;
    constructor(public payload: { user: User }) { }
}

/**
 * ResetUserSuccess
 */
export class ResetUserSuccess implements Action {
    public readonly type = UserActionTypes.ResetUserSuccess;
    constructor(public payload: { user: User }) { }
}

/**
 * ResetUserFail
 */
export class ResetUserFail implements Action {
    public readonly type = UserActionTypes.ResetUserFail;
    constructor(public payload: { error: Error }) { }
}

/**
 * Actions
 */
export type UserActions =
    | CreateUser
    | CreateUserSuccess
    | CreateUserFail
    | UpdateUser
    | UpdateUserSuccess
    | UpdateUserFail
    | ResetUser
    | ResetUserSuccess
    | ResetUserFail;
