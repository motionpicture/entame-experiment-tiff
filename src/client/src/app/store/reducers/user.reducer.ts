import { User } from '../../models';
import { UserActions, UserActionTypes } from '../actions';

/**
 * State
 */
export interface IUserState {
    loading: boolean;
    user: User | null;
    error: Error | null;
}

/**
 * Initial state
 */
export const initialUserState: IUserState = {
    loading: false,
    user: null,
    error: null
};

function getInitialUserState(): IUserState {
    const json = localStorage.getItem('User');
    if (json === null) {
        return initialUserState;
    }
    const data = JSON.parse(json);
    return {
        loading: data.loading,
        user: (data.user === null)
            ? null
            : new User(data.user),
        error: data.error
    };
}

/**
 * Reducer
 * @param state
 * @param action
 */
export function userReducer(
    state = getInitialUserState(),
    action: UserActions
): IUserState {
    switch (action.type) {
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
        default: {
            return state;
        }
    }
}

/**
 * Selectors
 */
export const getUserLoading = (state: IUserState) => state.loading;
export const getUser = (state: IUserState) => state.user;
