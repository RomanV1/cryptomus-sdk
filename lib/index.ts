import { createHash } from 'node:crypto';
import axios, { AxiosResponse } from 'axios';
import {
    ICreatePaymentOptions,
    IPaymentFormResponse,
    IPaymentInfoResponse,
    IPaymentListOptions,
    IPaymentListResponse,
    IResendWebhookResponse,
    ITransferToWallet,
    ITransferToWalletResponse,
    IRefundResponse,
    KeyType,
    IBalanceResponse,
} from './interfaces/payment.interface';
import { v4 as uuidv4 } from 'uuid';
import * as shortUUID from 'short-uuid';
import { IBlockWalletResponse, IWalletOptions, IWalletResponse } from './interfaces/wallet.interface';
import { IServicesResponse } from './interfaces/services.interface';
import {
    IPayoutInfoResponse,
    IPayoutListResponse,
    IPayoutOptions,
    IPayoutResponse,
} from './interfaces/payout.interface';
import { FindByOptions, FindRefundOptions, FindWalletOptions } from './types/findByOptions.type';

export class Cryptomus {
    url: string = 'https://api.cryptomus.com/v1/';

    constructor(
        private readonly merchant: string,
        private readonly paymentKey: string,
        private readonly payoutKey: string
    ) {}

    private async requestBuilder<T>(
        keyType: KeyType,
        url: string,
        options?:
            | IWalletOptions
            | FindWalletOptions
            | IPaymentListOptions
            | IPayoutOptions
            | ITransferToWallet
            | FindRefundOptions
            | FindByOptions
    ): Promise<AxiosResponse<T>> {
        const key = keyType === KeyType.payment ? this.paymentKey : this.payoutKey;

        const sign = createHash('md5')
            .update(Buffer.from(JSON.stringify(options) || '').toString('base64') + key)
            .digest('hex');

        const headers = {
            merchant: this.merchant,
            sign: sign,
            'Content-Type': 'application/json',
        };

        return axios<T>({
            method: 'POST',
            url: url,
            data: options,
            headers: headers,
        });
    }

    async createPayment(paymentOptions: ICreatePaymentOptions): Promise<IPaymentFormResponse> {
        const url: string = this.url + 'payment';

        const { data } = await this.requestBuilder<IPaymentFormResponse>(KeyType.payment, url, paymentOptions);
        return data;
    }

    async checkPayment(options: FindByOptions): Promise<IPaymentInfoResponse> {
        const url: string = this.url + 'payment/info';

        const { data } = await this.requestBuilder<IPaymentFormResponse>(KeyType.payment, url, options);
        return data;
    }

    async paymentList(paymentListOptions?: IPaymentListOptions, cursor?: string): Promise<IPaymentListResponse> {
        const url: string = cursor ? this.url + `payment/list?cursor=${cursor}` : this.url + 'payment/list';

        const { data } = await this.requestBuilder<IPaymentListResponse>(KeyType.payment, url, paymentListOptions);
        return data;
    }

    async paymentServices(): Promise<IServicesResponse> {
        const url: string = this.url + 'payment/services';

        const { data } = await this.requestBuilder<IServicesResponse>(KeyType.payment, url);
        return data;
    }

    async refund(refundOptions: FindRefundOptions): Promise<IRefundResponse> {
        const url: string = this.url + 'payment/refund';

        const { data } = await this.requestBuilder<IRefundResponse>(KeyType.payment, url, refundOptions);
        return data;
    }

    async balance(): Promise<IBalanceResponse> {
        const url: string = this.url + 'balance';

        const { data } = await this.requestBuilder<IBalanceResponse>(KeyType.payment, url);
        return data;
    }

    async resendWebhook(resendOptions: FindByOptions): Promise<IResendWebhookResponse> {
        const url: string = this.url + 'payment/resend';

        const { data } = await this.requestBuilder<IResendWebhookResponse>(KeyType.payment, url, resendOptions);
        return data;
    }

    async createWallet(walletOptions: IWalletOptions): Promise<IWalletResponse> {
        const url: string = this.url + 'wallet';

        const { data } = await this.requestBuilder<IWalletResponse>(KeyType.payment, url, walletOptions);
        return data;
    }

    async blockWallet(walletOptions: FindWalletOptions): Promise<IBlockWalletResponse> {
        const url: string = this.url + 'wallet/block-address';

        const { data } = await this.requestBuilder<IBlockWalletResponse>(KeyType.payment, url, walletOptions);
        return data;
    }

    async createPayout(payoutOptions: IPayoutOptions): Promise<IPayoutResponse> {
        const url: string = this.url + 'payout';

        const { data } = await this.requestBuilder<IPayoutResponse>(KeyType.payout, url, payoutOptions);
        return data;
    }

    async checkPayout(payoutInfoOptions: FindByOptions): Promise<IPayoutInfoResponse> {
        const url: string = this.url + 'payout/info';

        const { data } = await this.requestBuilder<IPayoutInfoResponse>(KeyType.payout, url, payoutInfoOptions);
        return data;
    }

    async payoutList(cursor?: string): Promise<IPayoutListResponse> {
        const url: string = cursor ? this.url + `payout/list?cursor=${cursor}` : this.url + 'payout/list';

        const { data } = await this.requestBuilder<IPayoutListResponse>(KeyType.payout, url);
        return data;
    }

    async payoutServices(): Promise<IServicesResponse> {
        const url: string = this.url + 'payout/services';

        const { data } = await this.requestBuilder<IServicesResponse>(KeyType.payout, url);
        return data;
    }

    async transferToWallet(
        walletType: 'personal' | 'business',
        transferOption: ITransferToWallet
    ): Promise<ITransferToWalletResponse> {
        const url: string = this.url + `transfer/to-${walletType}`;

        const { data } = await this.requestBuilder<ITransferToWalletResponse>(KeyType.payout, url, transferOption);
        return data;
    }

    createUUID(): string {
        return uuidv4();
    }

    createShortUUID(): string {
        return shortUUID.generate();
    }
}
