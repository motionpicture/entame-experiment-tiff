import { Component, OnInit } from '@angular/core';
import { goodsInfo, IGoodsInfo } from '../../../../data/goods';

@Component({
    selector: 'app-goods-complete',
    templateUrl: './goods-complete.component.html',
    styleUrls: ['./goods-complete.component.scss']
})
export class GoodsCompleteComponent implements OnInit {
    public goods: IGoodsInfo;
    constructor() { }

    public ngOnInit() {
        this.goods = goodsInfo;
    }

}
