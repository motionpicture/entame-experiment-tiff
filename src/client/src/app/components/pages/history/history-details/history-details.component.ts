import { Component, OnInit } from '@angular/core';
import { goodsInfo, IGoodsInfo } from '../../../../data/goods';
import { ITicketInfo, ticketInfo } from '../../../../data/ticket';

@Component({
  selector: 'app-history-details',
  templateUrl: './history-details.component.html',
  styleUrls: ['./history-details.component.scss']
})
export class HistoryDetailsComponent implements OnInit {
  public ticketInfo: ITicketInfo;
  public goods: IGoodsInfo;
  public type: 'goods' | 'ticket';
  constructor() { }

  public ngOnInit() {
    this.type = 'ticket';
    this.ticketInfo = ticketInfo;
    this.goods = goodsInfo;
  }

}
