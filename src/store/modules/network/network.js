import { explorer_api } from '@/explorer_api'
import { ckb } from '@/js/ckb'
// import axios from 'axios'
const network_module = {
  namespaced: true,
  state: {
    status: 'disconnected', // disconnected | connecting | connected
    // isConnected: false,
    networks: [],
    selectedNetwork: null
  },
  mutations: {
    addNetwork(state, net) {
      state.networks.push(net)
    }
  },

  // interface Network {
  //   name:string,
  //   url:string,
  //   networkType:string,
  //   explorerUrl:string
  // }

  actions: {
    async setNetwork({ state, dispatch, commit, rootState }, net) {
      state.status = 'connecting'
      ckb.setNode(net.url)
      state.selectedNetwork = net
      explorer_api.defaults.baseURL = net.explorerUrl
      // TODO:Test Node Status

      // If authenticated
      if (rootState.isAuth) {
        //
      }

      state.status = 'connected'

      return true
    },

    async init({ state, commit, dispatch }) {
      const netTest = {
        name: 'Aggron TestNet',
        url: 'http://localhost:8114',
        networkType: 'testnet',
        explorerUrl: 'https://explorer.nervos.org/aggron/'
      }
      const netMain = {
        name: 'Lina MainNet',
        url: 'http://localhost:8114',
        networkType: 'mainnet',
        explorerUrl: 'https://explorer.nervos.org/'
      }

      const netLocal = {
        name: 'Localhost',
        url: 'http://localhost:8114',
        networkType: 'testnet',
        explorerUrl: ''
      }

      commit('addNetwork', netTest)
      commit('addNetwork', netMain)
      commit('addNetwork', netLocal)
      try {
        await dispatch('setNetwork', state.networks[0])
        return true
      } catch (e) {
        console.log(e)
        state.status = 'disconnected'
      }
    }
  },
  getters: {

  }
}

export default network_module
