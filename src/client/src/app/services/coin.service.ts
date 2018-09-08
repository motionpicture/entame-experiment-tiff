import { Injectable } from '@angular/core';
import { factory } from '@mocoin/api-javascript-client';
import * as moment from 'moment';
import { environment } from '../../environments/environment';
import { MocoinService } from './mocoin.service';

@Injectable({
    providedIn: 'root'
})
export class CoinService {
    constructor(
        private mocoin: MocoinService
    ) { }

    /**
     * コイン使用処理
     */
    public async useCoinProcess(args: {
        amount: number,
        userName: string,
        coinAccount: factory.pecorino.account.IAccount<factory.accountType.Coin>,
        notes: string;
    }) {
        await this.mocoin.getServices();
        const transactionTime = 1;
        const transaction = await this.mocoin.transaction.withdrawCoin.start({
            expires: moment().add(transactionTime, 'minutes').toDate(),
            agent: {
                typeOf: factory.personType.Person,
                name: args.userName
            },
            recipient: {
                typeOf: factory.personType.Person,
                name: environment.RECIPIENT_NAME
            },
            amount: args.amount,
            notes: args.notes,
            fromLocation: {
                typeOf: factory.ownershipInfo.AccountGoodType.Account,
                accountType: args.coinAccount.accountType,
                accountNumber: args.coinAccount.accountNumber
            }
        });
        await this.mocoin.transaction.withdrawCoin.confirm(transaction);
    }

    /**
     * コインチャージ処理
     */
    public async chargeCoinProcess(args: {
        amount: number,
        userName: string,
        coinAccount: factory.pecorino.account.IAccount<factory.accountType.Coin>,
        paymentMethod: factory.ownershipInfo.IPaymentMethod<factory.paymentMethodType>,
        notes: string;
    }) {
        await this.mocoin.getServices();
        const transactionTime = 1;
        const transaction = await this.mocoin.transaction.buyCoin.start({
            expires: moment().add(transactionTime, 'minutes').toDate(),
            agent: {
                typeOf: factory.personType.Person,
                name: environment.AGENT_NAME
            },
            recipient: {
                typeOf: factory.personType.Person,
                name: args.userName
            },
            amount: args.amount,
            notes: args.notes,
            fromLocation: args.paymentMethod,
            toLocation: {
                typeOf: factory.ownershipInfo.AccountGoodType.Account,
                accountType: args.coinAccount.accountType,
                accountNumber: args.coinAccount.accountNumber
            }
        });
        await this.mocoin.transaction.buyCoin.confirm({
            token: transaction.token
        });
    }

}
