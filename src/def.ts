export const definitions = {
  simple: {
    ledgerIndex: {
      nth: 4,
      bits: 32,
      getValue: 0xffffffffn,
      type: 'number',
    },
    txnIndex: {
      nth: 3,
      bits: 16,
      getValue: 0xffffn,
      type: 'number',
    },
    ledgerHash: {
      nth: 1,
      checksum: true,
      bits: 4,
      getValue: 0xffn,
      type: 'string',
    },
    txnHash: {
      nth: 2,
      checksum: true,
      bits: 4,
      getValue: 0xffn,
      type: 'string',
    },
  },
  advanced: {
    networkId: {
      nth: 4,
      bits: 16,
    },
    ledgerIndex: {
      nth: 5,
      bits: 32,
      varies: true,
    },
    txnIndex: {
      nth: 6,
      bits: 16,
      varies: true,
    },
    control: {
      nth: 1,
      bits: 1,
    },
    ledgerHash: {
      nth: 2,
      checksum: true,
      bits: 4,
    },
    txnHash: {
      nth: 3,
      checksum: true,
      bits: 4,
    },
  },
  mod: {
    networkId: {
      nth: 3,
      bits: 16,
      getValue: 0xffffn,
      type: 'number',
    },
    ledgerIndex: {
      nth: 1,
      bits: 32,
      getValue: 0xffffffffn,
      type: 'number',
    },
    txnIndex: {
      nth: 2,
      bits: 32,
      getValue: 0xffffffffn,
      type: 'number',
    },
  },
  improved: {
    networkId: {
      nth: 3,
      bits: 16,
    },
    ledgerIndex: {
      nth: 1,
      bits: 32,
    },
    txnIndex: {
      nth: 2,
      bits: 16,
    },
  },
};
