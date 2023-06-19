import { createHash } from 'node:crypto';
import axios, { AxiosError } from 'axios';
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
    private readonly url: string = 'https://api.cryptomus.com/v1/';

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
    ): Promise<T> {
        const key = keyType === KeyType.payment ? this.paymentKey : this.payoutKey;

        const sign = createHash('md5')
            .update(Buffer.from(JSON.stringify(options) || '').toString('base64') + key)
            .digest('hex');

        const headers = {
            merchant: this.merchant,
            sign: sign,
            'Content-Type': 'application/json',
        };

        try {
            const { data } = await axios<T>({
                method: 'POST',
                url: url,
                data: options,
                headers: headers,
            });

            return data;
        } catch (err) {
            if (err instanceof AxiosError) {
                throw new Error(err.response.data);
            }
        }
    }

    async createPayment(paymentOptions: ICreatePaymentOptions): Promise<IPaymentFormResponse> {
        return this.requestBuilder<IPaymentFormResponse>(KeyType.payment, this.url + 'payment', paymentOptions);
    }

    async getPaymentInfo(options: FindByOptions): Promise<IPaymentInfoResponse> {
        return this.requestBuilder<IPaymentFormResponse>(KeyType.payment, this.url + 'payment/info', options);
    }

    async getPaymentHistory(paymentListOptions?: IPaymentListOptions, cursor?: string): Promise<IPaymentListResponse> {
        return this.requestBuilder<IPaymentListResponse>(
            KeyType.payment,
            cursor ? this.url + `payment/list?cursor=${cursor}` : this.url + 'payment/list',
            paymentListOptions
        );
    }

    async getPaymentServices(): Promise<IServicesResponse> {
        return this.requestBuilder<IServicesResponse>(KeyType.payment, this.url + 'payment/services');
    }

    async refund(refundOptions: FindRefundOptions): Promise<IRefundResponse> {
        return this.requestBuilder<IRefundResponse>(KeyType.payment, this.url + 'payment/refund', refundOptions);
    }

    async getBalance(): Promise<IBalanceResponse> {
        return this.requestBuilder<IBalanceResponse>(KeyType.payment, this.url + 'balance');
    }

    async resendWebhook(resendOptions: FindByOptions): Promise<IResendWebhookResponse> {
        return this.requestBuilder<IResendWebhookResponse>(KeyType.payment, this.url + 'payment/resend', resendOptions);
    }

    async createWallet(walletOptions: IWalletOptions): Promise<IWalletResponse> {
        return this.requestBuilder<IWalletResponse>(KeyType.payment, this.url + 'wallet', walletOptions);
    }

    async blockWallet(walletOptions: FindWalletOptions): Promise<IBlockWalletResponse> {
        return this.requestBuilder<IBlockWalletResponse>(
            KeyType.payment,
            this.url + 'wallet/block-address',
            walletOptions
        );
    }

    async createPayout(payoutOptions: IPayoutOptions): Promise<IPayoutResponse> {
        return this.requestBuilder<IPayoutResponse>(KeyType.payout, this.url + 'payout', payoutOptions);
    }

    async getPayoutInfo(payoutInfoOptions: FindByOptions): Promise<IPayoutInfoResponse> {
        return this.requestBuilder<IPayoutInfoResponse>(KeyType.payout, this.url + 'payout/info', payoutInfoOptions);
    }

    async getPayoutHistory(cursor?: string): Promise<IPayoutListResponse> {
        return this.requestBuilder<IPayoutListResponse>(
            KeyType.payout,
            cursor ? this.url + `payout/list?cursor=${cursor}` : this.url + 'payout/list'
        );
    }

    async getPayoutServices(): Promise<IServicesResponse> {
        return this.requestBuilder<IServicesResponse>(KeyType.payout, this.url + 'payout/services');
    }

    async transferToWallet(
        walletType: 'personal' | 'business',
        transferOption: ITransferToWallet
    ): Promise<ITransferToWalletResponse> {
        return this.requestBuilder<ITransferToWalletResponse>(
            KeyType.payout,
            this.url + `transfer/to-${walletType}`,
            transferOption
        );
    }

    generateUUID(): string {
        return uuidv4();
    }

    generateShortUUID(): string {
        return shortUUID.generate();
    }
}
