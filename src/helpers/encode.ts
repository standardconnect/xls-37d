import { IEncodeParams } from '../types/ctid';
import { BytesList, UintArray } from '../buffers';
import { definitions } from '../def';

export class Encode {
  private sink: BytesList = new BytesList();
  public type: string;
  public def: any;
  public T: bigint = 0n;
  public L: bigint = 0n;
  private bits: number[] = [];

  public ctid: string | undefined;
  public hex: string | undefined;
  public bin: string | undefined;
  public bigInt: bigint = 0n;
  private bytes: Buffer | undefined;

  constructor(opts: IEncodeParams) {
    this.type = opts.type || 'improved';
    this.def = definitions[this.type];
    this.bytes;
    this.handleBits();
    this.bytelist(opts);
    this.encode(opts);

    if (this.type === 'advanced')
      this.T = BigInt(Number(opts.txnIndex).toString(2).length <= 16 ? 0 : 1);
    if (this.type === 'advanced')
      this.L = BigInt(Number(opts.lgrIndex).toString(2).length <= 32 ? 0 : 1);
  }

  private bytelist = (opts: IEncodeParams) => {
    let holder = '';
    let holderBits = 0;
    Object.keys(this.def)
      .sort((a, b) => this.def[a].nth - this.def[b].nth)
      .map((key) => {
        let bits = this.def[key].bits;
        holderBits += bits;

        let buffer = new UintArray(bits);

        if (key === 'control') {
          buffer.make(Number(this.T));
          buffer.make(Number(this.L));
          if (buffer.bytesArray[0]) this.write(buffer.bytesArray[0]);
          return;
        }

        if ((holderBits + bits) % 8 > 0) {
          if (key === 'lead') return (holder += 'C');
          if (this.def[key].checksum)
            holder += String(parseInt(opts[key].slice(0, 1), 16));
          return (holder += String(opts[key]));
        }

        let value = Number(holder + opts[key]);
        if (this.def[key].checksum)
          value = Number(holder + parseInt(opts[key].slice(0, 1), 16));

        buffer.make(value);
        holder = '';
        holderBits = 0;

        if (buffer.bytesArray[0]) this.write(buffer.bytesArray[0]);
        return;
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
        if (key === 'lgrIndex')
          return this.bits.push(
            this.type === 'advanced' && this.L === 1n
              ? 64
              : this.def.lgrIndex.bits
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

  public encode = (opts: IEncodeParams) => {
    let holder = 0n;
    let holderBits = 0;
    Object.keys(this.def)
      .sort((a, b) => this.def[a].nth - this.def[b].nth)
      .map((key) => {
        let value = 0n;

        if (key === 'control') {
          this.bigInt = (this.bigInt << BigInt(this.def[key].bits)) + this.T;
          return (this.bigInt =
            (this.bigInt << BigInt(this.def[key].bits)) + this.L);
        }

        let bits = this.def[key].bits;
        holderBits += bits;

        if (holderBits < 8 || holderBits % 8 !== 0) {
          if (key === 'lead')
            return (holder += BigInt(parseInt(this.def[key].value, 16)));
          if (this.def[key].checksum) {
            this.bigInt =
              (this.bigInt << BigInt(bits)) +
              BigInt(parseInt(opts[key].slice(0, 1), 16));
            holder = 0n;
            holderBits = 0;
            return;
          }

          return (holder += BigInt(opts[key]));
        }

        if (this.def[key].checksum)
          value = BigInt(parseInt(opts[key].slice(0, 1), 16));
        if (!this.def[key].checksum)
          value = (holder << BigInt(bits)) + BigInt(opts[key]);

        this.bigInt = (this.bigInt << BigInt(holderBits)) + BigInt(value);
        holder = 0n;
        holderBits = 0;
        return;
      });

    this.hex = '0x' + this.bigInt.toString(16).toUpperCase();
    this.bin = this.bigInt.toString(2);
    this.ctid =
      this.type !== 'improved' ? this.bigInt.toString() : this.hex.slice(2);
  };

  public convert = this.sink;
}
