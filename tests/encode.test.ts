import xls37d from '../dist/src/index';
import constants from './constants';

describe('ctim', () => {
  test('simple-encode', () => {
    const { ctim, bigInt, hex, bin, bytes } = new xls37d.encode(
      constants.simple
    );
    expect(hex).toEqual('0xF1001903B35672');
    expect(bin).toEqual(
      '11110001000000000001100100000011101100110101011001110010'
    );
    expect(bigInt).toEqual(67835576823535218n);
    expect(ctim).toEqual('67835576823535218');
    expect(bytes).toMatchObject(Buffer.from([15, 1, 0, 25, 3, 179, 86, 114]));
  });
  test('advanced-encode', () => {
    const { ctim, bigInt, hex, bin, bytes } = new xls37d.encode(
      constants.advanced
    );
    expect(hex).toEqual('0xF1000A03B356720019');
    expect(bin).toEqual(
      '111100010000000000001010000000111011001101010110011100100000000000011001'
    );
    expect(bigInt).toEqual(4445668140582553387033n);
    expect(ctim).toEqual('4445668140582553387033');
    expect(bytes).toMatchObject(
      Buffer.from([0, 15, 1, 0, 10, 3, 179, 86, 114, 0, 25])
    );
  });
  test('mod-encode', () => {
    const { ctim, bigInt, hex, bin, bytes } = new xls37d.encode(
      constants.modified
    );
    expect(hex).toEqual('0x3B35672000000190001');
    expect(bin).toEqual(
      '11101100110101011001110010000000000000000000000000000110010000000000000001'
    );
    expect(bigInt).toEqual(17475295679037553836033n);
    expect(ctim).toEqual('17475295679037553836033');
    expect(bytes).toMatchObject(
      Buffer.from([3, 179, 86, 114, 0, 0, 0, 25, 0, 1])
    );
  });

  test('mod-decode', () => {
    const { networkId, ledgerIndex, txnIndex } = new xls37d.decode(
      '17475295679037553836033'
    );
    expect(networkId).toEqual(1);
    expect(ledgerIndex).toEqual(62084722);
    expect(txnIndex).toEqual(25);
  });
});
