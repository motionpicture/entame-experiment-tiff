import * as mocoin from '@mocoin/api-javascript-client';

export class Purchase {
    public userName: string;
    public coinAccounts: mocoin.factory.pecorino.account.IAccount<mocoin.factory.accountType.Coin>[];
    public pointAccounts: mocoin.factory.pecorino.account.IAccount<mocoin.factory.accountType.Point>[];
    constructor(data: {
        userName: string;
        coinAccounts: mocoin.factory.pecorino.account.IAccount<mocoin.factory.accountType.Coin>[];
        pointAccounts: mocoin.factory.pecorino.account.IAccount<mocoin.factory.accountType.Point>[];
    }) {
        this.userName = data.userName;
        this.coinAccounts = data.coinAccounts;
        this.pointAccounts = data.pointAccounts;
    }
}
