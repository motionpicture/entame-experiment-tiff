import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as reducers from '../../../../store/reducers';

@Component({
    selector: 'app-history-list',
    templateUrl: './history-list.component.html',
    styleUrls: ['./history-list.component.scss']
})
export class HistoryListComponent implements OnInit {
    public isTicket: Observable<boolean>;
    public isGoods: Observable<boolean>;

    constructor(
        private purchaseStore: Store<reducers.IPurchaseState>
    ) { }

    public ngOnInit() {
        this.isTicket = this.purchaseStore.select(reducers.getTicket);
        this.isGoods = this.purchaseStore.select(reducers.getGoods);
    }

}
