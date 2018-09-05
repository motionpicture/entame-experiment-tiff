import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as reducers from '../../../store/reducers';

@Component({
    selector: 'app-base',
    templateUrl: './base.component.html',
    styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {
    public isLoading: Observable<boolean>;
    constructor(
        private store: Store<reducers.IState>
    ) { }

    public ngOnInit() {
        this.isLoading = this.store.pipe(select(reducers.getLoading));
    }

}
