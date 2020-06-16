<template>
  <div class="tx_history_row">
    <div class="icons">
      <!-- <img v-for="url in icons" :key="url" :src="url"> -->
      <img src="data:image/png;base64,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" alt="item icon">
    </div>
    <div>
      <p class="time">
        {{ timeText }}
        <a :href="explorerUrl" target="_blank"><fa icon="arrow-right" /></a>
      </p>
      <div class="utxos">
        <TxHistoryValue :amount="amount" />
      </div>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import TxHistoryValue from '@/components/SidePanels/TxHistoryValue.vue'
import JSBI from 'jsbi'

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
      const ins = JSBI.BigInt(this.inputTotals)
      const outs = JSBI.BigInt(this.outputTotals)

      const amount = JSBI.subtract(outs, ins)
      //   for (var assetId in ins) {
      //     const inAmount = ins[assetId] || 0

      //     if (res[assetId]) {
      //       res[assetId] -= inAmount
      //     } else {
      //       res[assetId] = -1 * inAmount
      //     }
      //   }

      return String(amount)
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
      var input = JSBI.BigInt(0)
      for (const i in this.transaction.inputs) {
        if (this.transaction.inputs[i].lockArgs === this.blake160) {
          input = JSBI.add(JSBI.BigInt(this.transaction.inputs[i].capacity), input)
        }
      }
      return String(input)
    },
    outputTotals() {
      var output = JSBI.BigInt(0)
      for (const i in this.transaction.outputs) {
        console.log(this.transaction.outputs[i].capacity)
        if (this.transaction.outputs[i].lockArgs === this.blake160) {
          output = JSBI.add(JSBI.BigInt(this.transaction.outputs[i].capacity), output)
        }
      }
      return String(output)
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
            width: 32px;
            height: 32px;
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
                width: 24px;
                height: 24px;
                object-fit: contain;
            }
        }

        .tx_history_row{
            padding: 8px 0px;
            grid-template-columns: 24px 1fr;
        }
        .time{
            font-size: 14px;
            text-align: left;
        }
    }

</style>
