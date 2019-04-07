<template>
  <div class="btn-play" @click="handleClick" :style="{color: color}">
    <van-icon name="play-circle-o" class="img" />
    <span class="text">{{text}}</span>
  </div>
</template>
<script>
export default {
  props: {
    text: {
      type: String,
      default: '试听'
    },
    color: String
  },
  methods: {
    handleClick() {
      this.$emit('click')
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../assets/css/variable';
.btn-play{
  display: inline-flex;
  align-items: center;
  color: #ffec49;
  .img{
    font-size: torem(52);
    vertical-align: middle;
  }
  .text{
    font-size: torem(30);
    margin-left: torem(8);
    margin-top: torem(-3);
  }
}
</style>


