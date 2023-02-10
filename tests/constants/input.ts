import {
  IAccountEncodeOpts,
  ICtiEncodeOpts,
  ILedgerEncodeOpts,
  IOfflineEncodeOpts,
  IPayloadEncodeOpts,
  ITxEncodeOpts,
} from '../../dist/types';

export const Account: IAccountEncodeOpts = {
  type: 'account',
  params: {
    address: 'rpfBYsmNBB7Y6z7qHS8g26KE3y3hHaTxkq',
    tag: '000001',
  },
};

export const Payload: IPayloadEncodeOpts = {
  type: 'payload',
  params: {
    blob: '1100612200000000240000000125000000072D0000000055DF530FB14C5304852F20080B0A8EEF3A6BDD044F41F4EBBD68B8B321145FE4FF6240000002540BE4008114D0F5430B66E06498D4CEEC816C7B3337F9982337',
  },
};

export const Ledger: ILedgerEncodeOpts = {
  type: 'ledger',
  params: {
    seq: '7295400',
  },
};

export const Offline: IOfflineEncodeOpts = {
  type: 'offline',
  params: {
    blob: '120007220008000024001ABED82A2380BF2C2019001ABED764D55920AC9391400000000000000000000000000055534400000000000A20B3C85F482532A9578DBB3950B85CA06594D165400000037E11D60068400000000000000A732103EE83BB432547885C219634A1BC407A9DB0474145D69737D09CCDC63E1DEE7FE3744630440220143759437C04F7B61F012563AFE90D8DAFC46E86035E1D965A9CED282C97D4CE02204CFD241E86F17E011298FC1A39B63386C74306A5DE047E213B0F29EFA4571C2C8114DD76483FACDEE26E60D8A586BB58D09F27045C46',
  },
};

export const Tx: ITxEncodeOpts = {
  type: 'tx',
  params: {
    hash: '73734B611DDA23D3F5F62E20A173B78AB8406AC5015094DA53F53D39B9EDB06C',
  },
};

export const Version: ILedgerEncodeOpts = {
  type: 'ledger',
  opts: {
    version: true,
  },
  params: {
    seq: '7295400',
  },
};

export const Cti: ICtiEncodeOpts = {
  type: 'cti',
  params: {
    networkId: 1,
    ledger_hash: 'F8A87917637D476E871D22A1376D7C129DAC9E25D45AD4B67D1E75EA4418654C',
    ledger_index: '62084722',
    txn_hash: '1C0FA22BBF5D0A8A7A105EB7D0AD7A2532863AA48584493D4BC45741AEDC4826',
    txn_index: '25',
  },
};
