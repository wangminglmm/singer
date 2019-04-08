<template>
  <van-popup v-model="isShow" @closed="handleClosed">
    <div class="avatar-detail">
      <img :src="imgUrl" alt="" class="img">
      <p class="nick-name">{{nickName}}</p>
      <div class="operate">
        <div class="operate-item">
          <img src="../assets/images/icon-gift.png" class="btn-img" alt="">
          <div class="btn-name">送礼物</div>
        </div>
        <div class="operate-item" @click="handleToPersonal">
          <img src="../assets/images/icon-home.png" class="btn-img" alt="">
          <div class="btn-name">去TA主页</div>
        </div>
        <div class="operate-item">
          <img src="../assets/images/icon-disabled.png" class="btn-img" alt="">
          <div class="btn-name">禁止参加</div>
        </div>
      </div>
      <div class="close" @click="isShow=false"><img src="../assets/images/icon-close.png" alt=""></div>
    </div>
  </van-popup>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    imgUrl: String,
    uid: String,
    nickName: String
  },
  data() {
    return {
      isShow: false,
    }
  },
  computed: {
    ...mapGetters({
      'userInfo': 'userInfo'
    })
  },
  methods: {
    handleClosed() {},
    show(){
      this.isShow = true
    },
    handleToPersonal() {
      window.to_personal(this.userInfo.p, this.uid)
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../assets/css/variable.scss';
.avatar-detail{
  width: torem(600);
  height: torem(480);
  border-radius: torem(60);
  background-color: #6f68d8;
  position: relative;
  border: 1px solid transparent;
  .img{
    width: torem(180);
    height: torem(180);
    border-radius: 50%;
    border: torem(8) solid #6f68d8;
    display: block;
    margin: torem(-50) auto 0;
  }
  .nick-name{
    text-align: center;
    font-size: torme(42);
    color: #fff;
    margin: torem(35) 0 torem(50);
  }
  .operate{
    display: flex;
    align-items: center;
    justify-content: space-around;
    .operate-item{
      text-align: center;
      .btn-img{
        width: torem(72);
      }
      .btn-name{
        font-size: torem(30);
        color: #b7b4ec;
        margin-top: torem(30);
      }
    }
  }
  .close{
    position: absolute;
    width: torem(54);
    height: torem(54);
    left: 50%;
    bottom: torem(-100);
    margin-left: torem(-27);
  }
}
</style>



