<template>
  <div class="access_view">
    <div class="card">
      <transition name="fade" mode="out-in">
        <div v-if="!newPrivateKey">
          <h1>Create Wallet</h1>
          <p>Generate a new private key to use with your wallet.</p>
          <button class="generate" @click="createKey">Generate Private Key</button>
          <router-link to="/access">Already have a wallet?</router-link>
        </div>
        <div v-else>
          <h1>Your wallet is ready.</h1>
          <p>Do not lose your private key! There is no way to recover lost keys.</p>
          <text-display-copy :value="newPrivateKey" class="key_disp" />
          <remember-key v-model="rememberKey" />
          <button class="generate" @click="access">Access Wallet</button>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import TextDisplayCopy from '@/components/common/TextDisplayCopy'
import RememberKey from '@/components/common/RememberKey'
import { generateAddress } from '@/js/utils.js'

export default {
  components: {
    RememberKey,
    TextDisplayCopy
  },
  data() {
    return {
      rememberKey: false,
      newPrivateKey: null,
      newPublicKey: null,
      newAddr: null,
      keypair: null
    }
  },
  methods: {
    createKey() {
      this.keypair = generateAddress()
      this.newPrivateKey = this.keypair.privateKey
    },

    access() {
      this.$store.state.rememberKey = this.rememberKey
      this.$store.dispatch('accessWallet', this.keypair.privateKey)
    }
  }
}
</script>
<style scoped lang="scss">
    .access_view{
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .card{
        text-align: center;
    }

    .generate{
        display: block;
        margin: 30px auto;
        background-color: #000;
        padding: 8px 18px;
        border-radius: 6px;
        color: #fff !important;
    }

    .key_disp{
        margin: 30px auto;
        font-size: 12px;
    }

    a{
        color: #1D82BB !important;
    }
</style>
