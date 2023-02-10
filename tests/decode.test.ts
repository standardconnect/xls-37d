import xls37d from '../dist/src/index';

describe('cti', () => {
  test('mod-decode', () => {
    const { networkId, ledgerIndex, txnIndex } = new xls37d.decode(
      '17475295679037553836033'
    );
    expect(networkId).toEqual(1);
    expect(ledgerIndex).toEqual(62084722);
    expect(txnIndex).toEqual(25);
  });
});
