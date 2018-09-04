import {
    createFeatureSelector,
    createSelector
} from '@ngrx/store';
import * as reducer from './reducer';

/**
 * State and reducer
 */
export { IState, reducer } from './reducer';

/**
 * Selectors
 */
export const getFeatureState = createFeatureSelector<reducer.IState>('App');
export const getLoading = createSelector(getFeatureState, reducer.getLoading);
export const getUser = createSelector(getFeatureState, reducer.getUser);
export const getTicket = createSelector(getFeatureState, reducer.getTicket);
export const getGoods = createSelector(getFeatureState, reducer.getGoods);
