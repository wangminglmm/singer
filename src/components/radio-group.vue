<template>
  <div class="radio-group">
    <slot @click.native="handleClick"></slot>
  </div>
</template>
<script>
export default {
  props: {
    value: [String, Number]
  },
  data() {
    return {

    }
  },
  created() {
    console.log(this.value)
  },
  methods: {
    handleClick(e) {
      console.log(e)
    },
    handleChange(value) {
      this.$emit('input', value)
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../assets/css/variable';
.radio-group{
  display: flex;
  flex-wrap: wrap;
  margin-right: torem(-25);
  overflow: hidden;
  margin-bottom: torem(-20);
  &>.radio{
    margin-right: torem(25);
    margin-bottom: torem(20);
  }
}
</style>


