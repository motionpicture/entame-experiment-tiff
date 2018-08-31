import { Component, OnInit } from '@angular/core';
import { MocoinService } from '../../../../services';

@Component({
    selector: 'app-auth-index',
    templateUrl: './auth-index.component.html',
    styleUrls: ['./auth-index.component.scss']
})
export class AuthIndexComponent implements OnInit {

    constructor(
        private mocoin: MocoinService
    ) { }

    public ngOnInit() {
        this.mocoin.signIn();
    }

}
