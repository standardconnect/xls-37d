import { definitions } from '../def';

export class Decode {
  public def: any;
  public T: bigint = 0n;
  public L: bigint = 0n;

  public ctid: string | undefined;
  public hex: string | undefined;
  public bin: string | undefined;
  public uri: string = '';
  public bigInt: bigint = 0n;
  public bytes: Buffer | undefined;
  public networkId: number | undefined;
  public lgrIndex: number | undefined;
  public txnIndex: number | undefined;

  constructor(ctid: string) {
    this.ctid = ctid;
    this.def = definitions['improved'];
    this.hex = '0x' + ctid;
    this.bigInt = BigInt(this.hex);
    this.bin = this.bigInt.toString(2);
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
      if (_key === 'lgrIndex') break;
      offset += this.def[_key].bits;
    }
    this.lgrIndex = Number(
      (this.bigInt >> BigInt(offset)) & this.def.lgrIndex.getValue
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
