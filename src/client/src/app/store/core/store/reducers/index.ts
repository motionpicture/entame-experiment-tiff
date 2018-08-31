// tslint:disable:no-empty-interface
import {
    ActionReducer,
    ActionReducerMap,
    MetaReducer
} from '@ngrx/store';

/**
 * Root state
 */
export interface IState {
}

/**
 * Reducers
 */
export const reducers: ActionReducerMap<IState> = {
};

/**
 * Logger
 */
export function logger(reducer: ActionReducer<IState>) {
    return (state: any, action: any) => {
        const newState = reducer(state, action);
        console.log('action', action);
        console.log('state', newState);
        return newState;
    };
}

/**
 * storageSync
 */
export function storageSync(reducer: ActionReducer<IState>) {
    return (state: any, action: any) => {
        const newState = reducer(state, action);
        Object.keys(newState).forEach((key) => {
            sessionStorage.setItem(key, JSON.stringify((<any>newState)[key]));
        });
        sessionStorage.setItem('state', JSON.stringify(newState));
        return newState;
    };
}

/**
 * Meta reducer
 */
export const metaReducers: MetaReducer<IState>[] = [logger, storageSync];
