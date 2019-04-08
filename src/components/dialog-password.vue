<template>
  <div>
    <van-popup v-model="isShow" @closed="handleClosed">
      <div class="input-box">
        <div class="title">{{title}}</div>
        <div class="number-list" @click="lableClick">
          <div class="number">{{numberList[0]}}</div>
          <div class="number">{{numberList[1]}}</div>
          <div class="number">{{numberList[2]}}</div>
          <div class="number">{{numberList[3]}}</div>
        </div>
        <label class="input-label" for="pwd" @click="lableClick">
          <input type="number" class="input" maxlength="4" v-model="value" ref="input" id="pwd">
        </label>
        <Button type="publish" class="sure-btn" @click="handlePublish">确定</Button>
        <div class="close" @click="isShow=false"><img src="../assets/images/icon-close.png" alt=""></div>
      </div>
    </van-popup>
  </div>
</template>
<script>
import Button from '@/components/Button'
export default {
  props: {
    title: {
      type: String,
      default: '设置密码'
    }
  },
  data() {
    return {
      isShow: false,
      value: '',
      numberList: [],
    }
  },
  components: {
    Button
  },
  methods: {
    handlePublish() {
      if (this.numberList.length != 4) {
        return this.$toast('密码长度必须是4位数')
      }
      this.$emit('success', this.value)
    },
    show() {
      this.isShow = true
    },
    hide() {
      this.isShow = false
    },
    handleClosed() {
      this.value = ''
    },
    lableClick() {
      this.$refs.input.focus()
    }
  },
  watch: {
    value(newVal, oldVal) {
      let str = newVal + ''
      this.numberList = str.split('')
      if (str.length > 4) {
        this.$nextTick(_ => {
          this.value = oldVal
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../assets/css/variable';
.input-box{
  width: torem(520);
  height: torem(480);
  border-radius: torem(60);
  background-color: #6f68d8;
  .title{
    font-size: torem(42);
    line-height: torem(162);
    color: #fff;
    text-align: center;
  }
  .input{
    display: block;
    margin: torem(0) torem(65) torem(73);
    width: torem(1);
    height: torem(1);
    text-indent: -999em;
    opacity: 0;
    color: transparent;
    background-color: transparent;
  }
  .input-label{
    height: torem(72);
    width: torem(400);
    display: block;
    margin: torem(0) torem(65) torem(73);
    margin-top: torem(-72);
  }
  .number-list{
    height: torem(72);
    line-height: torem(72);
    text-align: center;
    display: flex;
    justify-content: space-around;
    .number{
      width: torem(80);
      height: 100%;
      border-radius: torem(16);
      background-color: #fff;
    }
  }
  .sure-btn{
    width: torem(240);
    height: torem(78);
    line-height: torem(78);
    margin: 0 auto;
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
.van-popup{
  background-color: transparent !important;
}
</style>


