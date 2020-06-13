<template>
  <div class="card">
    <h1>Keystore File</h1>
    <file-input class="file_in" @change="onfile" />
    <form @submit.prevent="access">
      <v-text-field v-if="file" v-model="pass" label="Password" outlined dense color="#000" type="password" hide-details />
      <p class="err">{{ error }}</p>
      <remember-key v-if="file" v-model="rememberKey" />
      <v-btn v-if="file" class="but_primary" color="#000" :loading="isLoading" :disabled="!canSubmit" depressed @click="access">Access Wallet</v-btn>
    </form>
    <router-link to="/access">Cancel</router-link>
  </div>
</template>
<script>
import FileInput from '@/components/common/FileInput'
import RememberKey from '@/components/common/RememberKey'

export default {
  components: {
    RememberKey,
    FileInput
  },
  data() {
    return {
      pass: '',
      file: null,
      rememberKey: false,
      isLoading: false,
      error: ''
    }
  },
  computed: {
    canSubmit() {
      if (this.file && this.pass) {
        return true
      }
      return false
    }
  },
  methods: {
    onfile(val) {
      console.log(val)
      this.file = val
    },
    access() {
      if (!this.canSubmit || this.isLoading) return

      const parent = this
      this.error = ''
      this.isLoading = true
      const data = {
        password: this.pass,
        file: this.file
      }

      // Set the key remembering state
      this.$store.state.rememberKey = this.rememberKey

      setTimeout(function() {
        parent.$store.dispatch('importKeyfile', data).then((res) => {
          parent.isLoading = false
        }).catch((err) => {
          parent.isLoading = false
          parent.error = err.message
        })
      }, 200)
    }
  }
}
</script>
<style scoped lang="scss">
    @use '../../main';

    .card{
        width: 420px;
        max-width: 80vw;
    }
    .file_in{
        margin-top: 30px;
        margin-bottom: 10px;
        /*width: 380px;*/
        width: 100%;
        font-size: 13px;
        background-color: transparent;
    }

    a{
        color: #1D82BB !important;
    }

    .but_primary{
        margin: 0px auto;
        display: block;
        margin-bottom: 15px;
        /*color: #fff;*/
        /*text-transform: none;*/
    }

    .err{
        font-size: 13px;
        color: #f00;
        margin: 14px 0px !important;
    }

    @media only screen and (max-width: main.$mobile_width) {
        .but_primary{
            width: 100%;
        }
    }
</style>
