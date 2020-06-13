<template>
  <modal ref="modal" :title="$t('modal.qr.title')">
    <div class="qr_body">
      <canvas ref="qr" />
      <p>{{ address }}</p>
      <copy-text :value="address" class="copyBut" />
    </div>
  </modal>
</template>
<script>
import Modal from './Modal'
import CopyText from '@/components/common/CopyText'
import QRCode from 'qrcode'

export default {
  components: {
    Modal,
    CopyText
  },
  computed: {
    address() {
      return this.$store.state.selectedAddress
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
    open() {
      this.$refs.modal.open()
    },
    updateQR() {
      const canvas = this.$refs.qr
      QRCode.toCanvas(canvas, this.address, {
        scale: 6,
        color: {
          light: '#f2f2f2'
        }
      }, function(error) {
        if (error) console.error(error)
        // console.log('success!');
      })
    }
  }
}
</script>
<style scoped>
    .qr_body{
        padding: 30px;
        text-align: center;
    }

    .qr_body p{
        word-break: break-all;
        text-align: center;
    }
    canvas{
        width: 220px;
        height: 220px;
    }

    .copyBut{
        /*display: block;*/
        /*margin: 0px auto;*/
    }
</style>
