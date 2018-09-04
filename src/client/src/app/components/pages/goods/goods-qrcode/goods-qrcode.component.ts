import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { NativeService, QRScannerAction } from '../../../../services/native';
import * as reducers from '../../../../store/reducers';
import { AlertModalComponent } from '../../../parts/alert-modal/alert-modal.component';

@Component({
    selector: 'app-goods-qrcode',
    templateUrl: './goods-qrcode.component.html',
    styleUrls: ['./goods-qrcode.component.scss']
})
export class GoodsQrcodeComponent implements OnInit {
    public isGoods: Observable<boolean>;
    constructor(
        private store: Store<reducers.IState>,
        private router: Router,
        private modal: NgbModal,
        private native: NativeService
    ) { }

    public ngOnInit() {
        this.isGoods = this.store.pipe(select(reducers.getGoods));
    }

    public async onSubmit() {
        try {
            const scanResult = await this.native.QRScanner({
                action: QRScannerAction.Show
            });
            if (scanResult.result === null) {
                throw new Error('qrcode fail');
            }
            if (scanResult.result.cancelled === 1
                || scanResult.result.text === undefined
                || scanResult.result.text === '') {
                return;
            }
            const qrcode = '12345678';
            if (scanResult.result.text !== qrcode
                && scanResult.result.text !== 'browser') {
                this.openAlert({
                    title: 'エラー',
                    body: 'QRコードが正しくありません。'
                });
                return;
            }
            this.router.navigate(['/goods/confirm']);
        } catch (error) {
            console.error(error);
            this.router.navigate(['/error']);
        }
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
