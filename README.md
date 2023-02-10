<h2 align="left">XRPLF Standards Proposal</h2>

<p align="left">
0037 XLS-37d - Transaction Identifier (CTIM)
</p>

> This proposal replaces [XLS-15d](https://github.com/XRPLF/XRPL-Standards/discussions/34)

&nbsp;

# Abstract

This is a proposed standard to easily locate transactions that have been accepted on an XRP Ledger Protocol Chain, according to the ledger sequence they were accepted into rather than the hash of the transaction.

# 1. Introduction

#### 1.1 Hashing

The XRP Ledger uniquely defines ledgers and transactions with a hexidecimal representation. These hexidecimal values are produced using a SHA-512Half hashing function, which transforms data into a SHA-512 hash and then takes the first half of the output.

Since these hashes are derived from the contents of the data, each hash and its corresponding hexidecimal representation are unique. All hash values on the XRP Ledger are 64 charaters in length (32 bytes or 256 bits) and in hexidecimal format (0-9 / A-F and usually uppercase).

> Ledger Hash: F8A87917637D476E871D22A1376D7C129DAC9E25D45AD4B67D1E75EA4418654C

> Transaction Hash: 1C0FA22BBF5D0A8A7A105EB7D0AD7A2532863AA48584493D4BC45741AEDC4826

#### 1.2. Indexing

Ldegers and transactions can also be indentified by their sequenced position on the XRP Ledger.

#### 1.2.1 Ledger Index

As new ledgers are validated on the XRP Ledger, ususally every 3 to 5 seconds, they are assigned an integer based on their positon within in the overall ledger. This enables ledgers to be identified by a ledger index, also referred to as a sequence number. The only limitation is that the ledger needs to be closed before a sequence number can be assigned and used to identification.

> Ledger Index: 62084722

#### 1.2.2 Transaction Index

During concensous, all nodes on the XRP Ledger will sort and agree upon the order of transactions within a given ledger. This unique sequence of transactions is also referred to as a canonical order. Given the process, every closed, or validated ledger will list transactions in a seqencial order that was agreed upon by the nodes of the network. This means that transactions, like ledgers, can also be identified by an index, so long as the ledger is closed and the ledger index is known.

> Ledger Index: 25

#### 1.3 Motivation

As the ledger grows in size, optimizations techniques may be considered to limit the storage footprint of nodes and applications building on the XRP Ledger. If a transaction can be indentified by a hash or index, it is advantegous to consider the length each value.

Like mentioned earlier, the length of a transaction hash is 32 bytes, or 256 bits.

#### Table 1-1. Transaction Hash Chaacteristics

| Transaction Hash |                                                                  |
| ---------------- | ---------------------------------------------------------------- |
| Type             | Hexidecimal                                                      |
| Characters       | 64                                                               |
| Size (bits)      | 256                                                              |
| Sample           | 1C0FA22BBF5D0A8A7A105EB7D0AD7A2532863AA48584493D4BC45741AEDC4826 |

At the time of writing, a ledger index is 8 digits ( 3.5 bytes, or 28 bits) holding around 120 transactions (1 byte or 8 bits). This would equate to a 4.5 byte or 36 bit representation.

Table 1-2. Ledger & Transaction Index Chaacteristics

| Ledger Index |          |     |     | Transaction Index |         |
| ------------ | -------- | --- | --- | ----------------- | ------- |
| Type         | Integer  |     |     | Type              | Integer |
| Digits       | 8        |     |     | Digits            | 2       |
| Size (bits)  | 28       |     |     | Size (bits)       | 8       |
| Sample       | 62084722 |     |     | Sample            | 32      |

# 2. Considerations

In order for this standard to sustain for next 10 years, the size of the parameters need to be considered to ensure compatibility and extensibity.

#### 2.1 Bit Allocations

For each input value, the max bit allocation is considered and the maximum upperbound limit is tabulated.

#### Table 2-1. CTIM Allocation Limits

| Type              | Size (bits) | Upperbound  |
| ----------------- | ----------- | ----------- |
| Ledger Index      | 28          | 268,435,455 |
| Transaction Index | 16          | 32,767      |
| Network ID        | 16          | 32,767      |

#### 2.2 Extensible

A leading `C` provides room for growth if necessary. If the Ledger Index exceeds 268,435,455, the leading `C` may be removed in order to reallocate the Ledger Index up to 32 bits.

> This is a maximum total of 4,294,967,295 closed ledgers. Estimated ~400 yrs

#### 2.3 Space Reduction and Savings

By implementing the improved concise transactions identifies (CTIM), it would save occupy a quarter (1/4) of the spaced compared indexing using transaction hashes. See Table 2-2 for a comparisions of the sizes.

#### Table 2-2. Comparision of Length

| Type             | Characters | Size (bits) |     |
| ---------------- | ---------- | ----------- | --- |
| Transaction Hash | 64         | 256         |     |
| CTIM             | 16         | 64          |     |

# 3. Specifications

### 3.1 Format

CTIMs are composed of 16 hex nibbles, and begin with a `C`.

```
C [ XXXXXXX ] [ YYYY ] [ ZZZZ ]
```

The identifier is divided into three fields.

#### Table 3-1. Comparision of Bit Lengths

| Char Offset | Field   | Size (bits) | Description                    |
| ----------- | ------- | ----------- | ------------------------------ |
| 0           | C       | 4           | Lead-in                        |
| 1-7         | XXXXXXX | 28          | Ledger Index / Sequence Number |
| 8-11        | YYYY    | 16          | Transaction Index              |
| 12-16       | ZZZZ    | 16          | Network ID\*                   |

# 4. Implementation

#### 4.1 Simple Implementation

#### 4.1.1 Encoding

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

#### 4.1.2 Decoding

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

#### 4.2 Advanced Implementation

An advanced implementation has been built with error handling and type safety.

See here for the source code: https://github.com/standardconnect/xls-37d

Full documentation available here: Coming soon...

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

const { ctim, bigInt, hex, bin, bytes } = new xls37d.encode({
  networkId,
  ledger_hash,
  ledger_index,
  txn_hash,
  txn_index,
});
```

#### 4.2.2 Decoding

```ts
import xls37d from 'xls-37d';

const { networkId, ledger_hash, ledger_index, txn_hash, txn_index } =
  new xls37d.decode(ctim);
```

# References

#### 0015 XLS-15d - Concise Transaction Identifier

https://github.com/XRPLF/XRPL-Standards/discussions/34

#### 0032 XLS-32d - Request URI Structure

https://github.com/XRPLF/XRPL-Standards/discussions/81

# Changelog

> 2023-02-10

- Published draft for open discussion
