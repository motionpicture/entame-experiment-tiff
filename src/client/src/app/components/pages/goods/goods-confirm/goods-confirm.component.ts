import { Component, OnInit } from '@angular/core';
import { goodsInfo, IGoodsInfo } from '../../../../data/goods';

@Component({
    selector: 'app-goods-confirm',
    templateUrl: './goods-confirm.component.html',
    styleUrls: ['./goods-confirm.component.scss']
})
export class GoodsConfirmComponent implements OnInit {
    public goods: IGoodsInfo;
    constructor() { }

    public ngOnInit() {
        this.goods = goodsInfo;
    }

}
