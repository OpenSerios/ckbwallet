<template>
  <div class="add_key_file">
    <label>Keystore File</label>
    <file-input class="formIn" @change="onfile" />
    <label>Password</label>
    <v-text-field
      v-model="pass"
      class="formIn"
      placeholder="Password"
      dense
      outlined
      color="#000"
      hide-details
      type="password"
    />
    <p v-if="err" class="err">{{ err }}</p>
    <v-btn
      class="addKeyBut but_primary"
      depressed
      color="#2960CD"
      block
      :disabled="!canSubmit"
      :loading="isLoading"
      @click="importKeyfile"
    >Import Wallet</v-btn>
  </div>
</template>
<script>
import { QrInput } from '@avalabs/vue_components'
import { bintools, keyChain } from '@/AVA'
import FileInput from '@/components/misc/FileInput'

export default {
  components: {
    QrInput,
    FileInput
  },
  data() {
    return {
      pass: '',
      err: null,
      canAdd: false,
      keyfile: null,
      isLoading: false
    }
  },
  computed: {
    canSubmit() {
      const file = this.keyfile
      const pass = this.pass
      if (file && pass) {
        return true
      }
      return false
    }
  },
  methods: {
    onfile(val) {
      console.log(val)
      this.keyfile = val
    },
    qr_change(val) {
      // this.pk = val;
      if (this.pk.length > 10) {
        this.canAdd = true
      } else {
        this.canAdd = false
      }
    },
    importKeyfile() {
      const parent = this
      this.isLoading = true
      this.err = null

      setTimeout(() => {
        parent.$store.dispatch('importKeyfile', {
          password: parent.pass,
          file: parent.keyfile
        }).then(res => {
          parent.isLoading = false
          parent.clear()
          console.log(res)
        }).catch(err => {
          parent.isLoading = false
          this.err = err.message
          parent.$store.dispatch('Notifications/add', {
            type: 'error',
            title: 'Import Failed',
            message: err.message
          })
        })
      }, 500)
    },

    clear() {
      this.pass = ''
    }
  }
}
</script>
<style lang="scss">
    .add_key_file{
        fieldset{
            border: none !important;
        }
    }
</style>
<style scoped lang="scss">
    .addKeyBut{
        color: #fff;
        text-transform: none;
        border-radius: 2px;
    }

    .v-btn{
        margin-top: 6px;
    }

    label{
        font-size: 12px;
        color: #909090;
    }

    .err{
        color: #f00;
        margin: 4px 0px;
        font-size: 12px;
    }

    .formIn{
        border: none;
        height: 40px;
        font-size: 12px;
        /*border-color: #aaa;*/
        background-color: #F5F6FA;
        border-radius: 2px;

    }
</style>
