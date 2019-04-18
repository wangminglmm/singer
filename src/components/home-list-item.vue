<template>
  <div class="item">
    <div class="top">
      <div class="left">
        <Avatar
          :imgUrl="taskInfo.seller.avatarUrl"
          :uid="taskInfo.seller.uid"
          :nickName="taskInfo.seller.nickName"
          type="seller"
        />
        <div class="seller-info">
          <div class="seller-name">{{taskInfo.seller.nickName}}</div>
          <div class="seller-grade">{{taskInfo.grade}}</div>
        </div>

      </div>
      <div
        class="right"
        v-if="taskInfo.leader"
      >
        <Avatar
          :imgUrl="taskInfo.leader.avatarUrl"
          :uid="taskInfo.leader.uid"
          :nickName="taskInfo.leader.nickName"
          type="buyer"
        />
        <div class="buyer-info">
          <div class="buyer-name">{{taskInfo.leader.nickName}}</div>
          <div class="score">领唱评分:{{taskInfo.leader.score}}</div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div
        class="desc ellipsis"
        v-for="(item,index) in taskInfo.lyricList"
        :key="index"
      >{{item}}</div>
      <div class="song">《{{taskInfo.songName}}》 {{taskInfo.songAuthor}}
        <button-play @click="handlePlayMusic"></button-play>
      </div>
    </div>
    <div
      class="btn-join"
      :class="{disabled: disabled}"
      @click="handleJoin"
    >
      <img
        src="../assets/images/icon-lock.png"
        class="icon-lock"
        alt=""
        v-if="taskInfo.needsPassword && !disabled"
      >{{buttonText}}
    </div>
    <div class="status">
      <span class="time">剩余时间：{{taskInfo.remainTime | formatSeconds}}</span>
      <span class="jinbi">剩余金币：{{taskInfo.remainGold}}</span>
    </div>
    <dialog-password
      ref="dialogPassword"
      title="输入密码"
      @success="handlePasswordSuccess"
    >
    </dialog-password>
  </div>
</template>
<script>
import Avatar from "./avatar"
import ButtonPlay from './button-play'
import { mapGetters } from "vuex"
import dialogPassword from "@/components/dialog-password"
export default {
  props: {
    taskInfo: Object
  },
  data() {
    return {};
  },
  created() {
  },
  computed: {
    ...mapGetters(["userInfo"]),
    buttonText() {
      let info = this.taskInfo;
      if (info.remainTime <= 0) {
        return "已结束";
      }
      if (info.allowSex != 2 && info.allowSex != this.userInfo.sex) {
        return `性别不符(限${info.allowSex == 0 ? "女" : "男"}性)`;
      }
      return "参加";
    },
    disabled() {
      return this.buttonText !== "参加";
    }
  },
  components: {
    Avatar,
    dialogPassword,
    ButtonPlay
  },
  methods: {
    handleJoin() {
      if (this.disabled) {
        return this.$toast("条件不符合，请换一个试试吧！");
      }
      let taskId = this.taskInfo.taskId;
      this.$http.get('/sing/checkJoin?id='+taskId).then((res) => {
        if(res.error_code != 0){
          return this.$toast(res.msg);
        }
      })
      if (this.taskInfo.needsPassword) {
        this.$refs.dialogPassword.show();
      } else {
        this.toJoin();
      }
    },
    handlePlayMusic(taskInfo) {
      // todo 这里调用原生播放音乐
      let url = this.taskInfo.leaderMusic;
      console.log(url)
      playVoice(this.userInfo.p,url);
      //alert("这里调用原生播放音乐");
    },
    handlePasswordSuccess(password) {
      // todo 接口验证密码是否正确
      let taskId = this.taskInfo.taskId;
      this.$http.get('/sing/checkPwd?id='+taskId+'&pwd='+password).then((res) => {
        if (res.error_code == 0) {
          this.$refs.dialogPassword.hide();
          this.toJoin();
        } else {
          this.$toast(res.msg);
        }
      })
    },
    toJoin() {
      this.$router.push({
        path: "/join",
        query: {
          taskInfo: JSON.stringify(this.taskInfo)
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/css/variable";
.item {
  position: relative;
  padding: torem(50) torem(30) torem(120);
  background-color: rgb(111, 104, 216);
  border-radius: torem(60) torem(20) torem(60) torem(20);
  .top {
    height: torem(200);
    display: flex;
    align-items: center;
    padding-bottom: torem(26);
    .left {
      display: flex;
      width: torem(500);
      align-items: center;
      .seller-info {
        flex: 1;
        margin-left: torem(20);
        margin-top: torem(10);
        .seller-name {
          font-size: torem(36);
          color: #fff;
          padding-left: torem(5);
        }
        .seller-grade {
          height: torem(60);
          line-height: torem(60);
          display: inline-flex;
          padding: 0 torem(10);
          text-align: center;
          border-radius: torem(60);
          background-color: #4f47c0;
          font-size: torem(32);
          color: #fff;
          overflow: hidden;
        }
      }
    }
    .right {
      flex: 1;
      margin-left: torem(47);
      display: flex;
      align-items: center;
      .buyer-info {
        flex: 1;
        margin-left: torem(40);
        margin-top: torem(10);
        .buyer-name {
          font-size: torem(36);
          color: #fff;
        }
        .score {
          font-size: torem(36);
          color: #b0abff;
        }
      }
    }
  }
  .bottom {
    border-top: 1px solid #8a84dd;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-top: torem(33);
    .desc {
      color: #c8c6ef;
      font-size: torem(36);
      line-height: torem(64);
      text-align: center;
    }
    .song {
      color: #ffffff;
      font-size: torem(30);
      margin-top: torem(20);
      display: flex;
      align-items: center;
      .btn-play{
        margin-left: torem(18);
      }
    }
  }
  .btn-join {
    background-color: rgb(30, 211, 238);
    box-shadow: 0px torem(14) torem(10) 0px rgba(85, 65, 162, 0.4),
      inset 0px torem(23) torem(62) 0px rgba(255, 255, 255, 0.5);
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
    .icon-lock {
      width: torem(32);
      margin-right: torem(20);
    }
    &.disabled {
      color: #606060;
      background-color: rgb(209, 209, 209);
    }
  }
  .status {
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
    box-shadow: 0px torem(14) torem(10) 0px rgba(85, 65, 162, 0.4),
      inset 0px torem(23) torem(62) 0px rgba(255, 255, 255, 0.5);
    font-size: torem(30);
    color: #fff;
    .jinbi {
      margin-left: torem(35);
    }
  }
}
</style>
