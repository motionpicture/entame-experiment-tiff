import { Action } from '@ngrx/store';
/**
 * Action types
 */
export enum FidoActionTypes {
    RegisterFido = '[Fido] Register',
    RegisterFidoSuccess = '[Fido] Register Success',
    RegisterFidoFail = '[Fido] Register Fail',
    LoadFido = '[Fido] Load',
    LoadFidoSuccess = '[Fido] Load Success',
    LoadFidoFail = '[Fido] Load Fail',
    AuthFido = '[Fido] Auth',
    AuthFidoSuccess = '[Fido] Auth Success',
    AuthFidoFail = '[Fido] Auth Fail',
    DeleteFido = '[Fido] Delete',
    DeleteFidoSuccess = '[Fido] Delete Success',
    DeleteFidoFail = '[Fido] Delete Fail',
}

/**
 * RegisterFido
 */
export class RegisterFido implements Action {
    public readonly type = FidoActionTypes.RegisterFido;
    constructor(public payload?: {}) { }
}

/**
 * RegisterFidoSuccess
 */
export class RegisterFidoSuccess implements Action {
    public readonly type = FidoActionTypes.RegisterFidoSuccess;
    constructor(public payload?: {}) { }
}

/**
 * RegisterFidoFail
 */
export class RegisterFidoFail implements Action {
    public readonly type = FidoActionTypes.RegisterFidoFail;
    constructor(public payload: { error: Error }) { }
}

/**
 * LoadFido
 */
export class LoadFido implements Action {
    public readonly type = FidoActionTypes.LoadFido;
    constructor(public payload?: {}) { }
}

/**
 * LoadFidoSuccess
 */
export class LoadFidoSuccess implements Action {
    public readonly type = FidoActionTypes.LoadFidoSuccess;
    constructor(public payload?: {}) { }
}

/**
 * LoadFidoFail
 */
export class LoadFidoFail implements Action {
    public readonly type = FidoActionTypes.LoadFidoFail;
    constructor(public payload: { error: Error }) { }
}


/**
 * AuthFido
 */
export class AuthFido implements Action {
    public readonly type = FidoActionTypes.AuthFido;
    constructor(public payload?: {}) { }
}

/**
 * AuthFidoSuccess
 */
export class AuthFidoSuccess implements Action {
    public readonly type = FidoActionTypes.AuthFidoSuccess;
    constructor(public payload?: {}) { }
}

/**
 * AuthFidoFail
 */
export class AuthFidoFail implements Action {
    public readonly type = FidoActionTypes.AuthFidoFail;
    constructor(public payload: { error: Error }) { }
}

/**
 * DeleteFido
 */
export class DeleteFido implements Action {
    public readonly type = FidoActionTypes.DeleteFido;
    constructor(public payload?: {}) { }
}

/**
 * DeleteFidoSuccess
 */
export class DeleteFidoSuccess implements Action {
    public readonly type = FidoActionTypes.DeleteFidoSuccess;
    constructor(public payload?: {}) { }
}

/**
 * DeleteFidoFail
 */
export class DeleteFidoFail implements Action {
    public readonly type = FidoActionTypes.DeleteFidoFail;
    constructor(public payload: { error: Error }) { }
}

/**
 * Actions
 */
export type FidoActions =
    | RegisterFido
    | RegisterFidoSuccess
    | RegisterFidoFail
    | LoadFido
    | LoadFidoSuccess
    | LoadFidoFail
    | AuthFido
    | AuthFidoSuccess
    | AuthFidoFail
    | DeleteFido
    | DeleteFidoSuccess
    | DeleteFidoFail;
