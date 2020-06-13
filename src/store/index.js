import Vue from 'vue'
import Vuex from 'vuex'
import Notifications from './modules/notifications/notification'
import Address from './modules/address/address'
import Network from './modules/network/network'
import router from '@/router/router'
Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    // Assets,
    Notifications,
    Network,
    Address
    // History,
    // Address
  },
  state: {
    isAuth: false,
    rememberKey: false, // if true the keytore will remember keys during browser session
    privateKey: '',
    addresses: [],
    selectedAddress: '',
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
    async accessWallet(store, keypair) {
      await store.dispatch('Address/addKey', keypair)
      store.state.privateKey = keypair.privateKey
      store.state.selectedAddress = (store.state.networkType === 'testnet') ? (keypair.testnetAddress) : (keypair.mainnetAddress)
      store.state.isAuth = true
      store.dispatch('onAccess')
    },
    onAccess(store) {
      router.push('/wallet')
      store.dispatch('refreshAddresses')
      // store.dispatch('Assets/updateUTXOs')
      // store.dispatch('History/updateTransactionHistory')
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
    }
  }
})
