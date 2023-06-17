export interface IPayoutOptions {
    amount: string;
    currency: string;
    network: string;
    order_id: string;
    address: string;
    is_subtract: boolean;
    from_currency?: string;
    url_callback?: string;
    to_currency?: string;
}

export interface IPayoutResponse {
    state: boolean;
    result: {
        uuid: string;
        amount: string;
        currency: string;
        network: string;
        address: string;
        txid: string | null;
        status: string | null;
        is_final: boolean;
        balance: number;
        payer_currency: string;
        payer_amount: number;
    };
}

export interface IPayoutInfoResponse {
    state: boolean;
    result: {
        uuid: string;
        amount: string;
        currency: string;
        network: string;
        address: string;
        txid: string;
        status: string;
        is_final: boolean;
        balance: number;
    };
}

export interface IPayoutListResponse {
    state: boolean;
    result: {
        merchant_uuid: string;
        items: [
            {
                uuid: string;
                amount: string;
                currency: string;
                network: string;
                address: string;
                txid: string;
                order_id: number;
                status: string;
                is_final: boolean;
                balance: string;
            }
        ];
        paginate: {
            count: number;
            hasPages: boolean;
            nextCursor: string | null;
            previousCursor: string | null;
            perPage: number;
        };
    };
}
