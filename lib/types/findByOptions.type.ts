import { IFindWalletByOrderId, IFindWalletByUUID } from '../interfaces/wallet.interface';
import { IFindRefundByOrderId, IFindRefundByUUID } from '../interfaces/payment.interface';

export type FindWalletOptions = IFindWalletByUUID | IFindWalletByOrderId;

export type FindRefundOptions = IFindRefundByOrderId | IFindRefundByUUID;

export type FindByOptions = { uuid: string } | { order_id: string };
