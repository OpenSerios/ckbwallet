import { explorer_api } from '@/explorer_api'

const history_module = {
  namespaced: true,
  state: {
    isUpdating: false,
    transactions: []
  },
  mutations: {

  },
  actions: {
    async updateTransactionHistory({ state, rootState }) {
      // @ts-ignore
      const network = rootState.Network.selectedNetwork

      // can't update if there is no explorer
      if (!network.explorerUrl) {
        return false
      }

      state.isUpdating = true
      console.log('Updating history...')

      const addr = rootState.selectedAddressLockHash

      const page = 1
      const page_size = 20

      // TODO: update history collectively for all the addresses
      // TODO: or just the selected key?

      const url = (network.networkType === 'testnet')
        ? (`/testnet/api/vi/address_transactions/${addr}?page=${page}&page_size=${page_size}`)
        : (`/api/vi/address_transactions/${addr}?page=${page}&page_size=${page_size}`)

      const res = await explorer_api.get(url)

      const transactions = res.data

      state.transactions = transactions
      state.isUpdating = false
    }
  },
  getters: {

  }

}

export default history_module
