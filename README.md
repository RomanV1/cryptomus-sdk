# Cryptomus SDK

**This is not an official one created for simplified work with Cryptomus API**

**You can find the official documentation here: [Cryptomus API](https://doc.cryptomus.com/)**
___

## Installation
```bash
$ npm install cryptomus-sdk
```

## Importing

```javascript
// Using Node.js `require()`
const Cryptomus = require("cryptomus-sdk");

// Using ES6 imports
import { Cryptomus } from "cryptomus-sdk";
```
## Initialization

**[Getting API keys](https://doc.cryptomus.com/getting-started/getting-api-keys)**

```javascript
const MERCHANT_KEY = "123123";
const PAYMENT_KEY = "asdasd";
const PAYOUT_KEY = "qwerty";
    
const cryptomus = new Cryptomus(MERCHANT_KEY, PAYMENT_KEY, PAYOUT_KEY);
```


## Creating an invoice

**Send Request**

```javascript
const paymentForm = await cryptomus.createPayment({
    amount: "10",
    currency: "USDT",
    order_id: cryptomus.generateUUID()
});
```

**Response**
```json
{
    "state": 0,
    "result": {		
        "uuid": "f1386fb5-ecfa-41d4-a85d-b151d98df5e1",		
        "order_id": "test-28",		
        "amount": "10.00000000",		
        "payment_amount": "11.95000000",		
        "payer_amount": "10.00000000",		
        "payer_currency": "USDT",		
        "currency": "USDT",		
        "comments": null,		
        "network": "tron_trc20",		
        "address": null,		
        "from": null,		
        "txid": null,		
        "payment_status": "refund_process",		
        "url": "https://pay.cryptomus.com/pay/f1386fb5-ecfa-41d4-a85d-b151d98df5e1",		
        "expired_at": 1655196355,		
        "status": "check",		
        "is_final": false,		
        "additional_data": null,		
        "currencies": [
        {
            "currency": "USDT",
            "network": "tron_trc20"
        }, 
        {
            "currency": "USDT",
            "network": "eth_erc20"
        }]
    }
}
```

## Payment information 

**Send Request**
```javascript
const checkPayment = await cryptomus.getPaymentInfo({
    // To get the account status, you need to pass one of the required parameters, 
    // if you pass both, the account will be identified using the order_id
    uuid: "1234567890",
    order_id: "0987654321"
});
```

**Response**
```json
{
    "state": 0,
    "result": {
        "uuid": "3901446a-4b74-4796-b50a-14e14dafe3ed",
        "order_id": "5",
        "amount": "45.0000",
        "payment_amount": null,
        "payer_amount": "0.74067734",
        "payer_currency": "USDT",
        "currency": "USD",
        "comments": null,
        "network": null,
        "address": null,
        "from": null,
        "txid": null,
        "payment_status": "check",
        "url": "https://pay.cryptomus.com/pay/3901446a-4b74-4796-b50a-14e14dafe3ed",
        "expired_at": 1660826040,
        "status": "check",
        "is_final": false
    }
}
```

## Payment history

**Send Request** 
```javascript
const paymentList = await cryptomus.getPaymentHistory({
    date_from: "2023-05-16 00:00:00",
    date_to: "2023-05-16 23:59:59"
});
```

**Response**
```json
{
  "state": 0,
  "result": {
    "items": [
      {
        "uuid": "19b37230-d65d-4a9c-8213-980bfb349144",
        "order_id": null,
        "amount": "457.00000000",
        "payment_amount": null,
        "payer_amount": null,
        "payer_currency": null,
        "currency": "USDT",
        "comments": null,
        "network": null,
        "address": null,
        "from": null,
        "txid": null,
        "payment_status": "check",
        "url": "https://pay.cryptomus.com/pay/19b37230-d65d-4a9c-8213-980bfb349144",
        "expired_at": 1654873897,
        "status": "check",
        "is_final": false,
        "created_at": "2023-05-02T13:52:28+03:00",
        "updated_at": "2023-05-02T14:54:15+03:00"
      }
    ],
    "paginate": {
      "count": 15,
      "hasPages": true,
      "nextCursor": "eyJpZCI6MTk3LCJfcG9pbnRzVG9OZXh0SXRlbXMiOnRydWV9",
      "previousCursor": "eyJpZCI6MjExLCJfcG9pbnRzVG9OZXh0SXRlbXMiOmZhbHNlfQ",
      "perPage": 15
    }
  }
}
```

## Payment services

**Send Request**
```javascript
const paymentServices = await cryptomus.getPaymentServices();
```

**Response**
```json
{
  "state": 0,
  "result": [
    {
      "network": "TRON",
      "currency": "USDT",
      "is_available": true,
      "limit": {
        "min_amount": "1.00000000",
        "max_amount": "1000000.00000000"
      },
      "commission": {
        "fee_amount": "0.00",
        "percent": "3.00"
      }
    },
    {
      "network": "ETH",
      "currency": "ETH",
      "is_available": true,
      "limit": {
        "min_amount": "0.01000000",
        "max_amount": "10000.00000000"
      },
      "commission": {
        "fee_amount": "0.00",
        "percent": "3.00"
      }
    }
  ]
}
```

## Refund

**Send Request**
```javascript
const refund = await cryptomus.refund({
    // Invoice is identified by order_id or uuid, if you pass both, the account will be identified by uuid
    uuid: "0987654321",
    order_id: "1234567890",
    address: "13029i0jwqdjas",
    is_subtract: true, // Determines whether the commission is to be charged to the merchant or to the client (true - to the merchant, false - to the client)
});
```

**Response**
```json
{
    "state": 0
}
```

**Response example with error**
```json
{
    "state": 1,
    "message": "Payment was not found"
}
```

## Balance

**Send Request**
```javascript
const balance = await cryptomus.getBalance();
```

**Response**
```json
{
  "state": 0,
  "result": [
    {
      "balance": {
        "merchant": [
          {
            "uuid": "abcdabcd-abcd-1234-1234-abcdabcd",
            "balance": "0.00000000",
            "currency_code": "ETH"
          },
          {
            "uuid": "abcdabcd-abcd-1234-1234-abcdabcd",
            "balance": "0.57000000",
            "currency_code": "BTC"
          }
        ],
        "user": [
          {
            "uuid": "abcdabcd-abcd-1234-1234-abcdabcd",
            "balance": "0.40000000",
            "currency_code": "BTC"
          },
          {
            "uuid": "abcdabcd-abcd-1234-1234-abcdabcd",
            "balance": "52.00000000",
            "currency_code": "USDT"
          }
        ]
      }
    }
  ]
}
```

## Resend webhook

**Send Request**
```javascript
const resend = await cryptomus.resendWebhook({
    // You need to pass one of the required parameters, if you pass both, the account will be identified by order_id
    uuid: "0987654321",
    order_id: "1234567890"
});
```

**Response**
```json
{
    "state": 0
}
```

**Response example with error**
```json
{
    "state": 1,
    "message": "Payment was not found"
}
```

## Creating a static wallet

**Send Request**
```javascript
const wallet = await cryptomus.createWallet({
    network: "tron",
    currency: "USDT",
    order_id: cryptomus.generateShortUUID(), // Use only short UUID for a wallet methods
    url_callback: "https://your.site/callback"
});
```

**Response**
```json
{
  "state": 0,
  "result": {
    "wallet_uuid": "9f64a7ce-...",
    "uuid": "8241bd2f-...",
    "address": "TK8...",
    "network": "TRON",
    "currency": "USDT"
  }
}
```

## Block static wallet

**Send Request**
```javascript
const wallet = await cryptomus.blockWallet({
    // You need to pass one of the required parameters, if you pass both, the account will be identified by order_id
    uuid: "1234567890",
    order_id: "0987654321"
});
```

**Response**
```json
{
  "state": 0,
  "result": {
    "uuid": "8241bd2f-...",
    "status": "blocked"
  }
}
```

## Creating a payout

**Send Request**
```javascript
const wallet = await cryptomus.createPayout({
    amount: "5",
    currency: "USDT",
    network: "TRON",
    order_id: cryptomus.generateShortUUID(), // Use only short UUID for a payout methods
    address: "TDD97yguPESTpcrJMqU6h2ozZbibv4Vaqm",
    is_subtract: true
});
```

**Response**
```json
{
  "state": 0,
  "result": {
    "uuid": "a7c0caec-a594-4aaa-b1c4-77d511857594",
    "amount": "3",
    "currency": "USDT",
    "network": "TRON",
    "address": "TJ...",
    "txid": null,
    "status": "process",
    "is_final": false,
    "balance": 129,
    "payer_currency": "USD",
    "payer_amount": 3
  }
}
```

## Payout information

**Send Request**
```javascript
const wallet = await cryptomus.getPayoutInfo({
    // One of the mandatory parameters must be passed in order to receive the payout status, if you pass both, the payout will be identified by order_id
    uuid: "1234567890",
    order_id: "0987654321"
});
```

**Response**
```json
{
  "state": 0,
  "result": {
    "uuid": "a7c0caec-a594-4aaa-b1c4-77d511857594",
    "amount": "3",
    "currency": "USDT",
    "network": "tron_trc20",
    "address": "TJ...",
    "txid":"AM...",
    "status": "process",
    "is_final": false,
    "balance": 129
  }
}
```

## Payout history

**Send Request**
```javascript
const payoutList = await cryptomus.getPayoutHistory();
```

**Response**
```json
{
  "state": 0,
  "result": {
    "merchant_uuid": "cb2131ff-a3d4-46dd-94c6-3714fae65f89",
    "items": [
      {
        "uuid": "c8734e30-0a8b-47e3-a5e4-375684395245",
        "amount": "0.00000100",
        "currency": "USDT",
        "network": "TRON",
        "address": "DW...",
        "txid": "AJ...",
        "order_id": 1,
        "status": "paid",
        "is_final": true,
        "balance": "98259.99997600"
      }
    ],
    "paginate": {
      "count": 15,
      "hasPages": true,
      "nextCursor": "eyJpZCI6NTEsIl9wb2ludHNUb05leHRJdGVtcyI6dHJ1ZX0",
      "previousCursor": null,
      "perPage": 15
    }
  }
}
```

## Payout services

**Send Request**
```javascript
const services = await cryptomus.getPayoutServices();
```

**Response**
```json
{
  "state": 0,
  "result": [
    {
      "network": "TRON",
      "currency": "USDT",
      "is_available": true,
      "limit": {
        "min_amount": "1.00000000",
        "max_amount": "1000000.00000000"
      },
      "commission": {
        "fee_amount": "0.00",
        "percent": "3.00"
      }
    },
    {
      "network": "ETH",
      "currency": "ETH",
      "is_available": true,
      "limit": {
        "min_amount": "0.01000000",
        "max_amount": "10000.00000000"
      },
      "commission": {
        "fee_amount": "0.00",
        "percent": "3.00"
      }
    },
    {
      "network": "ETH",
      "currency": "USDT",
      "is_available": true,
      "limit": {
        "min_amount": "1.00000000",
        "max_amount": "1000000.00000000"
      },
      "commission": {
        "fee_amount": "0.00",
        "percent": "3.00"
      }
    }
  ]
}
```

## Transfer to wallet

**Send Request**
```javascript
const transferToWallet = await cryptomus.transferToWallet("personal", {
    amount: "3",
    currency: "USDT"
});
```

**Response**
```json
{
  "state": 0,
  "result": {
    "user_wallet_transaction_uuid": "a7c0caec-a594-4aaa-b1c4-77d511857594",
    "user_wallet_balance": "3",
    "merchant_transaction_uuid": "a7c0caec-a594-4aaa-b1c4-77d511857594",
    "amount": "3"
  }
}
```

## Create UUID
**You can use these methods on your `order_id`**
```javascript
const order_id = cryptomus.generateUUID(); // example: a7c0caec-a594-4aaa-b1c4-77d511857594

// You need short UUID, when you use wallet methods or payout methods
const order_id = cryptomus.generateShortUUID(); // example: mhvXdrZT4jP5T8vBxuvm75
```


