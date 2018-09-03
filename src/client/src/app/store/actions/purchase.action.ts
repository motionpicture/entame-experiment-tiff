import { factory } from '@mocoin/api-javascript-client';
import { Action } from '@ngrx/store';

/**
 * Action types
 */
export enum PurchaseActionTypes {
    UseCoin = '[Purchase] Use Coin',
    UseCoinSuccess = '[Purchase] Use Coin Success',
    UseCoinFail = '[Purchase] Use Coin Fail',
}

/**
 * Purchase
 */
export class UseCoin implements Action {
    public readonly type = PurchaseActionTypes.UseCoin;
    constructor(public payload: {
        type: 'ticket' | 'goods';
        amount: number;
        userName: string;
        coinAccount: factory.pecorino.account.IAccount<factory.accountType.Coin>;
        notes: string;
    }) { }
}

/**
 * UseCoinSuccess
 */
export class UseCoinSuccess implements Action {
    public readonly type = PurchaseActionTypes.UseCoinSuccess;
    constructor(public payload: {
        type: 'ticket' | 'goods';
    }) { }
}

/**
 * UseCoinFail
 */
export class UseCoinFail implements Action {
    public readonly type = PurchaseActionTypes.UseCoinFail;
    constructor(public payload: { error: Error }) { }
}


/**
 * Actions
 */
export type PurchaseActions =
    | UseCoin
    | UseCoinSuccess
    | UseCoinFail;
