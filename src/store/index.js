import Vue from 'vue'
import Vuex from 'vuex'
import Notifications from './modules/notifications/notification'
import Address from './modules/address/address'
import Assets from './modules/asset/asset'
import Network from './modules/network/network'
import History from './modules/history/history'
import router from '@/router/router'
import { generateAddressFromPK } from '@/js/utils'
Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    Assets,
    Notifications,
    Network,
    Address,
    History
    // Address
  },
  state: {
    isAuth: false,
    rememberKey: false, // if true the keytore will remember keys during browser session
    privateKey: '',
    addresses: [],
    selectedAddress: '',
    blake160: '',
    selectedAddressLockHash: '',
    modals: {},
    networkType: ''
  },
  getters: {
    appReady(state, getters) {
      // let avaAsset = getters[''];
      //
      // if(!avaAsset) return false;
      return true
    }
  },
  actions: {
    async accessWallet(store, pk) {
      const keypair = await store.dispatch('addKey', pk)
      store.state.privateKey = keypair.privateKey
      store.state.blake160 = keypair.blake160
      store.state.selectedAddress = (store.state.networkType === 'testnet') ? (keypair.testnetAddress) : (keypair.mainnetAddress)
      store.state.selectedAddressLockHash = keypair.lockHash
      store.state.isAuth = true
      store.dispatch('onAccess')
    },
    onAccess(store) {
      router.push('/wallet')
      store.dispatch('refreshAddresses')
      store.dispatch('Assets/updateUTXOs')
      store.dispatch('History/updateTransactionHistory')
    },
    async refreshAddresses(store) {
      if (store.state.networkType === 'testnet') {
        store.state.Address.addressList.map(v => {
          store.state.addresses.push(v.testnetAddress)
        })
      } else {
        store.state.addresses = store.state.Address.addressList.map(v => {
          store.state.addresses.push(v.mainnetAddress)
        })
      }
      // await store.dispatch('Assets/updateUTXOs');
    },
    async saveKeys({ state, dispatch }) {
      const addresses = state.Address.addressList
      const rawKeys = []
      addresses.forEach(addr => {
        rawKeys.push(addr.privateKey)
      })
      const saveData = JSON.stringify(rawKeys)
      sessionStorage.setItem('pks', saveData)
      dispatch('Notifications/add', {
        title: 'Keys saved.',
        message: 'Your keys are saved for easy access to your wallet.',
        type: 'success'
      })
    },
    async autoAccess({ state, dispatch }) {
      const sessionKeys = sessionStorage.getItem('pks')
      if (!sessionKeys) return
      try {
        const rawKeys = JSON.parse(sessionKeys)
        await dispatch('accessWalletMultiple', rawKeys)
        state.rememberKey = true
        return true
      } catch (e) {
        console.log(e)
        return false
      }
    },
    async logout(store) {
      // Delete keys
      store.dispatch('removeAllKeys')
      await store.dispatch('Notifications/add', {
        title: 'Logout',
        message: 'You have successfully logged out of your wallet.'
      })

      // Remove other data
      store.state.selectedAddress = ''
      store.state.privateKey = ''
      store.state.isAuth = false
      store.state.rememberKey = false
      store.state.addresses = []
      store.state.selectedAddressLockHash = ''
      store.state.blake160 = ''
      store.state.networkType = ''
      // Clear Assets
      await store.dispatch('Assets/onlogout')

      // Clear session storage
      sessionStorage.removeItem('pks')

      router.push('/')
    },
    async accessWalletMultiple({ state, dispatch, store }, pks) {
      for (var i = 0; i < pks.length; i++) {
        const pk = pks[i]
        const keypair = await dispatch('addKey', pk)
        if (i === 0) {
          state.privateKey = keypair.privateKey
          state.selectedAddress = (state.networkType === 'testnet') ? (keypair.testnetAddress) : (keypair.mainnetAddress)
          state.selectedAddressLockHash = keypair.lockHash
          state.blake160 = keypair.blake160
        }
      }
      state.isAuth = true
      dispatch('onAccess')
    },
    async addKey({ state, dispatch, store }, pk) {
      const keypair = generateAddressFromPK(pk)
      await dispatch('Address/addKey', keypair)
      // state.store.dispatch('Notifications/add', {
      //   title: 'Key Added',
      //   message: 'The private key is added to the keychain.'
      // })
      await dispatch('refreshAddresses')
      if (state.rememberKey) {
        dispatch('saveKeys')
      }
      return keypair
    },
    async exportKeyfile(store, pass) {
      // const salt = await cryptoHelpers.makeSalt()
      // const passHash = await cryptoHelpers.pwhash(pass, salt)

      // // Loop private keys, encrypt them and store in an array
      // const keys = []
      // const addresses = store.state.addresses
      // for (var i = 0; i < addresses.length; i++) {
      //   const addr = addresses[i]
      //   const addBuf = bintools.stringToAddress(addr)
      //   const key = keyChain.getKey(addBuf)

      //   const pk = key.getPrivateKey()

      //   const pk_crypt = await cryptoHelpers.encrypt(pass, pk, salt)

      //   const key_data:KeyFileKey = {
      //     key: bintools.avaSerialize(pk_crypt.ciphertext),
      //     nonce: bintools.avaSerialize(pk_crypt.nonce),
      //     address: addr
      //   }
      //   keys.push(key_data)
      // }

      // const file_data = {
      //   salt: bintools.avaSerialize(salt),
      //   pass_hash: bintools.avaSerialize(passHash.hash),
      //   keys: keys
      // }

      // Download the file

      const text = JSON.stringify('')

      const addr = store.state.selectedAddress.substr(0, 5)
      const filename = `CKB_${addr}`

      var blob = new Blob(
        [text],
        {
          type: 'application/json'
        }
      )
      const url = URL.createObjectURL(blob)
      var element = document.createElement('a')
      element.setAttribute('href', url)
      element.setAttribute('download', filename)
      element.style.display = 'none'
      document.body.appendChild(element)
      element.click()
      document.body.removeChild(element)
    }

  }
})
