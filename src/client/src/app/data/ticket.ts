export interface ITicketInfo {
    theater: string;
    screen: string;
    film: string;
    startDate: string;
    seatType: string;
    seatLength: number;
    paymentMethod: string;
    amount: number;
    image: string;
    usedNotes: string;
    qrcodeTocken: string;
}

export const ticketInfo: ITicketInfo = {
    theater: '劇場１',
    screen: 'スクリーン1',
    film: 'KING OF PRISM',
    startDate: '2018/08/31 12:00',
    seatType: '自由席',
    seatLength: 1,
    paymentMethod: 'エンタメコイン',
    amount: 1500,
    image: '/assets/images/tmp_01.png',
    usedNotes: 'チケット引き換え',
    qrcodeTocken: '12345678'
};
