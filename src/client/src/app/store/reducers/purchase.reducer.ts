import { Purchase } from '../../models';
import { PurchaseActions, PurchaseActionTypes } from '../actions';

/**
 * State
 */
export interface IPurchaseState {
    loading: boolean;
    user: Purchase | null;
    error: Error | null;
}

/**
 * Initial state
 */
export const initialPurchaseState: IPurchaseState = {
    loading: false,
    user: null,
    error: null
};

function getInitialPurchaseState(): IPurchaseState {
    const json = sessionStorage.getItem('Purchase');
    if (json === null) {
        return initialPurchaseState;
    }
    const data = JSON.parse(json);
    return {
        loading: data.loading,
        user: (data.user === null)
            ? null
            : new Purchase(data.user),
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
        case PurchaseActionTypes.CreatePurchase: {
            return { ...state, loading: true };
        }
        case PurchaseActionTypes.CreatePurchaseSuccess: {
            const user = action.payload.user;
            return { ...state, loading: false, user: user, error: null };
        }
        case PurchaseActionTypes.CreatePurchaseFail: {
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
export const getPurchase = (state: IPurchaseState) => state.user;
