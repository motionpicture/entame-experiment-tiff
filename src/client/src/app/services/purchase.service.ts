import { Injectable } from '@angular/core';
import { MocoinService } from './mocoin.service';

@Injectable({
    providedIn: 'root'
})
export class PurchaseService {
    constructor(
        private mocoin: MocoinService
    ) { }

    /**
     * チケット購入
     * @method purchaseTicket
     */
    public async purchaseTicket() {
        await this.mocoin.getServices();
    }

}
