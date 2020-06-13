<template>
  <div class="card">
    <h1>Private Key</h1>
    <form @submit.prevent="access">
      <qr-input v-model="privateKey" class="key_in" />
      <p v-if="error" class="err">{{ error }}</p>
      <remember-key v-model="rememberKey" class="remember" />
      <v-btn class="but_primary" color="#000" depressed @click="access">Access Wallet</v-btn>
    </form>

    <router-link to="/access">Cancel</router-link>
  </div>
</template>
<script>
import QrInput from '@/components/common/QrInput'
import RememberKey from '@/components/common/RememberKey'

export default {
  components: {
    QrInput,
    RememberKey
  },
  data() {
    return {
      isLoading: false,
      privateKey: '',
      rememberKey: false,
      error: false
    }
  },
  methods: {
    async access() {
      const parent = this
      this.isLoading = true
      this.$store.state.rememberKey = this.rememberKey

      console.log(this.rememberKey)

      try {
        await this.$store.dispatch('accessWallet', this.privateKey)
        parent.isLoading = false
      } catch (e) {
        this.error = 'Invalid Private Key'
        this.isLoading = false
      }
    }
  }
}
</script>
<style scoped lang="scss">
    @use '../../main';

    .card{
        width: 320px;
    }

    .remember{
        margin: 20px 0px;
    }

    .key_in{
        margin: 30px auto;
        margin-bottom: 6px;
        width: 100%;
        font-size: 13px;
        background-color: transparent;
        border: 1px solid #aaa;
        border-radius: 4px;
    }

    a{
        color: #1D82BB !important;
    }

    .but_primary{
        margin: 0px auto;
        display: block;
        margin-bottom: 15px;
        width: 100%;
    }

    .err{
        font-size: 13px;
        color: #f00;
        text-align: left;
        margin: 14px 0px !important;
    }

    @media only screen and (max-width: main.$mobile_width) {
        .card{
            overflow: auto;
            width: 100%;
        }

        .key_in{
            width: 100%;
            margin-bottom: 6px;
        }
        .but_primary{
        }
    }
</style>
