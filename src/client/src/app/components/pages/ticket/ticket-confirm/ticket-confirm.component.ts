import { Component, OnInit } from '@angular/core';
import { ITicketInfo, ticketInfo } from '../../../../data/ticket';

@Component({
    selector: 'app-ticket-confirm',
    templateUrl: './ticket-confirm.component.html',
    styleUrls: ['./ticket-confirm.component.scss']
})
export class TicketConfirmComponent implements OnInit {
    public ticketInfo: ITicketInfo;
    constructor() { }

    public ngOnInit() {
        this.ticketInfo = ticketInfo;
    }

}
