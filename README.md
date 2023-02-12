<h2 align="left">XRPLF Standards Proposal</h2>

<p align="left">
0037 XLS-37d - Improved Concise Transaction Identifier (CTIM)
</p>

# Abstract

This standard provides a way to locate a _validated_ transaction on any XRP Ledger Protocol Chain using its ledger sequence number, transaction index, and network ID rather than its transaction hash.

This identifier is only applicable for validated transactions. Non-validated or unsubmitted transactions cannot be identified using a CTIM.

# Getting Started

In an existing project (with package.json), install xls-37d with:

```
npm install xls-37d
```

or with yarn:

```
yarn add xls-37d
```

Reference documentation available [here](https://standardconnect.github.io/xls-37d/). Please note, this is still a work-in-progress.

#### Encoding

An example encoding routine in typescript follows:

```ts
import xls37d from 'xls-37d';

const { ctim } = new xls37d.encode({
  networkId,
  lgrIndex,
  txnIndex,
});
```

#### Decoding

An example decoding routine in typescript follows:

```ts
import xls37d from 'xls-37d';

const { networkId, lgrIndex, txnIndex } = new xls37d.decode(ctim);
```

# Background

## Hashing

The XRP Ledger historically identifies ledgers and transactions (and other objects) using a namespace-biased 'SHA-512Half' hashing function, which results in a 64 hex nibble unique identifier.[[1]](https://xrpl.org/basic-data-types.html#hashes)

Since these hashes are derived from the contents of the data, each identifier is completely independent of consensus.

Example Transaction Hash (ID):

> C4E284010276F8457C4BF96D0C534B7383087680C159F9B8C18D5EE876F7EFE7

## Indexing

Ledgers and transactions can be identified by their sequenced position.

As new ledgers are validated on XRP Ledger Protocol Chains, they are assigned a sequence number, which is always the previous ledger sequence plus one. The first ledger sequence is the genesis ledger with a value of one.

Ledgers can therefore be uniquely identified by a `ledger_index` (sequence) [[2]](https://xrpl.org/basic-data-types.html#ledger-index) [[3]](https://xrpl.org/ledger-header.html). The only limitation is that the ledger needs to be closed before a sequence number can be used for identification.

## Motivation

The XRP Ledger is poised to become (or depending on the time of reading: has already become) an ecosystem of cooperatively interconnected XRPL Protocol Chains. It is imperative that users of these chains can efficiently locate a specific transaction on a specific chain. Therefore a network-aware transaction identifier is necessary.

# References

[1] [https://xrpl.org/basic-data-types.html#hashes](https://xrpl.org/basic-data-types.html#hashes)

[2] [https://xrpl.org/basic-data-types.html#ledger-index](https://xrpl.org/basic-data-types.html#ledger-index)

[3] [https://xrpl.org/ledger-header.html](https://xrpl.org/ledger-header.html)

[4] [https://xrpl.org/consensus.html](https://xrpl.org/consensus.html)

[5] [https://xrpl.org/transaction-metadata.html](https://xrpl.org/transaction-metadata.html)

#### 0015 XLS-15d - Concise Transaction Identifier

https://github.com/XRPLF/XRPL-Standards/discussions/34

#### 0032 XLS-32d - Request URI Structure

https://github.com/XRPLF/XRPL-Standards/discussions/81
