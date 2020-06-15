<template>
  <div class="tx_history_row">
    <div class="icons">
      <!-- <img v-for="url in icons" :key="url" :src="url"> -->
    </div>
    <div>
      <p class="time">
        {{ timeText }}
        <a :href="explorerUrl" target="_blank"><fa icon="arrow-right" /></a>
      </p>
      <div class="utxos">
        <TxHistoryValue :amount="amount" />
        <p class="warn">This list might be incomplete and out of order.</p>
      </div>
    </div>
  </div>
</template>
<script>
import Big from 'big.js'
import moment from 'moment'
import TxHistoryValue from '@/components/SidePanels/TxHistoryValue.vue'
// import BN from 'bn.js'

export default {
  components: {
    TxHistoryValue
  },
  props: {
    transaction: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {

    }
  },
  computed: {
    explorerUrl() {
      return `https://explorer.nervos.org/aggron/transaction/${this.transaction.hash}`
    },
    assetsDict() {
      return this.$store.state.Assets.assetsDict
    },
    time() {
      return moment(this.transaction.timestamp)
    },
    blake160() {
      return this.$store.state.blake160
    },
    timeText() {
      const now = Date.now()
      const diff = now - new Date(this.transaction.timestamp).getTime()

      const dayMs = 1000 * 60 * 60 * 24

      if (diff > dayMs) {
        return this.time.format('MMM DD, YYYY')
      }
      return this.time.fromNow()
    },
    amount() {
      const ins = new Big(this.inValues)
      const outs = new Big(this.outValues)

      const amount = outs - ins
      console.log(amount.toString())
      //   for (var assetId in ins) {
      //     const inAmount = ins[assetId] || 0

      //     if (res[assetId]) {
      //       res[assetId] -= inAmount
      //     } else {
      //       res[assetId] = -1 * inAmount
      //     }
      //   }

      return amount.toString
    },
    // assetsList() {
    //   const myAddr = this.$store.state.selectedAddress
    //   const inAssets = this.inAssets
    //   const outAssets = this.outAssets

    //   const inVals = this.inValues
    //   const outVals = this.outValues

    //   const res = {}

    //   // Checking for income
    //   for (var id in outVals) {
    //     const outVal = outVals[id]
    //     const inVal = inVals[id]
    //     const inAsset = inAssets[id]

    //     let amount = 0

    //     if (inVal) {
    //       const diff = inVal - outVal
    //       amount = diff

    //       // Get froms

    //       console.log(diff, inAsset.addresses)
    //     } else {
    //       // Asset Genesis
    //       amount = outVal
    //     }
    //   }

    //   // Checking for loss
    //   for (id in inVals) {
    //     const outVal = outVals[id]
    //     const inVal = inVals[id]
    //     const inAsset = inAssets[id]

    //     let amount = 0

    //     if (inVal) {
    //       const diff = inVal - outVal
    //       amount = diff

    //       // Get froms

    //       console.log(diff, inAsset.addresses)
    //     } else {
    //       // Asset Genesis
    //       amount = outVal
    //     }
    //   }

    //   return res
    // },
    inputTotals() {
      var input = 0
      for (const i in this.transaction.inputs) {
        if (this.transaction.inputs[i].lockArgs === this.blake160) {
          input = this.transaction.inputs[i].capacity + input
        }
      }
      return input
    },
    outputTotals() {
      var output = Big(0)
      for (const i in this.transaction.outputs) {
        if (this.transaction.inputs[i].lockArgs === this.blake160) {
          output = output.add(Big(this.transaction.inputs[i].capacity))
        }
      }
      const value = output.toString()
      return value
    }
  }

}

</script>
<style scoped lang="scss">
    @use '../../main';

    $income_color: #5ECB08;
    $outcome_color: #000;

    .icons{
        justify-self: center;
        img{
            width: 20px;
            height: 20px;
            object-fit: contain;
        }
    }

    .tx_history_row{
        padding: 14px 0px;
        /*padding-right: 0;*/
        display: grid;
        grid-template-columns: 40px 1fr;
        border-bottom: 1px solid #EAEDF4;

        > div{
            align-self: center;
            overflow: auto;
        }
    }

    .time{
        font-size: 16px;

        a{
            float: right;
            opacity: 0.4;
            font-size: 12px;

            &:hover{
                opacity: 0.8;
            }
        }
    }

    .from{
        font-size: 12px;
        color: #909090;
        word-break: keep-all;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    @include main.medium-device {
        .icons{
            justify-self: left;
            img{
                width: 14px;
                height: 14px;
                object-fit: contain;
            }
        }

        .tx_history_row{
            padding: 8px 0px;
            grid-template-columns: 24px 1fr;
        }
        .time{
            font-size: 14px;
            text-align: right;
        }
    }

</style>
