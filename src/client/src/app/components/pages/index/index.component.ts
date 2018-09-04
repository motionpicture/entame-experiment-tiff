import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { Observable, race } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { User } from '../../../models';
import {
    UpdateUser,
    UserActionTypes
} from '../../../store/actions';
import * as reducers from '../../../store/reducers';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
    public isLoading: Observable<boolean>;
    public user: Observable<User | null>;
    public isTicket: Observable<boolean>;
    public isGoods: Observable<boolean>;

    constructor(
        private store: Store<reducers.IState>,
        private actions: Actions,
        private router: Router
    ) { }

    public async ngOnInit() {
        this.isLoading = this.store.pipe(select(reducers.getLoading));
        this.user = this.store.pipe(select(reducers.getUser));
        this.isTicket = this.store.pipe(select(reducers.getTicket));
        this.isGoods = this.store.pipe(select(reducers.getGoods));
        this.user.subscribe((result) => {
            if (result === null) {
                this.router.navigate(['/error']);
                return;
            }
            this.update({ user: result });
        });
    }

    /**
     * update
     */
    public update(args: { user: User }) {
        this.store.dispatch(new UpdateUser({ user: args.user }));

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
