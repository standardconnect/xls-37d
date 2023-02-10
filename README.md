<h1 align="center">XLS-37d - Improved Concise Transaction Identifier</h1>

<p align="center">
Improved Concise Transaction Identifier
</p>

> This proposal replaces [XLS-15d](https://github.com/XRPLF/XRPL-Standards/discussions/34)

## Overview

This is a proposed standard to easily locate transactions that have been accepted on an XRP Ledger Protocol Chain, according to the ledger sequence they were accepted into rather than the hash of the transaction.

## Introduction

## Format

CTIMs are composed of 16 hex nibbles, and begin with a `C`.

```
CXXXXXXXYYYYZZZZ
```

The identifier is divided into three fields.

| Char Offset | Field   | Size (bits) | Explanation                                   |
| ----------- | ------- | ----------- | --------------------------------------------- |
| 0           | C       | 4           | Lead-in (ignore)                              |
| 1-7         | XXXXXXX | 28          | Ledger Sequence                               |
| 8-11        | YYYY    | 16          | Transaction index (offset) within that ledger |
| 12-16       | ZZZZ    | 16          | Network ID.                                   |

## Encoding

An example encoding routine in javascript follows:

```js
const encodeCTIM = (ledger_seq, txn_index, network_id) => {
  return (
    ((BigInt(0xc0000000) + BigInt(ledger_seq)) << 32n) +
    (BigInt(txn_index) << 16n) +
    BigInt(network_id)
  )
    .toString(16)
    .toUpperCase();
};
```

## Decoding

```js
const decodeCTIM = (ctim) => {
  if (typeof ctim == 'string') ctim = BigInt('0x' + ctim);
  return {
    ledger_seq: (ctim >> 32n) & ~0xc0000000n,
    txn_index: (ctim >> 16n) & 0xffffn,
    network_id: ctim & 0xffffn,
  };
};
```
