<template>
  <div class="radio_buts">
    <button v-for="val in value" :key="val" :active="selection===val" @click="select(val)">{{ val }}</button>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: Array,
      required: true
    },
    // eslint-disable-next-line vue/prop-name-casing
    default_val: {
      type: [String, Object],
      default: ''
    }
  },
  data() {
    return {
      selection: null
    }
  },
  created() {
    if (this.default_val) {
      this.select(this.default_val)
    }
  },
  methods: {
    select(val) {
      this.selection = val
      this.$emit('change', this.selection)
    }
  }
}
</script>
<style scoped lang="scss">
    .radio_buts{
        display: flex;
        flex-wrap: wrap;
    }
    button{
        word-break: normal;
        white-space: nowrap;
        font-size: 12px;
        padding: 4px 14px;
        border: 1px solid transparent;
        color: #808080;
        background-color: #F5F6FA;
        border-radius: 4px;
        margin-right: 6px;
        margin-bottom: 6px;
        transition-duration: 0.2s;
        font-family: Inconsolata, monospace;

        &:hover{
            border-color: #999;
        }

        &[active]{
            color: #285599;
            overflow: hidden;
            text-overflow: ellipsis;
            border-color: #285599;
            background-color: #e4f0fb;
        }
    }
</style>
