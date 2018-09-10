/**
 * FidoGuardService
 */
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { Observable, race } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { FidoActionTypes, LoadFido } from '../store/actions';
import * as reducers from '../store/reducers';

@Injectable({
    providedIn: 'root'
})
export class FidoGuardService implements CanActivate {
    public error: Observable<Error | null>;
    constructor(
        private router: Router,
        private store: Store<reducers.IState>,
        private actions: Actions
    ) { }

    /**
     * 認証
     * @method canActivate
     */
    public async canActivate() {
        this.error = this.store.pipe(select(reducers.getError));
        try {
            await this.loadFido();
            return true;
        } catch (error) {
            console.log('canActivate', error);
            this.router.navigate(['/fido/register']);
            return false;
        }
    }

    private async loadFido() {
        this.store.dispatch(new LoadFido());
        return new Promise((resolve, reject) => {
            const success = this.actions.pipe(
                ofType(FidoActionTypes.LoadFidoSuccess),
                tap(() => resolve())
            );
            const fail = this.actions.pipe(
                ofType(FidoActionTypes.LoadFidoFail),
                tap(() => {
                    this.error.subscribe((error) => {
                        reject(error);
                    });
                })
            );
            race(success, fail).pipe(take(1)).subscribe();
        });
    }
}
