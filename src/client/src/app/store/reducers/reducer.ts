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
    ticket: boolean;
    goods: boolean;
}

/**
 * Initial state
 */
export const initialState: IState = {
    loading: false,
    error: null,
    user: null,
    ticket: false,
    goods: false,
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
        ticket: data.ticket,
        goods: data.goods

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
            return { ...state, loading: false, user: user, ticket: false, goods: false, error: null };
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
            return { ...state, loading: false, error: null };
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
export const getTicket = (state: IState) => state.ticket;
export const getGoods = (state: IState) => state.goods;
export const getError = (state: IState) => state.error;
