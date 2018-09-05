import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { FidoAction, NativeService } from '../../../../services/native';
import * as reducers from '../../../../store/reducers';
import { AlertModalComponent } from '../../../parts/alert-modal/alert-modal.component';

@Component({
    selector: 'app-history-list',
    templateUrl: './history-list.component.html',
    styleUrls: ['./history-list.component.scss']
})
export class HistoryListComponent implements OnInit {
    public isTicket: Observable<boolean>;
    public isGoods: Observable<boolean>;

    constructor(
        private store: Store<reducers.IState>,
        private modal: NgbModal,
        private native: NativeService,
        private router: Router
    ) { }

    public ngOnInit() {
        this.isTicket = this.store.pipe(select(reducers.getTicket));
        this.isGoods = this.store.pipe(select(reducers.getGoods));
    }

    public async onSubmit() {
        try {
            const device = await this.native.device();
            if (device === null) {
                throw new Error('device is null');
            }
            const authenticationResult = await this.native.fido({
                action: FidoAction.Authentication,
                user: `${environment.APP_NAME}-${environment.ENV}-${device.uuid}`
            });
            if (!authenticationResult.isSuccess) {
                throw Error(authenticationResult.error);
            }
        } catch (error) {
            this.openAlert({ title: 'エラー', body: error.message });
            return;
        }
        this.router.navigate(['/history/details']);
    }

    private openAlert(args: {
        title: string;
        body: string;
    }) {
        const modalRef = this.modal.open(AlertModalComponent, {
            centered: true
        });
        modalRef.componentInstance.title = args.title;
        modalRef.componentInstance.body = args.body;
    }

}
