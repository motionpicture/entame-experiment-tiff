import { Action } from '@ngrx/store';
import { Purchase } from '../../models';

/**
 * Action types
 */
export enum PurchaseActionTypes {
    CreatePurchase = '[Purchase] Create',
    CreatePurchaseSuccess = '[Purchase] Create Success',
    CreatePurchaseFail = '[Purchase] Create Fail',
}

/**
 * CreatePurchase
 */
export class CreatePurchase implements Action {
    public readonly type = PurchaseActionTypes.CreatePurchase;
    constructor(public payload?: {}) { }
}

/**
 * CreatePurchaseSuccess
 */
export class CreatePurchaseSuccess implements Action {
    public readonly type = PurchaseActionTypes.CreatePurchaseSuccess;
    constructor(public payload: { user: Purchase }) { }
}

/**
 * CreatePurchaseFail
 */
export class CreatePurchaseFail implements Action {
    public readonly type = PurchaseActionTypes.CreatePurchaseFail;
    constructor(public payload: { error: Error }) { }
}


/**
 * Actions
 */
export type PurchaseActions =
    | CreatePurchase
    | CreatePurchaseSuccess
    | CreatePurchaseFail;
