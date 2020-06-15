<template>
  <div class="utxo" :income="isIncome">
    <p class="action">{{ actionText }}</p>
    <p class="amount">{{ amountText }} {{ symbolText }}</p>
  </div>
</template>
<script>
import Big from 'big.js'

export default {
  props: {
    amount: {
      type: String,
      default: ''
    },
    assetId: {
      type: Number || String,
      default: 0
    }
  },
  computed: {
    // asset() {
    //   return this.$store.state.Assets.assetsDict[this.assetId]
    // },
    isIncome() {
      if (this.amount > 0) {
        return true
      }
      return false
    },
    actionText() {
      if (this.isIncome) {
        return 'Received'
      }
      return 'Sent'
    },
    amountText() {
    //   const asset = this.asset

      //   if (!asset) return this.amount.toString()

      const val = Big(this.amount).div(Math.pow(10, 8))
      return val.toFixed(2)
    },
    symbolText() {
    //   const asset = this.asset

      //   if (!asset) return this.assetId.substring(0, 4)
      return 'CKB'
    }
  }

}
</script>
<style scoped lang="scss">
    @use '../../main';

    .utxo{
        display: grid;
        grid-template-columns: max-content 1fr;
        column-gap: 10px;

        &[income]{
            color: #5ECB08;
        }

        > *{
            align-self: center;
        }
    }

    .action{
        font-size: 12px;
        color: #909090;
    }
    .amount{
        text-align: right;
        white-space: nowrap;
    }

    .name{

    }

    @include main.medium-device {
        .utxo{
            /*grid-template-columns: none;*/
            /*text-align: right;*/
        }
        .amount{
            font-size: 14px;
        }
    }
</style>
