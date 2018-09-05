import { Injectable } from '@angular/core';
import { factory } from '@mocoin/api-javascript-client';
import { environment } from '../../environments/environment';
import { User } from '../models';
import { CoinService } from './coin.service';
import { MocoinService } from './mocoin.service';
import { UtilService } from './util.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(
        private mocoin: MocoinService,
        private coin: CoinService,
        private util: UtilService
    ) { }

    /**
     * ユーザー作成
     * @method createUser
     */
    public async createUser() {
        await this.mocoin.getServices();

        // ユーザーネーム取得
        const userName = this.mocoin.userName;

        // 決済方法取得
        const paymentMethods = await this.mocoin.person.searchPaymentMethods({
            personId: 'me'
        });
        let paymentMethod = paymentMethods.find((method) => {
            return (method.accountNumber === environment.BANK_ACCOUNT_NUMBER);
        });
        if (paymentMethod === undefined) {
            paymentMethod = await this.mocoin.person.addPaymentMethod({
                personId: 'me',
                accountNumber: environment.BANK_ACCOUNT_NUMBER,
                paymentMethodType: factory.paymentMethodType.BankAccount
            });
            paymentMethods.push(paymentMethod);
        }

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
            this.coin.chargeCoinProcess({
                userName: userName,
                amount: 2000,
                coinAccount: coinAccount,
                paymentMethod: paymentMethod,
                notes: '初回チャージ'
            });
            const time = 10000;
            await this.util.sleep(time);
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

        return new User({
            userName: userName,
            coinAccounts: coinAccounts,
            pointAccounts: pointAccounts
        });
    }

    public async updateUser(args: { user: User }) {
        await this.mocoin.getServices();

        // コイン口座取得
        const searchCoinAccountsResult = await this.mocoin.person.searchCoinAccounts({
            personId: 'me'
        });
        const coinAccounts = searchCoinAccountsResult.filter((account) => {
            return (account.status === factory.pecorino.accountStatusType.Opened);
        });
        if (coinAccounts.length === 0) {
            throw new Error('coinAccounts not found');
        }
        // ポイント口座取得
        const searchPointAccountsResult = await this.mocoin.person.searchPointAccounts({
            personId: 'me'
        });
        const pointAccounts = searchPointAccountsResult.filter((account) => {
            return (account.status === factory.pecorino.accountStatusType.Opened);
        });
        if (pointAccounts.length === 0) {
            throw new Error('pointAccounts not found');
        }

        args.user.coinAccounts = coinAccounts;
        args.user.pointAccounts = pointAccounts;

        return args.user;
    }

    public async resetUser(args: { user: User }) {
        await this.mocoin.getServices();

        // コイン口座取得
        const searchCoinAccountsResult = await this.mocoin.person.searchCoinAccounts({
            personId: 'me'
        });
        const coinAccounts = searchCoinAccountsResult.filter((account) => {
            return (account.status === factory.pecorino.accountStatusType.Opened);
        });
        for (const coinAccount of coinAccounts) {
            await this.mocoin.person.closeCoinAccount({
                personId: 'me',
                accountNumber: coinAccount.accountNumber
            });
        }

        // ポイント口座取得
        const searchPointAccountsResult = await this.mocoin.person.searchPointAccounts({
            personId: 'me'
        });
        const pointAccounts = searchPointAccountsResult.filter((account) => {
            return (account.status === factory.pecorino.accountStatusType.Opened);
        });
        for (const pointAccount of pointAccounts) {
            await this.mocoin.person.closePointAccount({
                personId: 'me',
                accountNumber: pointAccount.accountNumber
            });
        }

        args.user.coinAccounts = [];
        args.user.pointAccounts = [];

        return args.user;
    }
}
