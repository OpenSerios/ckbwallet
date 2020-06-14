<template>
  <div class="addr_card">
    <q-r-modal ref="qr_modal" />
    <!-- <paper-wallet ref="print_modal" /> -->

    <p class="addr_info">This is your address to receive funds.</p>
    <div class="bottom">
      <canvas ref="qr" />
      <div class="bottom_rest">
        <p class="addr_text">{{ address }}</p>
        <p class="sub">Default wallet address</p>
        <div class="buts">
          <button :tooltip="$t('top.hover1')" class="qr_but" @click="viewQRModal" />
          <!-- <button :tooltip="$t('top.hover2')" class="print_but" @click="viewPrintModal" /> -->
          <CopyText :tooltip="$t('top.hover3')" :value="address" class="copy_but" />
        </div>
      </div>

    </div>

  </div>
</template>
<script>
import CopyText from './CopyText'
import QRModal from '@/components/modals/QRModal'
// import PaperWallet from '@/components/modals/PaperWallet'
import QRCode from 'qrcode'

export default {
  components: {
    CopyText,
    // PaperWallet,
    QRModal
  },
  computed: {
    ava_asset() {
      return this.$store.getters['Assets/AssetAVA']
    },
    address() {
      return this.$store.state.selectedAddress
    },
    isUpdateBalance() {
      return this.$store.state.Assets.isUpdateBalance
    }
  },
  watch: {
    address(val) {
      if (val) {
        this.updateQR()
      }
    }
  },
  mounted() {
    this.updateQR()
  },
  methods: {
    viewQRModal() {
      this.$refs.qr_modal.open()
    },
    viewPrintModal() {
      // this.$refs.print_modal.open()
    },

    updateQR() {
      const canvas = this.$refs.qr
      const size = canvas.clientWidth
      QRCode.toCanvas(canvas, this.address, {

        scale: 6,
        color: {
          light: '#fff'
        },
        width: size,
        height: size
      }, function(error) {
        if (error) console.error(error)
        // console.log('success!');
      })
    }
  }
}
</script>
<style scoped lang="scss">
    .addr_card{
        display: flex;
        flex-direction: column;
    }
    .buts{
        width: 100%;
        text-align: right;
        display: flex;
        align-items: center;
        justify-content: flex-end;

        > *{
            font-size: 18px;
            margin: 0px 18px;
            margin-right: 0px;
            position: relative;
            outline: none;
            width: 18px;
            height: 18px;
            opacity: 0.6;

            &:hover{
                opacity: 1;
            }
        }
    }

    .buts button{
        width: 18px;
        height: 18px;
        background-size: contain;
        background-position: center;
    }

    .qr_but{
        background-image: url("/img/qr_icon.png");
    }
    .print_but{
        background-image: url("/img/faucet_icon.png");
    }
    .copy_but{
    }

    .buts > *[tooltip]:hover:before{
        border-radius: 4px;
        /*left: 0;*/
        left: 0;
        transform: translateX(-50%);
        content: attr(tooltip);
        position: absolute;
        background-color: #303030;
        bottom: 100%;
        color: #ddd;
        width: max-content;
        max-width: 100px;
        font-size: 14px;
        padding: 4px 8px;
    }

    .addr_info{
        background-color: #F5F6FA;
        font-size: 13px;
        font-weight: bold;
        text-align: center;
        padding: 12px 16px;
    }

    $qr_width: 110px;

    .bottom{
        /*margin-top: 15px;*/
        /*padding: 4px 8px;*/
        /*padding-bottom: 0;*/
        display: grid;
        grid-template-columns: $qr_width 1fr;
        column-gap: 6px;

        canvas{
            width: $qr_width;
            height: $qr_width;
            background-color: transparent;
        }

        .bottom_rest{
            padding-top: 14px;
            display: flex;
            flex-direction: column;
        }

        .sub{
            color: #909090;
            font-size: 13px;
            flex-grow: 1;
        }
    }

    .addr_text{
        font-size: 16px;
        word-break: break-all;
    }
</style>
