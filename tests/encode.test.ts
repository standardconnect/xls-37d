import xls37d from '../dist/src/index';
import constants from './constants';

describe('ctid', () => {
  test('improved-encode', () => {
    const { ctid, bigInt, hex, bin } = new xls37d.encode(constants.improved);
    expect(hex).toEqual('0xC3B3567200190001');
    expect(bin).toEqual(
      '1100001110110011010101100111001000000000000110010000000000000001'
    );
    expect(bigInt).toEqual(14101709905855053825n);
    expect(ctid).toEqual('C3B3567200190001');

    expect(new xls37d.encode(constants.improved1).ctid).toEqual(
      'C0CA2AA7326FC045'
    );

    expect(new xls37d.encode(constants.improved2).ctid).toEqual(
      'C000000000000000'
    );

    expect(new xls37d.encode(constants.improved3).ctid).toEqual(
      'C000000100020003'
    );

    expect(new xls37d.encode(constants.improved4).ctid).toEqual(
      'CFFFFFFFFFFFFFFF'
    );

    expect(new xls37d.encode(constants.improved4).ctid).toEqual(
      'CFFFFFFFFFFFFFFF'
    );
  });
});

describe('cti', () => {
  test('simple-encode', () => {
    const { ctid, bigInt, hex, bin } = new xls37d.encode(constants.simple);
    expect(hex).toEqual('0xF1001903B35672');
    expect(bin).toEqual(
      '11110001000000000001100100000011101100110101011001110010'
    );
    expect(bigInt).toEqual(67835576823535218n);
    expect(ctid).toEqual('67835576823535218');
  });
  test('advanced-encode', () => {
    const { ctid, bigInt, hex, bin } = new xls37d.encode(constants.advanced);
    expect(hex).toEqual('0xF1000A03B356720019');
    expect(bin).toEqual(
      '111100010000000000001010000000111011001101010110011100100000000000011001'
    );
    expect(bigInt).toEqual(4445668140582553387033n);
    expect(ctid).toEqual('4445668140582553387033');
  });
  test('mod-encode', () => {
    const { ctid, bigInt, hex, bin } = new xls37d.encode(constants.modified);
    expect(hex).toEqual('0x3B35672000000190001');
    expect(bin).toEqual(
      '11101100110101011001110010000000000000000000000000000110010000000000000001'
    );
    expect(bigInt).toEqual(17475295679037553836033n);
    expect(ctid).toEqual('17475295679037553836033');
  });
});
