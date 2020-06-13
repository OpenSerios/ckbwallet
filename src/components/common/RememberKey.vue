<template>
  <div>
    <v-checkbox
      v-model="isRemember"
      :label="explain"
      @change="change"
    />
    <!-- <p class="explain">Wallet will remember your private keys until you logout or close the browser window.</p> -->
  </div>
</template>
<script>
export default {
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: Boolean
  },
  data() {
    return {
      explain: 'Remember private keys in this browser.',
      isRemember: false
    }
  },
  methods: {
    change() {
      this.$emit('change', this.isRemember)
    }
  }
}
</script>
<style scoped lang="scss">
    p{
        padding-left: 34px;
        text-align: left;
    }
</style>
