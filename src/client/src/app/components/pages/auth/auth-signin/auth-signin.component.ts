import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { race } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { CreateUser, UserActionTypes } from '../../../../store/actions';
import * as reducers from '../../../../store/reducers';

@Component({
    selector: 'app-auth-signin',
    templateUrl: './auth-signin.component.html',
    styleUrls: ['./auth-signin.component.scss']
})
export class AuthSigninComponent implements OnInit {

    constructor(
        private router: Router,
        private store: Store<reducers.IUserState>,
        private actions: Actions
    ) { }

    public ngOnInit() {
        this.create();
    }

    /**
     * Create
     */
    private create() {
        this.store.dispatch(new CreateUser());

        const success = this.actions.pipe(
            ofType(UserActionTypes.CreateUserSuccess),
            tap(() => {
                // 成功時の処理
                this.router.navigate(['/']);
            })
        );

        const fail = this.actions.pipe(
            ofType(UserActionTypes.CreateUserFail),
            tap(() => {
                // エラー時の処理
            })
        );
        race(success, fail).pipe(take(1)).subscribe();
    }

}
