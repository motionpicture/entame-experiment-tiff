export interface IGoodsInfo {
    item: string;
    itemLength: number;
    paymentMethod: string;
    useCoin: number;
    image: string;
};

export const goodsInfo: IGoodsInfo = {
    item: 'KING OF PRISM',
    itemLength: 1,
    paymentMethod: 'エンタメコイン',
    useCoin: 1000,
    image: '/assets/images/tmp_01.png'
};
