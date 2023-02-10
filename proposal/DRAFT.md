```
Title:       Improved Concise Transaction Identifier (CTIM)
Revision:    1 (2023-02-09)
Author:      Richard Holland
Affiliation: XRPL-Labs, XRPLF
```

> This proposal replaces [XLS-15d](https://github.com/XRPLF/XRPL-Standards/discussions/34)

# Improved Concise Transaction Identifier

This is a proposed standard to easily locate transactions that have been accepted on an XRP Ledger Protocol Chain, according to the ledger sequence they were accepted into rather than the hash of the transaction.

## 1. Format

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

## 2. Encoding

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

## 3. Decoding

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
