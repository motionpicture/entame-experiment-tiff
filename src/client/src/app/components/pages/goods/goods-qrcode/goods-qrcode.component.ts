import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as reducers from '../../../../store/reducers';

@Component({
    selector: 'app-goods-qrcode',
    templateUrl: './goods-qrcode.component.html',
    styleUrls: ['./goods-qrcode.component.scss']
})
export class GoodsQrcodeComponent implements OnInit {
    public isGoods: Observable<boolean>;
    constructor(
        private purchaseStore: Store<reducers.IPurchaseState>
    ) { }

    public ngOnInit() {
        this.isGoods = this.purchaseStore.select(reducers.getGoods);
    }

}
