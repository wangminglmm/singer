<template>
  <div class="item">
    <div class="top">
      <div class="left">
        <div
          class="desc ellipsis"
          v-for="(item,index) in taskInfo.lyricList"
          :key="index">{{item}}</div>
        <div class="song">《{{taskInfo.songName}}》 {{taskInfo.songAuthor}}</div>
      </div>
      <div class="right">
        <Avatar :imgUrl="taskInfo.seller.avatarUrl" type="seller"/>
        <div class="seller-info">
          <div class="seller-name">{{taskInfo.seller.nickName}}</div>
          <div class="seller-grade">{{taskInfo.grade}}</div>
        </div>
      </div>
    </div>
    <div class="bottom" v-if="taskInfo.leader">
      <Avatar :imgUrl="taskInfo.leader.avatarUrl" type="buyer"/>
      <div class="buyer-info">
        <div class="buyer-name">{{taskInfo.leader.nickName}}</div>
        <div class="play-btn" @click="handlePlayMusic(taskInfo)"><img src="../assets/images/icon-play.png" alt="" class="icon-play">点击播放</div>
      </div>
    </div>
    <div class="btn-join"
      :class="{disabled: disabled}"
      @click="handleJoin">
        <img src="../assets/images/icon-lock.png" class="icon-lock" alt=""
        v-if="taskInfo.needsPassword && !disabled">{{buttonText}}
    </div>
    <div class="status">
      <span class="time">剩余时间：{{taskInfo.remainTime | formatSeconds}}</span>
      <span class="jinbi">剩余金币：{{taskInfo.remainGold}}</span>
    </div>
    <dialog-password
        ref="dialogPassword"
        @success="handlePasswordSuccess">
    </dialog-password>
  </div>
</template>
<script>
import Avatar from './avatar'
import {mapGetters} from 'vuex'
import dialogPassword from '@/components/dialog-password'
export default {
  props: {
    taskInfo: Object
  },
  data() {
    return {
    }
  },
  created() {
    console.log(this.userInfo)
  },
  computed: {
    ...mapGetters(['userInfo']),
    buttonText() {
      let info = this.taskInfo
      if (info.remainTime <= 0) {
        return '已结束'
      }
      if (info.allowSex != 2 && info.allowSex != this.userInfo.sex) {
        return `性别不符(限${info.allowSex == 0 ? '女' : '男'}性)`
      }
      return '参加'
    },
    disabled() {
      return this.buttonText !== '参加'
    }
  },
  components: {
    Avatar,
    dialogPassword
  },
  methods: {
    handleJoin() {
      if (this.disabled) {
        return this.$toast('条件不符合，请换一个试试吧！')
      }
      if (this.taskInfo.needsPassword) {
        this.$refs.dialogPassword.show()
      } else {
        this.toJoin()
      }
    },
    handlePlayMusic(taskInfo) {
      // todo 这里调用原生播放音乐
      alert('这里调用原生播放音乐')
    },
    handlePasswordSuccess(password) {
      // todo 接口验证密码是否正确
      let taskId = this.taskInfo.taskId
      if (password == 1234) {
        this.$refs.dialogPassword.hide()
        this.toJoin()
      } else {
        this.$toast('密码错误，测试密码1234')
      }
    },
    toJoin() {
      this.$router.push({
        path: '/join',
        query: {
          taskInfo: JSON.stringify(this.taskInfo)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../assets/css/variable';
.item{
  position: relative;
  padding: torem(50) torem(30) torem(120);
  background-color: rgb(111, 104, 216);
  border-radius: torem(60) torem(20) torem(60) torem(20);
  .top{
    height: torem(200);
    display: flex;
    align-items: center;
    padding-bottom: torem(26);
    .left{
      width: torem(400);
      .desc{
        color: #cdcbf0;
        font-size: torem(36);
        line-height: torem(64);
      }
      .song{
        color: #ffde44;
        font-size: torem(30);
        margin-top: torem(20);
      }
    }
    .right{
      flex: 1;
      margin-left: torem(47);
      display: flex;
      align-items: center;
      .seller-info{
        flex: 1;
        margin-left: torem(7);
        margin-top: torem(10);
        .seller-name{
          font-size: torem(36);
          color: #fff;
          padding-left: torem(5);
        }
        .seller-grade{
          height: torem(60);
          line-height: torem(60);
          display: inline-flex;
          padding: 0 torem(5);
          text-align: center;
          border-radius: torem(60);
          background-color: #4f47c0;
          font-size: torem(32);
          color: #fff;
          overflow: hidden;
        }
      }
    }
  }
  .bottom{
    border-top: 1px solid #8a84dd;
    display: flex;
    align-items: center;
    padding-top: torem(33);
    .buyer-info{
      flex: 1;
      margin-left: torem(40);
      margin-top: torem(10);
      .buyer-name{
        font-size: torem(30);
        color: #fff;
        padding-left: torem(20);
      }
      .play-btn{
        width: torem(420);
        height: torem(72);
        line-height: torem(72);
        display: flex;
        margin-top: torem(15);
        padding-left: torem(40);
        border-radius: torem(72);
        background-color: #b0abff;
        font-size: torem(30);
        color: #7e78e1;
        align-items: center;
        .icon-play{
          width: torem(40);
          margin-right: torem(30);
        }
      }
    }
  }
  .btn-join{
    background-color: rgb(30, 211, 238);
    box-shadow: 0px torem(14) torem(10) 0px rgba(85, 65, 162, 0.4),inset 0px torem(23) torem(62) 0px rgba(255, 255, 255, 0.5);
    position: absolute;
    width: torem(360);
    height: torem(100);
    line-height: torem(100);
    font-size: torem(42);
    color: #0363b5;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: torem(100);
    left: 50%;
    margin-left: torem(-180);
    bottom: torem(-50);
    .icon-lock{
      width: torem(32);
      margin-right: torem(20);
    }
    &.disabled{
      color: #606060;
      background-color: rgb(209, 209, 209);
    }
  }
  .status{
    position: absolute;
    right: 0;
    top: torem(-38);
    min-width: torem(640);
    height: torem(76);
    background-color: rgb(255, 106, 237);
    line-height: torem(76);
    display: flex;
    justify-content: flex-end;
    padding-right: torem(38);
    border-radius: torem(40) torem(20) torem(10) torem(10);
    box-shadow: 0px torem(14) torem(10) 0px rgba(85, 65, 162, 0.4),inset 0px torem(23) torem(62) 0px rgba(255, 255, 255, 0.5);
    font-size: torem(30);
    color: #fff;
    .jinbi{
      margin-left: torem(35);
    }
  }
}

</style>
