<template>
  <div class="export_wallet">
    <p class="explain">{{ $t('advanced.export.desc') }} </p>
    <form @submit.prevent="download">
      <label>Password</label>
      <v-text-field
        v-model="pass"
        type="password"
        class="formIn"
        hint="Minimum 9 characters."
        placeholder="Password"
        persistent-hint
        outlined
        dense
        color="#000"
        height="40"
      />
      <label>Confirm Password</label>
      <v-text-field
        v-model="passConfirm"
        type="password"
        class="formIn"
        hide-details
        outlined
        dense
        color="#000"
        height="40"
        placeholder="Confirm Password"
      />
      <v-btn
        depressed
        :disabled="!isValid"
        color="#2960CD"
        block
        type="submit"
        :loading="is_loading"
        class="but_primary"
      >Export Wallet</v-btn>
    </form>

  </div>
</template>
<script>
export default {
  data() {
    return {
      is_loading: false,
      pass: '',
      passConfirm: ''
    }
  },
  computed: {
    isValid() {
      if (this.pass.length >= 9 && this.pass === this.passConfirm) return true
      return false
    }
  },
  methods: {
    async download() {
      const parent = this
      this.is_loading = true

      setTimeout(function() {
        parent.$store.dispatch('exportKeyfile', parent.pass).then((res) => {
          parent.is_loading = false
          parent.pass = ''
          parent.$store.dispatch('Notifications/add', {
            title: 'Key File Export',
            message: 'Your keys are downloaded.'
          })
        })
      }, 200)
    }
  }
}
</script>
<style lang="scss">
    .export_wallet{
        .formIn{
            .v-input__slot {
                background-color: #F5F6FA;
                border: none !important;
            }

            .v-text-field__details{
                padding: 0;
            }

            fieldset{
                border: none;
            }
        }
    }
</style>
<style scoped lang="scss">
    .export_wallet{
        font-size: 12px;
    }
    .explain{
        /*font-size: 12px;*/
        color: #909090;
        margin-bottom: 20px !important;
    }

    .v-text-field{
        /*margin-bottom: 8px;*/
        .v-input__slot {
            .v-input__slot {
                /*background-color: #f8f8f8;*/
            }
        }
    }

    label{
        color: #909090;
    }

    .formIn{
        /*background-color: #f8f8f8;*/
        font-size: 12px;
        border-radius: 2px;
        /*margin-bottom: 6px;*/
    }

    .but_primary{
        margin-top: 10px;
        color: #fff;
        text-transform: none;
        border-radius: 2px;
    }
</style>
