const address_module = {
  namespaced: true,
  state: {
    addressList: []
  },
  mutations: {
    addAddress(state, keypair) {
      state.addressList.push(keypair)
    }
  },
  actions: {
    addKey({ commit }, keypair) {
      commit('addAddress', keypair)
    }
  },
  getters: {
    getAddressList(rootState) {
      return rootState
    }
  }
}

export default address_module
