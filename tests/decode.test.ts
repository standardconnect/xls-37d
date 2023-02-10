import xls37d from '../dist/src/index';

describe('cti', () => {
  test('mod-decode', () => {
    const { networkId, ledger_index, txn_index } = new xls37d.decode(
      '17475295679037553836033'
    );
    expect(networkId).toEqual(1);
    expect(ledger_index).toEqual(62084722);
    expect(txn_index).toEqual(25);
  });
});
