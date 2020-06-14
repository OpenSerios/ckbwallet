
import Vue from 'vue'
// import { ckb } from '@/js/ckb'
// import { explorer_api } from '@/explorer_api'

const assets_module = {
  namespaced: true,
  state: {
    isUpdateBalance: false,
    utxo_set: null,
    cells: [],
    capacity: null,
    descriptions: {},
    assets: [],
    assetsDict: {}
  },
  mutations: {
    addAsset(state, asset) {
      if (state.assetsDict[asset.id]) {
        console.info(`Failed to add asset. Asset already exists. (${asset.id})`)
        return
      }
      state.assets.push(asset)
      Vue.set(state.assetsDict, asset.id, asset)
    },
    removeAllAssets(state) {
      state.assets = []
      state.assetsDict = {}
    }
  },
  actions: {
    // Called on a logout event
    onlogout({ state }) {
      state.isUpdateBalance = false
      state.utxo_set = null
      state.capacity = null
      state.utxos = []
      state.cells = []
      state.descriptions = {}
    },

    // Fetches UTXOs of the addresses registered to the wallet
    async updateUTXOs({ state, commit, dispatch, rootState }) {
      if (!rootState.isAuth) {
        return false
      }
      state.isUpdateBalance = true
      // TODO:Waiting for API
      // 0xfcd7768ed4a3c51c2999d808589fe901474cd336808938088291f8e553776a56
      // ckt1qyqwyhylqyx67rq20w2qt6zr8s5pzzxjf2eqz3s87s
      // const { result } = await ckb.rpc.getCapacityByLockHash('0xfcd7768ed4a3c51c2999d808589fe901474cd336808938088291f8e553776a56')
      console.log(rootState.selectedAddress)
      state.isUpdateBalance = false
      // state.capacity = result.capacity || 0
      state.capacity = 0
      await dispatch('updateCells')
    },

    async updateCells({ state, commit, dispatch, rootState }) {
      // TODO:Waiting for API
      // const { result } = await ckb.rpc.getLiveCellsByLockHash('0xfcd7768ed4a3c51c2999d808589fe901474cd336808938088291f8e553776a56')
      state.cells = []
    }

    // Looks at utxo's and updates balances for each asset
    // async updateBalances({ state, getters, dispatch, rootState }) {
    //   await dispatch('clearBalances')

    //   const utxos = state.utxos

    //   for (var i = 0; i < utxos.length; i++) {
    //     const utxo = utxos[i]
    //     const assetId = bintools.avaSerialize(utxo.getAssetID())
    //     // let amount = utxo.getAmount();
    //     const amountOut = utxo.getOutput()
    //     const amount = amountOut.getAmount()
    //     const dict = state.assetsDict

    //     // console.log(dict);

    //     // Because we populate the assets dictionary from the explorer api, we cannot query any other network including localhost
    //     // and this causes the assetId  to not exist
    //     if (dict[assetId]) {
    //       dict[assetId].addBalance(amount)
    //     } else {
    //       // Add Unknown Asset
    //       await dispatch('addUnknownAsset', assetId)
    //       dict[assetId].addBalance(amount)
    //     }
    //   }
    // },

    // async addUnknownAsset({ state, commit }, assetId) {
    //   // get info about the asset
    //   console.log(`Adding unknown asset ${assetId}..`)
    //   const desc = await ava.AVM().getAssetDescription(assetId)
    //   const newAsset = new AvaAsset(assetId, desc.name, desc.symbol, desc.denomination)

    //   await commit('addAsset', newAsset)
    //   return desc
    // },

    // // Sets every balance to 0
    // async clearBalances({ state }) {
    //   state.assets.forEach(asset => {
    //     asset.resetBalance()
    //   })
    //   return
    // },

    // // What is the AVA coin in the network
    // async updateAvaAsset({ state, commit }) {
    //   const res = await avm.getAssetDescription('AVA')
    //   const id = bintools.avaSerialize(res.assetID)
    //   state.AVA_ASSET_ID = id
    //   const asset = new AvaAsset(id, res.name, res.symbol, res.denomination)
    //   commit('addAsset', asset)
    // },
    // // fetch every asset from the explorer, if explorer exists
    // updateAssets({ state, rootState, commit }) {
    //   // @ts-ignore
    //   const explorerApi = rootState.Network.selectedNetwork.explorerUrl
    //   if (explorerApi) {
    //     explorer_api.get('/x/assets').then(res => {
    //       const assets = res.data.assets
    //       assets.forEach(asset => {
    //         const newAsset = new AvaAsset(asset.id, asset.name, asset.symbol, asset.denomination)
    //         commit('addAsset', newAsset)
    //       })
    //     })
    //   }
    // },

    // // Gets meta data for all the assets in the wallet
    // updateAssetsData({ state, getters }) {
    //   const assetIds = getters.assetIds

    //   for (var i = 0; i < assetIds.length; i++) {
    //     const id_buf = assetIds[i]
    //     const id = bintools.avaSerialize(id_buf)

    //     // See if description already exists
    //     if (state.descriptions[id]) {
    //       console.log('Description Exists')
    //     }
    //     // Fetch Description
    //     else {
    //       avm.getAssetDescription(id_buf).then((res) => {
    //         const name = res.name.trim()
    //         const symbol = res.symbol.trim()
    //         const denomination = res.denomination

    //         Vue.set(state.descriptions, id, {
    //           name: name,
    //           symbol: symbol,
    //           denomination: denomination
    //         })
    //       }).catch(err => {
    //         console.log(err)
    //       })
    //     }
    //   }
    // },

    // getAllUTXOsForAsset(store, assetId) {
    //   const set = new UTXOSet()
    //   const utxos = store.state.utxos
    //   for (var i in utxos) {
    //     const utxo = utxos[i]
    //     const aId = bintools.avaSerialize(utxo.getAssetID())
    //     if (aId === assetId) {
    //       set.add(utxo)
    //     }
    //   }
    //   return set
    // }
  },
  getters: {
    Balance(state, getters) {
      const balance = state.capacity
      return balance
    }
    // assetIds(state) {
    //   const utxo_set = state.utxo_set
    //   if (!utxo_set) return []
    //   return utxo_set.getAssetIDs()
    // },

    // addressUTXOs(state) {
    //   if (!state.utxo_set) return {}

    //   const res = {}
    //   const utxos = state.utxos

    //   for (var i = 0; i < utxos.length; i++) {
    //     const utxo = utxos[i]
    //     const utxoOut = utxo.getOutput()

    //     const addrs = utxoOut.getAddresses()

    //     const amount = utxoOut.getAmount()
    //     const assetIdBuff = utxo.getAssetID()
    //     const assetId = bintools.avaSerialize(assetIdBuff)

    //     for (var n = 0; n < addrs.length; n++) {
    //       const addr = addrs[n]
    //       const addrString = bintools.avaSerialize(addr)
    //       // console.log(addrString)

    //       if (!res[addrString]) {
    //         res[addrString] = [utxo]
    //       } else {
    //         res[addrString].push(utxo)
    //       }
    //     }
    //   }

    //   return res
    // },

    // //  Assets in array form and ordered alphabetically
    // assetsArray(state, getters) {
    //   const dict = getters.assetsDict

    //   const res:AvaAsset[] = []
    //   for (var i in dict) {
    //     const asset = dict[i]
    //     res.push(asset)
    //   }

    //   res.sort(function(a, b) {
    //     const symbolA = a.symbol.toUpperCase()
    //     const symbolB = b.symbol.toUpperCase()

    //     if (symbolA < symbolB) {
    //       return -1
    //     }
    //     if (symbolA > symbolB) {
    //       return 1
    //     }

    //     return 0
    //   })

    //   return res
    // }
  }

}

export default assets_module
