export const definitions = {
  simple: {
    lgrIndex: {
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
    lgrHash: {
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
    lgrIndex: {
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
    lgrHash: {
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
  modified: {
    networkId: {
      nth: 3,
      bits: 16,
      getValue: 0xffffn,
      type: 'number',
    },
    lgrIndex: {
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
    lead: {
      value: 'C',
      nth: 1,
      bits: 4,
    },
    networkId: {
      nth: 4,
      bits: 16,
      getValue: 0xffffn,
      type: 'number',
    },
    lgrIndex: {
      nth: 2,
      bits: 28,
      getValue: 0xfffffffn,
      type: 'number',
    },
    txnIndex: {
      nth: 3,
      bits: 16,
      getValue: 0xffffn,
      type: 'number',
    },
  },
};
