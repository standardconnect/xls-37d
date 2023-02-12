import xls37d from '../dist/src/index';

describe('ctim', () => {
  test('improved-decode', () => {
    const { networkId, lgrIndex, txnIndex } = new xls37d.decode(
      'C3B3567200190001'
    );
    expect(networkId).toEqual(1);
    expect(lgrIndex).toEqual(62084722);
    expect(txnIndex).toEqual(25);
  });

  test('run1-improved-decode', () => {
    const { networkId, lgrIndex, txnIndex } = new xls37d.decode(
      'C0CA2AA7326FC045'
    );
    expect(networkId).toEqual(49221);
    expect(lgrIndex).toEqual(13249191);
    expect(txnIndex).toEqual(12911);
  });

  test('run2-improved-decode', () => {
    const { networkId, lgrIndex, txnIndex } = new xls37d.decode(
      'C000000000000000'
    );
    expect(networkId).toEqual(0);
    expect(lgrIndex).toEqual(0);
    expect(txnIndex).toEqual(0);
  });

  test('run3-improved-decode', () => {
    const { networkId, lgrIndex, txnIndex } = new xls37d.decode(
      'C000000100020003'
    );
    expect(networkId).toEqual(3);
    expect(lgrIndex).toEqual(1);
    expect(txnIndex).toEqual(2);
  });

  test('run4-improved-decode', () => {
    const { networkId, lgrIndex, txnIndex } = new xls37d.decode(
      'CFFFFFFFFFFFFFFF'
    );
    expect(networkId).toEqual(Number((0xffff).toString(10)));
    expect(lgrIndex).toEqual(Number((0xfffffff).toString(10)));
    expect(txnIndex).toEqual(Number((0xffff).toString(10)));
  });
});
