export enum KeyType {
    'payment',
    'payout',
}

export interface ICreatePaymentOptions {
    amount: string;
    currency: string;
    network?: string;
    order_id: string;
    url_return?: string;
    url_callback?: string;
    is_payment_multiple?: string;
    lifetime?: string | number;
    to_currency?: string;
    subtract?: string;
    accuracy_payment_percent?: string;
    additional_data?: string;
    currencies?: [
        {
            currency: string;
            network: string;
        }
    ];
    except_currencies?: [
        {
            currency: string;
            network: string;
        }
    ];
    discount_percent?: string;
}

export interface IPaymentFormResponse {
    state: boolean;
    result: {
        uuid: string;
        order_id: string;
        amount: string;
        payment_amount: string | null;
        payer_amount: string | null;
        discount_percent: string | null;
        discount: string;
        payer_currency: string | null;
        currency: string;
        comments: string | null;
        network: string | null;
        address: string | null;
        from: string | null;
        txid: string | null;
        payment_status: string;
        url: string;
        expired_at: number;
        status: string;
        is_final: boolean;
        additional_data: string | null;
    };
}

export interface IPaymentInfoResponse {
    state: boolean;
    result: {
        uuid: string;
        order_id: string;
        amount: string;
        payment_amount: string | null;
        payer_amount: string;
        payer_currency: string;
        currency: string;
        comments: string | null;
        network: string | null;
        address: string | null;
        from: string | null;
        txid: string | null;
        payment_status: string;
        url: string;
        expired_at: number;
        status: string;
        is_final: boolean;
    };
}

export interface IPaymentListOptions {
    date_from?: string;
    date_to?: string;
}

export interface IPaymentListResponse {
    state: boolean;
    result: {
        items: [
            {
                uuid: string;
                order_id: string | null;
                amount: string;
                payment_amount: string | null;
                payer_amount: string | null;
                payer_currency: string | null;
                currency: string;
                comments: string | null;
                network: string | null;
                address: string | null;
                from: string | null;
                txid: string | null;
                payment_status: string;
                url: string;
                expired_at: number;
                status: string;
                is_final: boolean;
                created_at: string;
                updated_at: string;
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

export interface IBalanceResponse {
    state: boolean;
    result: [
        {
            balance: {
                merchant: [
                    {
                        uuid: string;
                        balance: string;
                        currency_code: string;
                    }
                ];
                user: [
                    {
                        uuid: string;
                        balance: string;
                        currency_code: string;
                    }
                ];
            };
        }
    ];
}

export interface IFindRefundByUUID {
    uuid: string;
    address: string;
    is_subtract: boolean;
}

export interface IFindRefundByOrderId {
    order_id: string;
    address: string;
    is_subtract: boolean;
}

export interface IRefundResponse {
    state: boolean;
    message?: string;
}

export interface ITransferToWallet {
    amount: string;
    currency: string;
}

export interface ITransferToWalletResponse {
    state: boolean;
    result: {
        user_wallet_transaction_uuid: string;
        user_wallet_balance: string;
        merchant_transaction_uuid: string;
        amount: string;
    };
}

export interface IResendWebhookResponse {
    state: boolean;
    message?: string;
}
