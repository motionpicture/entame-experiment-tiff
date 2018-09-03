import { PurchaseActions, PurchaseActionTypes } from '../actions';

/**
 * State
 */
export interface IPurchaseState {
    loading: boolean;
    ticket: boolean;
    goods: boolean;
    error: Error | null;
}

/**
 * Initial state
 */
export const initialPurchaseState: IPurchaseState = {
    loading: false,
    ticket: false,
    goods: false,
    error: null
};

function getInitialPurchaseState(): IPurchaseState {
    const json = localStorage.getItem('Purchase');
    if (json === null) {
        return initialPurchaseState;
    }
    const data = JSON.parse(json);
    return {
        loading: data.loading,
        ticket: data.ticket,
        goods: data.goods,
        error: data.error
    };
}

/**
 * purchaseReducer
 * @param state
 * @param action
 */
export function purchaseReducer(
    state = getInitialPurchaseState(),
    action: PurchaseActions
): IPurchaseState {
    switch (action.type) {
        case PurchaseActionTypes.UseCoin: {
            return { ...state, loading: true };
        }
        case PurchaseActionTypes.UseCoinSuccess: {
            if (action.payload.type === 'ticket') {

            }
            switch (action.payload.type) {
                case 'ticket': {
                    return { ...state, loading: false, ticket: true, error: null };
                }
                case 'goods': {
                    return { ...state, loading: false, goods: true, error: null };
                }
                default: {
                    return { ...state, loading: false, error: null };
                }
            }
        }
        case PurchaseActionTypes.UseCoinFail: {
            const error = action.payload.error;
            return { ...state, loading: false, error: error };
        }
        default: {
            return state;
        }
    }
}

/**
 * Selectors
 */
export const getPurchaseLoading = (state: IPurchaseState) => state.loading;
export const getTicket = (state: IPurchaseState) => state.ticket;
export const getGoods = (state: IPurchaseState) => state.goods;
