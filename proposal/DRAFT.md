```
Title:       Improved Concise Transaction Identifier (CTIM)
Revision:    1 (2023-02-11)
Author:      Richard Holland
             Ryan Molley
Affiliation: XRPL-Labs, XRPLF
```

> This proposal replaces the original proposal for Concise Transaction Identifiers [XLS-15d](https://github.com/XRPLF/XRPL-Standards/discussions/34)

# Overview

This is a proposed standard to locate transactions that have been accepted on an XRP Ledger Protocol Chain, according to their ledger sequence rather than the hash of the transaction.

This indentifier is only applicable for validated transactions. Unvalidated transactions, whether unsubmitted or locally rejected, would not have a consensus canonical order, and thus, this type of identifier would not apply.

# Specification

### Format

CTIMs are composed of 16 hex nibbles, and begin with a `C`.
The identifier is divided into three fields, enclosed in backets [ ] for readability purposes only.

```
C [ XXXXXXX ] [ YYYY ] [ ZZZZ ]
```

#### Ecoding Protocol

| Char Offset | Field   | Size (bits) | Description                    |
| ----------- | ------- | ----------- | ------------------------------ |
| 0           | C       | 4           | Lead-in                        |
| 1-7         | XXXXXXX | 28          | Ledger Index / Sequence Number |
| 8-11        | YYYY    | 16          | Transaction Index              |
| 12-16       | ZZZZ    | 16          | Network ID\*\*                 |

\*\* Refer to the Network Id key as presented in a forthcoming XRPLF Standard Proposal

# 1. Background

### 1.1 Hashing

The XRP Ledger uniquely defines ledgers and transactions with a hexidecimal representation. These hexidecimal values are produced using a namespace-biased 'SHA-512Half' hashing function, which transforms data into a SHA-512 hash and then takes the first half of the output.

Since these hashes are derived from the contents of the data, each hash is unique and are completely independent of ledger consensus. All hash values on the XRP Ledger are 64 charaters in length (32 bytes or 256 bits) and in hexidecimal format (0-9 / A-F and usually uppercase). [[1]](https://xrpl.org/basic-data-types.html#hashes)

> Ledger Hash: F8A87917637D476E871D22A1376D7C129DAC9E25D45AD4B67D1E75EA4418654C

> Transaction Hash: 1C0FA22BBF5D0A8A7A105EB7D0AD7A2532863AA48584493D4BC45741AEDC4826

### 1.2. Indexing

Ledgers and transactions can also be indentified by their sequenced position on the XRP Ledger.

As new ledgers are validated on the XRP Ledger, ususally every 3 to 5 seconds, they are assigned an integer based on their positon within in the overall ledger.
This enables ledgers to be identified by a `ledger_index`, also referred to as a sequence number [[2]](https://xrpl.org/basic-data-types.html#ledger-index) [[3]](https://xrpl.org/ledger-header.html) and thought to be more user-friendly over its hash-base counterpart. The only limitation is that the ledger needs to be closed before a sequence number can be assigned and used for identification.

> Ledger Index: 62084722

During consensus, all nodes on the XRP Ledger will sort and agree upon the order of transactions within a given ledger. This unique sequence of transactions is also referred to as a canonical order. [[4]](https://xrpl.org/consensus.html) Given the process, every closed, or validated ledger will list transactions in a seqencial order that was agreed upon by the nodes of the network. This means that transactions, like ledgers, can also be identified by their offset index, so long as the ledger is closed and the ledger index is known. This offset is present in the transaction metadata as `TransactionIndex`.[[5]](https://xrpl.org/transaction-metadata.html)

> Ledger Index: 25

### 1.3 Motivation

As the ledger grows in size, optimization techniques may be considered to limit the storage footprint of nodes and applications building on the XRP Ledger.

It may be useful, in a range of applications, to be able to uniquely identify a transaction by the point at which it was validated rather than by its explicit contents. If a transaction has been validated and can be indentified by a hash or index, it is advantegous to consider the length each value.

Like mentioned earlier, the length of a transaction hash is 32 bytes, or 256 bits.

#### Table 1-1. Transaction Hash Chacteristics

| Transaction Hash |                                                                  |
| ---------------- | ---------------------------------------------------------------- |
| Type             | Hexidecimal                                                      |
| Characters       | 64                                                               |
| Size (bits)      | 256                                                              |
| Sample           | 1C0FA22BBF5D0A8A7A105EB7D0AD7A2532863AA48584493D4BC45741AEDC4826 |

At the time of writing, a ledger index is 8 digits (28 bits) holding around 120 transactions (8 bits). This would approximate to a 36 bit allocation.

#### Table 1-2. Ledger & Transaction Index Chacteristics

| Ledger Index |          |     | Transaction Index |         |
| ------------ | -------- | --- | ----------------- | ------- |
| Type         | Integer  |     | Type              | Integer |
| Digits       | 8        |     | Digits            | 2       |
| Size (bits)  | 28       |     | Size (bits)       | 8       |
| Sample       | 62084722 |     | Sample            | 32      |

# 2. Considerations

### 2.1 Bit Allocations

To future-proof these identifiers for at least the next decade, the parameters and their sizes are considered to ensure compatibility and extensibility.
For each input value, the maximum bit allocation is considered and the upperbound limit is tabulated.

#### Table 2-1. CTIM Allocation Limits

| Type              | Size (bits) | Upperbound  |
| ----------------- | ----------- | ----------- |
| Ledger Index      | 28          | 268,435,455 |
| Transaction Index | 16          | 65,535      |
| Network ID        | 16          | 65,535      |

### 2.2 Extensible

A leading `C` provides room for growth. Shall the number of closed ledgers exceeds 268,435,455, the leading `C` may be removed in order to reallocate the Ledger Index up to 32 bits.

> This is a maximum total of 4,294,967,295 closed ledgers. Estimated ~400 yrs

### 2.3 Space Reduction and Savings

By implementing the improved concise transaction identifier (CTIM), it would occupy a quarter of the spaced as compared to indexing using transaction hashes. See Table 2-2 for size comparisions.

#### Table 2-2. Comparision of Length

| Type                                    | Characters | Size (bits) |
| --------------------------------------- | ---------- | ----------- |
| Transaction Hash                        | 64         | 256         |
| Improved Concise Transaction Identifier | 16         | 64          |

# 3. Specification

This section is [enclosed](https://github.com/standardconnect/xls-37d/blob/main/proposal/DRAFT.md?plain=1#L17) in the header of the proposal

# 4. Implementation

Two different implementations for the Improved Concise Transaction Identifier (CTIM) are presented.

- Simple
- Advanced

The first is a simplified method which is intended for easier self-implementation and adoption. The second is a more robusted version with type checking ands error handling.

### 4.1 Simple

#### 4.1.1 Encoding

An example encoding routine in javascript follows:

```js
const encodeCTIM = (lgrIndex, txnIndex, networkId) => {
  return (
    ((BigInt(0xc0000000) + BigInt(lgrIndex)) << 32n) +
    (BigInt(txnIndex) << 16n) +
    BigInt(networkId)
  )
    .toString(16)
    .toUpperCase();
};
```

#### 4.1.2 Decoding

```js
const decodeCTIM = (ctim) => {
  if (typeof ctim == 'string') ctim = BigInt('0x' + ctim);
  return {
    lgrIndex: (ctim >> 32n) & ~0xc0000000n,
    txnIndex: (ctim >> 16n) & 0xffffn,
    networkId: ctim & 0xffffn,
  };
};
```

### 4.2 Advanced

See here for the source code: https://github.com/standardconnect/xls-37d

Reference documentation available here: https://standardconnect.github.io/xls-37d/

#### 4.2.1 Getting Started

In an existing project (with package.json), install xls-37d with:

```
npm install xls-37d
```

or with yarn

```
yarn add xls-37d
```

#### 4.2.2 Encoding

```ts
import xls37d from 'xls-37d';

const { ctim } = new xls37d.encode({
  networkId,
  lgrIndex,
  txnIndex,
});
```

#### 4.2.2 Decoding

```ts
import xls37d from 'xls-37d';

const { networkId, lgrIndex, txnIndex } = new xls37d.decode(ctim);
```

# References

[1] https://xrpl.org/basic-data-types.html#hashes

[2] https://xrpl.org/basic-data-types.html#ledger-index

[3] https://xrpl.org/ledger-header.html

[4] https://xrpl.org/consensus.html

[5] https://xrpl.org/transaction-metadata.html

## List of applications to adopt CTIM

- [Rippled Source Code]()

- [XUMM Backend]()

- [0032 XLS-32d - Request URI Structure](https://github.com/XRPLF/XRPL-Standards/discussions/81)

\*\* To add your application to the list, please contact Ryan Molley through email intercoder@whirled.io.

# Changelog

> 2023-02-11

- Published draft for open discussion
