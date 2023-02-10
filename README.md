<h2 align="left">XRPLF Standards Proposal</h2>

<p align="left">
0037 XLS-37d - Improved Concise Transaction Identifier (CTIM)
</p>

> This proposal replaces [XLS-15d](https://github.com/XRPLF/XRPL-Standards/discussions/34)

# Abstract

This is a proposed standard to easily locate transactions that have been accepted on an XRP Ledger Protocol Chain, according to the ledger sequence they were accepted into rather than the hash of the transaction.

# Introduction

### Hashing

The XRP Ledger uniquely defines ledgers and transactions with a hexidecimal representation. These hexidecimal values are produced using a SHA-512Half hashing function, which transforms data into a SHA-512 hash and then takes the first half of the output.

Since these hashes are derived from the contents of the data, each hash and its corresponding hexidecimal representation are unique. All hash values on the XRP Ledger are 64 charaters in length (32 bytes or 256 bits) and in hexidecimal format (0-9 / A-F and usually uppercase).

> Ledger Hash: F8A87917637D476E871D22A1376D7C129DAC9E25D45AD4B67D1E75EA4418654C

> Transaction Hash: 1C0FA22BBF5D0A8A7A105EB7D0AD7A2532863AA48584493D4BC45741AEDC4826

### Indexing

Ldegers and transactions can also be indentified by their sequenced position on the XRP Ledger.

As new ledgers are validated on the XRP Ledger, ususally every 3 to 5 seconds, they are assigned an integer based on their positon within in the overall ledger. This enables ledgers to be identified by a ledger index, also referred to as a sequence number. The only limitation is that the ledger needs to be closed before a sequence number can be assigned and used to identification.

> Ledger Index: 62084722

During concensous, all nodes on the XRP Ledger will sort and agree upon the order of transactions within a given ledger. This unique sequence of transactions is also referred to as a canonical order. Given the process, every closed, or validated ledger will list transactions in a seqencial order that was agreed upon by the nodes of the network. This means that transactions, like ledgers, can also be identified by an index, so long as the ledger is closed and the ledger index is known.

> Ledger Index: 25

### Motivation

As the ledger grows in size, optimizations techniques may be considered to limit the storage footprint of nodes and applications building on the XRP Ledger. If a transaction can be indentified by a hash or index, it is advantegous to consider the length each value.

Like mentioned earlier, the length of a transaction hash is 32 bytes, or 256 bits.

# Getting Started

In an existing project (with package.json), install xls-37d with:

```
npm install xls-37d
```

or with yarn

```
yarn add xls-37d
```

#### Encoding

```ts
import xls37d from 'xls-37d';

const { ctim, bigInt, hex, bin, bytes } = new xls37d.encode({
  networkId,
  ledgerIndex,
  txnIndex,
});
```

#### Decoding

```ts
import xls37d from 'xls-37d';

const { networkId, ledgerIndex, txnIndex } = new xls37d.decode(ctim);
```

# References

#### 0015 XLS-15d - Concise Transaction Identifier

https://github.com/XRPLF/XRPL-Standards/discussions/34

#### 0032 XLS-32d - Request URI Structure

https://github.com/XRPLF/XRPL-Standards/discussions/81

# Changelog

> 2023-02-10

- Published draft for open discussion
