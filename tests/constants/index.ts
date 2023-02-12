const improved1 = {
  networkId: 49221,
  lgrIndex: 13249191,
  txnIndex: 12911,
};

const improved2 = {
  networkId: 0,
  lgrIndex: 0,
  txnIndex: 0,
};

const improved3 = {
  networkId: 3,
  lgrIndex: 1,
  txnIndex: 2,
};

const improved4 = {
  networkId: 0xffff,
  lgrIndex: 0xfffffff,
  txnIndex: 0xffff,
};

const improved = {
  networkId: 1,
  lgrIndex: 62084722,
  txnIndex: 25,
};

const modified = {
  type: 'modified',
  networkId: 1,
  lgrHash: 'F8A87917637D476E871D22A1376D7C129DAC9E25D45AD4B67D1E75EA4418654C',
  lgrIndex: 62084722,
  txnHash: '1C0FA22BBF5D0A8A7A105EB7D0AD7A2532863AA48584493D4BC45741AEDC4826',
  txnIndex: 25,
};

const advanced = {
  type: 'advanced',
  networkId: 10,
  lgrHash: 'F8A87917637D476E871D22A1376D7C129DAC9E25D45AD4B67D1E75EA4418654C',
  lgrIndex: 62084722,
  txnHash: '1C0FA22BBF5D0A8A7A105EB7D0AD7A2532863AA48584493D4BC45741AEDC4826',
  txnIndex: 25,
};

const simple = {
  type: 'simple',
  lgrHash: 'F8A87917637D476E871D22A1376D7C129DAC9E25D45AD4B67D1E75EA4418654C',
  lgrIndex: 62084722,
  txnHash: '1C0FA22BBF5D0A8A7A105EB7D0AD7A2532863AA48584493D4BC45741AEDC4826',
  txnIndex: 25,
};

export default {
  improved,
  advanced,
  modified,
  simple,
  improved1,
  improved2,
  improved3,
  improved4,
};
