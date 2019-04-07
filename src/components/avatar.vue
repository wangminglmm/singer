<template>
  <div class="avatar" :class="[`avatar-${type}`]">
    <img :src="imgUrl" alt="" class="img">
    <span class="seller" v-if="type=='seller'">赏主</span>
    <span class="buyer" v-if="type=='buyer'">领唱人</span>
  </div>
</template>
<script>
export default {
  props: {
    imgUrl: String,
    type: String
  }
}
</script>
<style lang="scss" scoped>
@import '../assets/css/variable.scss';
.avatar{
  position: relative;
  width: torem(136);
  height: torem(136);
  &.avatar-seller{
    width: torem(150);
    height: torem(150);
  }
  .img{
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
  .seller,.buyer{
    position: absolute;
    height: torem(42);
    line-height: torem(42);
    text-align: center;
    padding: 0 torem(5);
    min-width: torem(80);
    left: 50%;
    transform: translateX(-50%);
    bottom: torem(-22);
    white-space: nowrap;
    background-color: rgb(255, 236, 73);
    color: #4f47c0;
    font-size: torem(26);
    border-radius: torem(42);
  }
  .buyer{
    color: #fff;
    background-color: #ff714a;
  }
}
</style>

.圆角矩形_8 {
  background-color: rgb(255, 236, 73);
  position: absolute;
  left: 545px;
  top: 1370px;
  width: 80px;
  height: 42px;
  z-index: 58;
}

