export interface IWalletOptions {
    network: string;
    currency: string;
    order_id: string;
    url_callback?: string;
}

export interface IWalletResponse {
    state: boolean;
    result: {
        wallet_uuid: string;
        uuid: string;
        address: string;
        network: string;
        currency: string;
    };
}

export interface IFindWalletByOrderId {
    order_id: string;
    is_force_refund?: boolean;
}

export interface IFindWalletByUUID {
    uuid: string;
    is_force_refund?: boolean;
}

export interface IBlockWalletResponse {
    state: boolean;
    result: {
        uuid: string;
        status: string;
    };
}
