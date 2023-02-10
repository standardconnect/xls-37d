export const ctiSample = 'xrpl:cti?id=17475295679037553836033';
export const ctiSampleBeta = 'xrpl-v0.0.3-beta:cti?id=17475295679037553836033';

const improved = {
  type: 'improved',
  networkId: 1,
  ledger_hash:
    'F8A87917637D476E871D22A1376D7C129DAC9E25D45AD4B67D1E75EA4418654C',
  ledger_index: '62084722',
  txn_hash: '1C0FA22BBF5D0A8A7A105EB7D0AD7A2532863AA48584493D4BC45741AEDC4826',
  txn_index: '25',
};

const modified = {
  networkId: 1,
  ledger_hash:
    'F8A87917637D476E871D22A1376D7C129DAC9E25D45AD4B67D1E75EA4418654C',
  ledger_index: '62084722',
  txn_hash: '1C0FA22BBF5D0A8A7A105EB7D0AD7A2532863AA48584493D4BC45741AEDC4826',
  txn_index: '25',
};

const advanced = {
  type: 'advanced',
  networkId: 10,
  ledger_hash:
    'F8A87917637D476E871D22A1376D7C129DAC9E25D45AD4B67D1E75EA4418654C',
  ledger_index: '62084722',
  txn_hash: '1C0FA22BBF5D0A8A7A105EB7D0AD7A2532863AA48584493D4BC45741AEDC4826',
  txn_index: '25',
};

const simple = {
  type: 'simple',
  ledger_hash:
    'F8A87917637D476E871D22A1376D7C129DAC9E25D45AD4B67D1E75EA4418654C',
  ledger_index: '62084722',
  txn_hash: '1C0FA22BBF5D0A8A7A105EB7D0AD7A2532863AA48584493D4BC45741AEDC4826',
  txn_index: '25',
};

export const decodedCti = {
  protocol: 'xrpl',
  version: '0.0.3-beta',
  type: 'cti',
  params: {
    id: '17475295679037553836033',
    networkId: 1,
    ledger_index: 62084722,
    txn_index: 25,
  },
};

export default {
  ctiSample,
  ctiSampleBeta,
  improved,
  advanced,
  modified,
  simple,
};
