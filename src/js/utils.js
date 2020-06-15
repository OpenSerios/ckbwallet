const EC = require('elliptic').ec
import * as ckbUtils from '@nervosnetwork/ckb-sdk-utils'

const ec = new EC('secp256k1')

const MainNetCodeHash = '0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8'
const DECIMAL = 8

const mainNetOpts = {
  prefix: 'ckb',
  type: '0x01',
  codeHashOrCodeHashIndex: '0x00'
}

const testNetOpts = {
  prefix: 'ckt',
  type: '0x01',
  codeHashOrCodeHashIndex: '0x00'
}

function generateAddressFromPK(pk) {
  const pubKey = ckbUtils.privateKeyToPublicKey(pk)
  const blake160 = '0x' + ckbUtils.blake160(pubKey, 'hex')
  const lockHash = ckbUtils.scriptToHash({
    hashType: 'type',
    codeHash: MainNetCodeHash,
    args: blake160
  })
  const mainAddr = ckbUtils.privateKeyToAddress(pk, mainNetOpts)
  const testAddr = ckbUtils.privateKeyToAddress(pk, testNetOpts)

  return {
    privateKey: pk,
    publicKey: pubKey,
    lockHash: lockHash,
    blake160: blake160,
    mainnetAddress: mainAddr,
    testnetAddress: testAddr
  }
}

function generateAddress() {
  // privateKey need to be BN
  const privateKey = '0x' + ec.genKeyPair().priv.toString('hex')
  return generateAddressFromPK(privateKey)
}

function shannonToCKB(shannon) {
  // eslint-disable-next-line no-undef
  if (shannon === BigInt(0)) {
    return `0.${'0'.repeat(DECIMAL)}`
  }

  const isNegative = shannon < 0
  const absStr = isNegative ? `${shannon}`.slice(1) : `${shannon}`
  if (absStr.length <= DECIMAL) {
    return `${isNegative ? '-' : ''}0.${absStr.padStart(DECIMAL, '0')}`
  }
  const int = absStr.slice(0, -1 * DECIMAL)
  const dec = absStr.slice(-1 * DECIMAL)
  return `${isNegative ? '-' : ''}${int}.${dec}`
}

export {
  generateAddress,
  generateAddressFromPK,
  shannonToCKB
}
