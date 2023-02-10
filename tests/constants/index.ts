export const ctiSample = 'xrpl:cti?id=17475295679037553836033';
export const ctiSampleBeta = 'xrpl-v0.0.3-beta:cti?id=17475295679037553836033';

const improved = {
  type: 'improved',
  networkId: 1,
  ledgerHash:
    'F8A87917637D476E871D22A1376D7C129DAC9E25D45AD4B67D1E75EA4418654C',
  ledgerIndex: '62084722',
  txnHash: '1C0FA22BBF5D0A8A7A105EB7D0AD7A2532863AA48584493D4BC45741AEDC4826',
  txnIndex: '25',
};

const modified = {
  networkId: 1,
  ledgerHash:
    'F8A87917637D476E871D22A1376D7C129DAC9E25D45AD4B67D1E75EA4418654C',
  ledgerIndex: '62084722',
  txnHash: '1C0FA22BBF5D0A8A7A105EB7D0AD7A2532863AA48584493D4BC45741AEDC4826',
  txnIndex: '25',
};

const advanced = {
  type: 'advanced',
  networkId: 10,
  ledgerHash:
    'F8A87917637D476E871D22A1376D7C129DAC9E25D45AD4B67D1E75EA4418654C',
  ledgerIndex: '62084722',
  txnHash: '1C0FA22BBF5D0A8A7A105EB7D0AD7A2532863AA48584493D4BC45741AEDC4826',
  txnIndex: '25',
};

const simple = {
  type: 'simple',
  ledgerHash:
    'F8A87917637D476E871D22A1376D7C129DAC9E25D45AD4B67D1E75EA4418654C',
  ledgerIndex: '62084722',
  txnHash: '1C0FA22BBF5D0A8A7A105EB7D0AD7A2532863AA48584493D4BC45741AEDC4826',
  txnIndex: '25',
};

export default {
  ctiSample,
  ctiSampleBeta,
  improved,
  advanced,
  modified,
  simple,
};
