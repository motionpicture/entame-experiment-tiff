import { Component, OnInit } from '@angular/core';
import { ITicketInfo, ticketInfo } from '../../../../data/ticket';

@Component({
    selector: 'app-ticket-complete',
    templateUrl: './ticket-complete.component.html',
    styleUrls: ['./ticket-complete.component.scss']
})
export class TicketCompleteComponent implements OnInit {
    public ticketInfo: ITicketInfo;
    constructor() { }

    public ngOnInit() {
        this.ticketInfo = ticketInfo;
    }

}
