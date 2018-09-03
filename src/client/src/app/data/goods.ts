export interface IGoodsInfo {
    item: string;
    itemLength: number;
    paymentMethod: string;
    amount: number;
    image: string;
    usedNotes: string;
    qrcodeTocken: string;
}

export const goodsInfo: IGoodsInfo = {
    item: 'KING OF PRISM',
    itemLength: 1,
    paymentMethod: 'エンタメコイン',
    amount: 500,
    image: '/assets/images/tmp_01.png',
    usedNotes: 'グッズ引き換え',
    qrcodeTocken: '12345678'
};
