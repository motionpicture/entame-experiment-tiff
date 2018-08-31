import { Injectable } from '@angular/core';
import { factory } from '@mocoin/api-javascript-client';
import { Purchase } from '../models';
import { MocoinService } from './mocoin.service';

@Injectable({
    providedIn: 'root'
})
export class PurchaseService {
    constructor(
        private mocoin: MocoinService
    ) { }

    /**
     * ユーザー作成
     * @method createPurchase
     */
    public async createPurchase() {
        await this.mocoin.getServices();

        // ユーザーネーム取得
        const userName = this.mocoin.userName;

        // コイン口座取得
        const searchCoinAccountsResult = await this.mocoin.person.searchCoinAccounts({
            personId: 'me'
        });
        const coinAccounts = searchCoinAccountsResult.filter((account) => {
            return (account.status === factory.pecorino.accountStatusType.Opened);
        });
        if (coinAccounts.length === 0) {
            const coinAccount = await this.mocoin.person.openCoinAccount({
                personId: 'me',
                name: userName
            });
            coinAccounts.push(coinAccount);
        }

        // ポイント口座取得
        const searchPointAccountsResult = await this.mocoin.person.searchPointAccounts({
            personId: 'me'
        });
        const pointAccounts = searchPointAccountsResult.filter((account) => {
            return (account.status === factory.pecorino.accountStatusType.Opened);
        });
        if (pointAccounts.length === 0) {
            const pointAccount = await this.mocoin.person.openPointAccount({
                personId: 'me',
                name: userName
            });
            pointAccounts.push(pointAccount);
        }

        return new Purchase({
            userName: userName,
            coinAccounts: coinAccounts,
            pointAccounts: pointAccounts
        });
    }

}
