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
      const blake160 = rootState.blake160

      // TODO: update history collectively for all the addresses
      // TODO: or just the selected key?
      console.log(blake160)
      const res = await explorer_api.post(
        `/cell/getTxHistories`,
        {
          'script': {
            'code_hash': '0x9bd7e06f3ecf4be0f2fcd2188b23f1b9fcc88e5d4b65a8637b17723bbda3cce8',
            'hash_type': 'type',
            'args': blake160
          },
          'scriptType': 'lock'
        }
      )
      // const response = await axios.post('http://localhost:8501', {
      //   jsonrpc: '2.0',
      //   id: + new Date(),
      //   method: 'eth_accounts',
      //   params: {
      //   },
      // }, {
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Access-Control-Allow-Origin': '*'
      //   },
      // })
      const transactions = res.data
      state.transactions = transactions
      state.isUpdating = false
    }
  },
  getters: {

  }

}

export default history_module
