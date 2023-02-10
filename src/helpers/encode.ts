import { ICtiEncodeParams } from '../types/cti';
import { BytesList, UintArray } from '../buffers';
import { definitions } from '../def';

export class Encode {
  private sink: BytesList = new BytesList();
  public type: string;
  public def: any;
  public T: bigint = 0n;
  public L: bigint = 0n;
  private bits: number[] = [];

  public ctim: string | undefined;
  public hex: string | undefined;
  public bin: string | undefined;
  public bigInt: bigint = 0n;
  public bytes: Buffer | undefined;

  constructor(opts: ICtiEncodeParams) {
    this.type = opts.type || 'mod';
    this.def = definitions[this.type];
    this.handleBits();
    this.bytelist(opts);
    this.encode(opts);

    if (this.type === 'advanced')
      this.T = BigInt(Number(opts.txnIndex).toString(2).length <= 16 ? 0 : 1);
    if (this.type === 'advanced')
      this.L = BigInt(
        Number(opts.ledgerIndex).toString(2).length <= 32 ? 0 : 1
      );
  }

  private bytelist = (opts: ICtiEncodeParams) => {
    Object.keys(this.def)
      .sort((a, b) => this.def[a].nth - this.def[b].nth)
      .map((key, i) => {
        let bits = this.def[key].bits;
        if (this.bits[i]) bits = this.bits[i];

        let buffer = new UintArray(bits);

        if (key === 'control') {
          buffer.make(Number(this.T));
          buffer.make(Number(this.L));
          if (buffer.bytesArray[0]) this.write(buffer.bytesArray[0]);
          return;
        }

        let value = Number(opts[key]);
        if (this.def[key].checksum) value = parseInt(opts[key].slice(0, 1), 16);
        buffer.make(value);
        if (buffer.bytesArray[0]) this.write(buffer.bytesArray[0]);
      });
    this.bytes = this.sink.toBytes();
  };

  private write = (bytes: Buffer): void => {
    this.sink.put(new Uint8Array(bytes).buffer);
  };

  public isSimple = (cti: bigint): boolean => {
    return Number(cti >> 56n) === 0;
  };

  public get = (key: string): number | undefined => {
    if (!Object.keys(this.def).includes(key)) return undefined;

    let offset = 0;
    let sort = Object.keys(this.def).sort(
      (a, b) => this.def[b].nth - this.def[a].nth
    );

    for (const _key of sort) {
      if (_key === key) break;
      offset += this.def[_key].bits;
    }
    return Number((this.bigInt >> BigInt(offset)) & this.def[key].getValue);
  };

  private handleBits = () => {
    Object.keys(this.def)
      .sort((a, b) => this.def[a].nth - this.def[b].nth)
      .map((key) => {
        if (key === 'ledgerIndex')
          return this.bits.push(
            this.type === 'advanced' && this.L === 1n
              ? 64
              : this.def.ledgerIndex.bits
          );
        if (key === 'txnIndex')
          return this.bits.push(
            this.type === 'advanced' && this.T === 1n
              ? 32
              : this.def.txnIndex.bits
          );
        return this.bits.push(this.def[key].bits);
      });
  };

  public encode = (opts: ICtiEncodeParams) => {
    Object.keys(this.def)
      .sort((a, b) => this.def[a].nth - this.def[b].nth)
      .map((key, index) => {
        let value = 0n;

        if (key === 'control') {
          this.bigInt = (this.bigInt << BigInt(this.def[key].bits)) + this.T;
          return (this.bigInt =
            (this.bigInt << BigInt(this.def[key].bits)) + this.L);
        }

        if (this.def[key].checksum)
          value = BigInt(parseInt(opts[key].slice(0, 1), 16));
        if (!this.def[key].checksum) value = BigInt(opts[key]);

        let bits = this.bits[index];
        if (bits)
          return (this.bigInt = (this.bigInt << BigInt(bits)) + BigInt(value));
        return (this.bigInt =
          (this.bigInt << BigInt(this.def[key].bits)) + BigInt(value));
      });

    this.hex = '0x' + this.bigInt.toString(16).toUpperCase();
    this.bin = this.bigInt.toString(2);
    this.ctim = this.bigInt.toString();
  };

  public convert = this.sink;
}

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
