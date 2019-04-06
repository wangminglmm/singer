<template>
  <div class="radio" :class="{active: active}" @click="handleClick">
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: {
    name: [String, Number]
  },
  data() {
    return {}
  },
  computed: {
    active() {
      if (this.$parent) {
        return this.$parent.value === this.name
      }
    }
  },
  methods: {
    handleClick() {
      if (this.$parent) {
        this.$parent.handleChange(this.name)
      }
      this.$emit('click')
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../assets/css/variable';
.radio{
  height: torem(68);
  line-height: torem(64);
  text-align: center;
  font-size: torem(36);
  color: #fff;
  border-radius: torem(100);
  box-sizing: border-box;
  min-width: torem(120);
  padding: 0 torem(20);
  position: relative;
  border: 1px solid #cdcbf0;
  &.active{
    border-color: #c2beff;
    background-color: #c2beff;
    color: #4f47c0;
  }
}
</style>


