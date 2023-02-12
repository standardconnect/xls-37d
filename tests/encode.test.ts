import xls37d from '../dist/src/index';
import constants from './constants';

describe('ctim', () => {
  test('simple-encode', () => {
    const { ctim, bigInt, hex, bin } = new xls37d.encode(constants.simple);
    expect(hex).toEqual('0xF1001903B35672');
    expect(bin).toEqual(
      '11110001000000000001100100000011101100110101011001110010'
    );
    expect(bigInt).toEqual(67835576823535218n);
    expect(ctim).toEqual('67835576823535218');
  });
  test('advanced-encode', () => {
    const { ctim, bigInt, hex, bin } = new xls37d.encode(constants.advanced);
    expect(hex).toEqual('0xF1000A03B356720019');
    expect(bin).toEqual(
      '111100010000000000001010000000111011001101010110011100100000000000011001'
    );
    expect(bigInt).toEqual(4445668140582553387033n);
    expect(ctim).toEqual('4445668140582553387033');
  });
  test('mod-encode', () => {
    const { ctim, bigInt, hex, bin } = new xls37d.encode(constants.modified);
    expect(hex).toEqual('0x3B35672000000190001');
    expect(bin).toEqual(
      '11101100110101011001110010000000000000000000000000000110010000000000000001'
    );
    expect(bigInt).toEqual(17475295679037553836033n);
    expect(ctim).toEqual('17475295679037553836033');
  });

  test('improved-encode', () => {
    const { ctim, bigInt, hex, bin } = new xls37d.encode(constants.improved);
    expect(hex).toEqual('0xC3B3567200190001');
    expect(bin).toEqual(
      '1100001110110011010101100111001000000000000110010000000000000001'
    );
    expect(bigInt).toEqual(14101709905855053825n);
    expect(ctim).toEqual('C3B3567200190001');

    expect(new xls37d.encode(constants.improved1).ctim).toEqual(
      'C0CA2AA7326FC045'
    );

    expect(new xls37d.encode(constants.improved2).ctim).toEqual(
      'C000000000000000'
    );

    expect(new xls37d.encode(constants.improved3).ctim).toEqual(
      'C000000100020003'
    );

    expect(new xls37d.encode(constants.improved4).ctim).toEqual(
      'CFFFFFFFFFFFFFFF'
    );

    expect(new xls37d.encode(constants.improved4).ctim).toEqual(
      'CFFFFFFFFFFFFFFF'
    );
  });
});
