import Vue from 'vue'
import Vuex from 'vuex'
import Notifications from './modules/notifications/notification'
Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    // Assets,
    Notifications
    // Network,
    // History,
    // Address
  },
  state: {
    isAuth: false,
    rememberKey: false, // if true the keytore will remember keys during browser session
    privateKey: '',
    addresses: [],
    selectedAddress: '',
    modals: {}
  },
  getters: {
    appReady(state, getters) {
      // let avaAsset = getters[''];
      //
      // if(!avaAsset) return false;
      return true
    }
  }
})
