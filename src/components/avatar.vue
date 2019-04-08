<template>
  <div class="avatar" :class="[`avatar-${type}`]">
    <img :src="imgUrl" alt="" class="img" @click="showDialogAvatar">
    <span class="seller" v-if="type=='seller'">赏主</span>
    <span class="buyer" v-if="type=='buyer'">领唱人</span>
    <dialog-avatar
      :imgUrl="imgUrl"
      :uid="uid"
      ref="dialogAvatar"></dialog-avatar>
  </div>
</template>
<script>
import DialogAvatar from './dialog-avatar'
export default {
  props: {
    imgUrl: String,
    type: String,
    uid: String,
    nickName: String
  },
  components: {
    DialogAvatar
  },
  methods: {
    showDialogAvatar() {
      this.$refs.dialogAvatar.show()
    }
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

