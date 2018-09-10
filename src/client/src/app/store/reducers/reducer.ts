import { User } from '../../models';
import {
    FidoActions,
    FidoActionTypes,
    PurchaseActions,
    PurchaseActionTypes,
    UserActions,
    UserActionTypes
} from '../actions';

/**
 * State
 */
export interface IState {
    loading: boolean;
    error: Error | null;
    user: User | null;
    purchase: {
        ticket: boolean;
        goods: boolean;
    };
    fido: {
        registerList: any[]
    };
}

/**
 * Initial state
 */
export const initialState: IState = {
    loading: false,
    error: null,
    user: null,
    purchase: {
        ticket: false,
        goods: false
    },
    fido: {
        registerList: []
    }
};

function getInitialState(): IState {
    const json = localStorage.getItem('App');
    if (json === null) {
        return initialState;
    }
    const data = JSON.parse(json);
    return {
        loading: data.loading,
        error: data.error,
        user: (data.user === null) ? null : new User(data.user),
        purchase: data.purchase,
        fido: data.fido
    };
}

/**
 * Reducer
 * @param state
 * @param action
 */
export function reducer(
    state = getInitialState(),
    action: PurchaseActions | UserActions | FidoActions
): IState {
    switch (action.type) {
        case PurchaseActionTypes.UseCoin: {
            return { ...state, loading: true };
        }
        case PurchaseActionTypes.UseCoinSuccess: {
            if (action.payload.type === 'ticket') {

            }
            switch (action.payload.type) {
                case 'ticket': {
                    const purchase = { ...state.purchase, ticket: true };
                    return { ...state, loading: false, error: null, purchase: purchase };
                }
                case 'goods': {
                    const purchase = { ...state.purchase, goods: true };
                    return { ...state, loading: false, error: null, purchase: purchase };
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
        case UserActionTypes.CreateUser: {
            return { ...state, loading: true };
        }
        case UserActionTypes.CreateUserSuccess: {
            const user = action.payload.user;
            return { ...state, loading: false, user: user, error: null };
        }
        case UserActionTypes.CreateUserFail: {
            const error = action.payload.error;
            return { ...state, loading: false, error: error };
        }
        case UserActionTypes.UpdateUser: {
            return { ...state, loading: true };
        }
        case UserActionTypes.UpdateUserSuccess: {
            const user = action.payload.user;
            return { ...state, loading: false, user: user, error: null };
        }
        case UserActionTypes.UpdateUserFail: {
            const error = action.payload.error;
            return { ...state, loading: false, error: error };
        }
        case UserActionTypes.ResetUser: {
            return { ...state, loading: true };
        }
        case UserActionTypes.ResetUserSuccess: {
            const user = action.payload.user;
            const purchase = { ticket: false, goods: false };
            return { ...state, loading: false, user: user, error: null, purchase: purchase };
        }
        case UserActionTypes.ResetUserFail: {
            const error = action.payload.error;
            return { ...state, loading: false, error: error };
        }
        case FidoActionTypes.RegisterFido: {
            return { ...state, loading: true };
        }
        case FidoActionTypes.RegisterFidoSuccess: {
            return { ...state, loading: false, error: null };
        }
        case FidoActionTypes.RegisterFidoFail: {
            const error = action.payload.error;
            return { ...state, loading: false, error: error };
        }
        case FidoActionTypes.LoadFido: {
            return { ...state, loading: true };
        }
        case FidoActionTypes.LoadFidoSuccess: {
            const registerList = action.payload.registerList;
            const fido = { ...state.fido, registerList: registerList };
            return { ...state, loading: false, error: null, fido: fido };
        }
        case FidoActionTypes.LoadFidoFail: {
            const error = action.payload.error;
            return { ...state, loading: false, error: error };
        }
        case FidoActionTypes.AuthFido: {
            return { ...state, loading: true };
        }
        case FidoActionTypes.AuthFidoSuccess: {
            return { ...state, loading: false, error: null };
        }
        case FidoActionTypes.AuthFidoFail: {
            const error = action.payload.error;
            return { ...state, loading: false, error: error };
        }
        case FidoActionTypes.DeleteFido: {
            return { ...state, loading: true };
        }
        case FidoActionTypes.DeleteFidoSuccess: {
            return { ...state, loading: false, error: null };
        }
        case FidoActionTypes.DeleteFidoFail: {
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
export const getLoading = (state: IState) => state.loading;
export const getUser = (state: IState) => state.user;
export const getPurchaseTicket = (state: IState) => state.purchase.ticket;
export const getPurchaseGoods = (state: IState) => state.purchase.goods;
export const getFidoRegisterList = (state: IState) => state.fido.registerList;
export const getError = (state: IState) => state.error;
