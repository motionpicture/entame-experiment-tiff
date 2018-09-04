import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { Observable, race } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { User } from '../../../../models';
import { ResetUser, UserActionTypes } from '../../../../store/actions';
import * as reducers from '../../../../store/reducers';
import { ConfirmModalComponent } from '../../../parts/confirm-modal/confirm-modal.component';

@Component({
    selector: 'app-user-reset',
    templateUrl: './user-reset.component.html',
    styleUrls: ['./user-reset.component.scss']
})
export class UserResetComponent implements OnInit {
    public isLoading: Observable<boolean>;
    public user: Observable<User | null>;

    constructor(
        private store: Store<reducers.IState>,
        private actions: Actions,
        private router: Router,
        private modal: NgbModal
    ) { }

    public ngOnInit() {
        this.isLoading = this.store.pipe(select(reducers.getLoading));
        this.user = this.store.pipe(select(reducers.getUser));
    }

    public onSubmit() {
        this.user.subscribe((user) => {
            if (user === null) {
                this.router.navigate(['/error']);
                return;
            }
            this.openConfirm({
                title: '確認',
                body: '初期化しますか？',
                done: () => {
                    this.reset({ user: user });
                }
            });
        }).unsubscribe();
    }

    /**
     * reset
     */
    public reset(args: { user: User }) {
        this.store.dispatch(new ResetUser({ user: args.user }));

        const success = this.actions.pipe(
            ofType(UserActionTypes.ResetUserSuccess),
            tap(() => {
                console.log('ResetUserSuccess');
                this.router.navigate(['/auth/signin']);
            })
        );

        const fail = this.actions.pipe(
            ofType(UserActionTypes.ResetUserFail),
            tap(() => {
                console.log('ResetUserFail');
                this.router.navigate(['/error']);
            })
        );
        race(success, fail).pipe(take(1)).subscribe();
    }

    public openConfirm(args: {
        title: string;
        body: string;
        done: Function
    }) {
        const modalRef = this.modal.open(ConfirmModalComponent, {
            centered: true
        });
        modalRef.result.then(() => {
            args.done();
        });

        modalRef.componentInstance.title = args.title;
        modalRef.componentInstance.body = args.body;
    }

}
