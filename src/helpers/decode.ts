import { definitions } from '../def';

export class Decode {
  public def: any;
  public T: bigint = 0n;
  public L: bigint = 0n;

  public cti: string | undefined;
  public hex: string | undefined;
  public bin: string | undefined;
  public uri: string = '';
  public bigInt: bigint = 0n;
  public bytes: Buffer | undefined;
  public networkId: number | undefined;
  public ledgerIndex: number | undefined;
  public txnIndex: number | undefined;

  constructor(cti: string) {
    this.cti = cti;
    this.def = definitions['mod'];
    this.bigInt = BigInt(this.cti);
    this.hex = '0x' + this.bigInt.toString(16).toUpperCase();
    this.bin = this.bigInt.toString(2);
    this.cti = this.bigInt.toString();
    this.uri = 'cti:' + this.cti;
    this.getNetworkId();
    this.getLedger();
    this.getTx();
  }

  public isSimple = (cti: bigint): boolean => {
    return Number(cti >> 56n) === 0;
  };

  private getNetworkId = (): void => {
    let offset = 0;
    let sort = Object.keys(this.def).sort(
      (a, b) => this.def[b].nth - this.def[a].nth
    );

    for (const _key of sort) {
      if (_key === 'networkId') break;
      offset += this.def[_key].bits;
    }
    this.networkId = Number(
      (this.bigInt >> BigInt(offset)) & this.def.networkId.getValue
    );
  };

  private getLedger = (): void => {
    let offset = 0;
    let sort = Object.keys(this.def).sort(
      (a, b) => this.def[b].nth - this.def[a].nth
    );

    for (const _key of sort) {
      if (_key === 'ledgerIndex') break;
      offset += this.def[_key].bits;
    }
    this.ledgerIndex = Number(
      (this.bigInt >> BigInt(offset)) & this.def.ledgerIndex.getValue
    );
  };

  private getTx = (): void => {
    let offset = 0;
    let sort = Object.keys(this.def).sort(
      (a, b) => this.def[b].nth - this.def[a].nth
    );

    for (const _key of sort) {
      if (_key === 'txnIndex') break;
      offset += this.def[_key].bits;
    }
    this.txnIndex = Number(
      (this.bigInt >> BigInt(offset)) & this.def.txnIndex.getValue
    );
  };
}
