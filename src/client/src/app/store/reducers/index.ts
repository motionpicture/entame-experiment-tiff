import {
    createFeatureSelector,
    createSelector
} from '@ngrx/store';
import * as purchaseReducer from './purchase.reducer';
import * as userReducer from './user.reducer';

/**
 * State and reducer
 */
export { IUserState, userReducer } from './user.reducer';
export { IPurchaseState, purchaseReducer } from './purchase.reducer';

/**
 * Selectors
 */
export const getFeatureUserState = createFeatureSelector<userReducer.IUserState>('User');
export const getUserLoading = createSelector(getFeatureUserState, userReducer.getUserLoading);
export const getUser = createSelector(getFeatureUserState, userReducer.getUser);

export const getFeaturePurchaseState = createFeatureSelector<purchaseReducer.IPurchaseState>('Purchase');
export const getPurchaseLoading = createSelector(getFeatureUserState, purchaseReducer.getPurchaseLoading);
export const getPurchase = createSelector(getFeatureUserState, purchaseReducer.getPurchase);
