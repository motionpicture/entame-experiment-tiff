import { Action } from '@ngrx/store';

/**
 * Action types
 */
export enum PurchaseActionTypes {
    PurchaseTicket = '[Purchase] Purchase Ticket',
    PurchaseTicketSuccess = '[Purchase] Purchase Ticket Success',
    PurchaseTicketFail = '[Purchase] Purchase Ticket Fail',
}

/**
 * PurchaseTicket
 */
export class PurchaseTicket implements Action {
    public readonly type = PurchaseActionTypes.PurchaseTicket;
    constructor(public payload?: {}) { }
}

/**
 * PurchaseTicketSuccess
 */
export class PurchaseTicketSuccess implements Action {
    public readonly type = PurchaseActionTypes.PurchaseTicketSuccess;
    constructor(public payload?: {}) { }
}

/**
 * PurchaseTicketFail
 */
export class PurchaseTicketFail implements Action {
    public readonly type = PurchaseActionTypes.PurchaseTicketFail;
    constructor(public payload: { error: Error }) { }
}


/**
 * Actions
 */
export type PurchaseActions =
    | PurchaseTicket
    | PurchaseTicketSuccess
    | PurchaseTicketFail;
