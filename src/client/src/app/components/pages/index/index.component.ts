import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable, race } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { User } from '../../../models';
import {
    UpdateUser,
    UserActionTypes
} from '../../../store/actions';
import {
    getPurchaseLoading,
    getTicket,
    getUser,
    getUserLoading,
    IPurchaseState,
    IUserState
} from '../../../store/reducers';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
    public isUserLoading: Observable<boolean>;
    public user: Observable<User | null>;
    public isPurchaseLoading: Observable<boolean>;
    public isTicket: Observable<boolean>;

    constructor(
        private userStore: Store<IUserState>,
        private purchaseStore: Store<IPurchaseState>,
        private actions: Actions,
        private router: Router
    ) { }

    public ngOnInit() {
        this.isUserLoading = this.userStore.select(getUserLoading);
        this.user = this.userStore.select(getUser);
        this.user.subscribe((result) => {
            if (result === null) {
                this.router.navigate(['/error']);
                return;
            }
            this.update({ user: result });
        });
        this.isPurchaseLoading = this.purchaseStore.select(getPurchaseLoading);
        this.isTicket = this.purchaseStore.select(getTicket);
    }

    /**
     * update
     */
    public update(args: { user: User }) {
        this.userStore.dispatch(new UpdateUser({ user: args.user }));

        const success = this.actions.pipe(
            ofType(UserActionTypes.UpdateUserSuccess),
            tap(() => {
                console.log('UpdateUserSuccess');
            })
        );

        const fail = this.actions.pipe(
            ofType(UserActionTypes.UpdateUserFail),
            tap(() => {
                console.log('UpdateUserFail');
                this.router.navigate(['/error']);
            })
        );
        race(success, fail).pipe(take(1)).subscribe();
    }

}
