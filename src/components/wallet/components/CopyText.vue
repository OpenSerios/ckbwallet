<template>
  <div class="copyBut">
    <button @click="copy" />
    <input ref="copytext" :value="value">
  </div>
</template>
<script>
export default {
  props: {
    // eslint-disable-next-line vue/require-default-prop
    value: String
  },
  methods: {
    copy() {
      const copytext = this.$refs.copytext
      copytext.select()
      copytext.setSelectionRange(0, 99999)

      document.execCommand('copy')
      this.$store.dispatch('Notifications/add', {
        title: ' Copied',
        message: 'Copied to clipoard.'
      })
    }
  }
}
</script>
<style scoped>
    .copyBut{
        /*display: flex;*/
        /*align-self: center;*/
        /*justify-content: center;*/
    }
    .copyBut input{
        width: 1px;
        position: absolute;
        opacity: 0;
    }

    button{
        /*width: 18px;*/
        /*height: 18px;*/
        width: 100%;
        height: 100%;
        background-size: contain;
        background-position: center;
        background-image: url("/img/copy_icon.png");
    }
</style>
