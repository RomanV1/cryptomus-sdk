import { Cryptomus } from '../lib';
import { config } from 'dotenv';
config();

const cryptomus = new Cryptomus(process.env.MERCHANT, process.env.PAYMENT_KEY, process.env.PAYOUT_KEY);

describe('Cryptomus SDK tests', () => {
    jest.setTimeout(60000);

    describe('Payment', () => {
        const currency = 'USD';
        const amount = '1';
        const orderId = cryptomus.createUUID();
        let uuid;

        it('should return payment form', async () => {
            const paymentForm = await cryptomus.createPayment({
                amount: amount,
                currency: currency,
                order_id: orderId,
            });

            expect(paymentForm.state).toBeFalsy();
            expect(paymentForm.result.amount).toBe(`${amount}.00`);
            expect(paymentForm.result.currency).toBe(currency);
            expect(paymentForm.result.order_id).toBe(orderId);
            expect(paymentForm.result.status).toBe('check');

            uuid = paymentForm.result.uuid;
        });

        it('should return payment info by order_id', async () => {
            const status = await cryptomus.checkPayment({ order_id: orderId });

            expect(status.state).toBeFalsy();
            expect(status.result.amount).toBe(`${amount}.00`);
            expect(status.result.currency).toBe(currency);
            expect(status.result.order_id).toBe(orderId);
            expect(status.result.status).toBe('check');
        });

        it('should return payment info by UUID', async () => {
            const status = await cryptomus.checkPayment({ uuid: uuid });

            expect(status.state).toBeFalsy();
            expect(status.result.amount).toBe(`${amount}.00`);
            expect(status.result.currency).toBe(currency);
            expect(status.result.uuid).toBe(uuid);
            expect(status.result.status).toBe('check');
        });

        it('should return available payment services', async () => {
            const paymentServices = await cryptomus.paymentServices();

            expect(paymentServices.state).toBeFalsy();
            expect(paymentServices.result.length).toBeGreaterThan(0);
        });

        it('should return refund error', async () => {
            try {
                await cryptomus.refund({
                    order_id: 'aspdokasdkopp',
                    address: 'psdfokapsofkpaoskdsdk',
                    is_subtract: false,
                });
            } catch (err) {
                expect(err.response.data).toEqual({ message: 'Payment was not found.', state: 1 });
            }
        });

        it('should return payment list', async () => {
            const paymentList = await cryptomus.paymentList();

            expect(paymentList.state).toBeFalsy();
            expect(paymentList.result.items.length).toBeGreaterThan(0);
        });

        it('should return balance', async () => {
            const balance = await cryptomus.balance();

            expect(balance.state).toBeFalsy();
            expect(balance.result.length).toBeGreaterThan(0);
        });

        it('should return resend webhook error', async () => {
            try {
                await cryptomus.resendWebhook({ order_id: '123' });
            } catch (err) {
                expect(err.response.data).toEqual({ message: 'Payment not found.', state: 1 });
            }
        });
    });

    describe('Wallet', () => {
        const orderId = cryptomus.createShortUUID();
        const network = 'tron';
        const currency = 'USDT';
        let uuid;

        it('should return created wallet', async () => {
            const createdWallet = await cryptomus.createWallet({
                currency: currency,
                network: network,
                order_id: orderId,
            });

            expect(createdWallet.state).toBeFalsy();
            expect(createdWallet.result.network).toBe(network);
            expect(createdWallet.result.currency).toBe(currency);

            uuid = createdWallet.result.uuid;
        });

        it('should block wallet by order_id', async () => {
            const blockedWallet = await cryptomus.blockWallet({ order_id: orderId });

            expect(blockedWallet.state).toBeFalsy();
            expect(blockedWallet.result.status).toBe('blocked');
            expect(blockedWallet.result.uuid).toBe(uuid);
        });

        it('should block wallet by UUID', async () => {
            const { result } = await cryptomus.createWallet({
                currency: currency,
                network: network,
                order_id: cryptomus.createShortUUID(),
            });

            const blockedWallet = await cryptomus.blockWallet({ uuid: result.uuid });

            expect(blockedWallet.state).toBeFalsy();
            expect(blockedWallet.result.status).toBe('blocked');
            expect(blockedWallet.result.uuid).toBe(result.uuid);
        });
    });

    describe('Payout', () => {
        it('should return payout error', async () => {
            try {
                await cryptomus.createPayout({
                    address: '1234567890qwerty',
                    amount: '0.01',
                    currency: 'USDT',
                    is_subtract: false,
                    network: 'tron',
                    order_id: cryptomus.createUUID(),
                });
            } catch (err) {
                expect(err.response.data).toEqual({ message: 'Minimum amount 1.00000000 USDT', state: 1 });
            }
        });

        it('should return payout info error', async () => {
            try {
                await cryptomus.checkPayout({
                    order_id: cryptomus.createShortUUID(),
                });
            } catch (err) {
                expect(err.response.data).toEqual({
                    message: 'No query results for model [App\\Models\\MerchantPayout].',
                    state: 1,
                });
            }
        });

        it('should return payout services', async () => {
            const payoutServices = await cryptomus.payoutServices();

            expect(payoutServices.state).toBeFalsy();
            expect(payoutServices.result.length).toBeGreaterThan(0);
        });

        it('should return payout list', async () => {
            const payoutServices = await cryptomus.payoutList();

            expect(payoutServices.state).toBeFalsy();
        });

        it('should return transfer to personal wallet error', async () => {
            try {
                await cryptomus.transferToWallet('personal', {
                    amount: '0.01',
                    currency: 'USDT',
                });
            } catch (err) {
                expect(err.response.data).toEqual({
                    message: 'Not enough funds.',
                    state: 1,
                });
            }
        });

        it('should return transfer to business wallet error', async () => {
            try {
                await cryptomus.transferToWallet('business', {
                    amount: '0.01',
                    currency: 'USDT',
                });
            } catch (err) {
                expect(err.response.data).toEqual({
                    message: 'Not enough funds.',
                    state: 1,
                });
            }
        });
    });
});
