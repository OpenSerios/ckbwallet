const CKB = require('@nervosnetwork/ckb-sdk-core').default
const ckb = new CKB('http://localhost:8114')

const LOCK_CRIPT_HASH = 0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8

export { ckb, LOCK_CRIPT_HASH }
