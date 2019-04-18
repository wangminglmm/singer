<template>
  <div class="container">
    <van-nav-bar
      :title="title"
      left-text=""
      left-arrow
      @click-left="onClickLeft"
    />
    <section class="banner">
      <img
        src="../assets/images/join-banner.jpg"
        alt=""
      >
      <div class="button-operate">
      </div>
      <div
        class="btn-rule"
        @click="showRule=true"
      >活动规则</div>
    </section>
    <div class="detail">
      <div class="joiner">
        <template v-if="operateType==='join_member' || operateType==='join_leader'">
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
              <button-play
                class="play-btn"
                color="#ff7a56"
                @click="handlePlayMusic"
              ></button-play>
            </div>
          </div>
          <div class="status">
            <span class="time">剩余时间：{{taskInfo.remainTime | formatSeconds}}</span>
            <span class="jinbi">剩余金币：{{taskInfo.remainGold}}</span>
          </div>
        </template>
        <template v-else-if="operateType === 'own_leader'">
          <div class="own-leader">
            <div class="bottom">
              <div
                class="desc ellipsis"
                v-for="(item,index) in taskInfo.lyricList"
                :key="index"
              >{{item}}</div>
              <div class="song">《{{taskInfo.songName}}》 {{taskInfo.songAuthor}}
                <button-play
                  class="play-btn"
                  color="#ff7a56"
                  text="原唱"
                  @click="handlePlayMusic"
                ></button-play>
              </div>
            </div>
          </div>
        </template>
        <template v-else-if="operateType==='own_member'">
          <div class="own-member">
            <div
              class="top"
              v-if="taskInfo.leader"
            >
              <Avatar
              :imgUrl="taskInfo.leader.avatarUrl"
              :uid="taskInfo.leader.uid"
              :nickName="taskInfo.leader.nickName" />
              <div class="buyer-info">
                <div class="buyer-name">当前领唱人：{{taskInfo.leader.nickName}}</div>
                <div class="score">领唱评分：{{taskInfo.leader.score}}</div>
              </div>
            </div>
            <div class="bottom">
              <div
                class="desc ellipsis"
                v-for="(item,index) in taskInfo.lyricList"
                :key="index"
              >{{item}}</div>
              <div class="song">《{{taskInfo.songName}}》 {{taskInfo.songAuthor}}
                <button-play
                  class="play-btn"
                  color="#ff7a56"
                  @click="handlePlayMusic"
                ></button-play>
              </div>
            </div>
          </div>
        </template>
        <img
          src="../assets/images/icon-recording.png"
          class="icon-recording"
          alt=""
          @click="handRecord"
        >

      </div>
    </div>
    <van-popup
      overlay-class="popup-rule"
      v-model="showRule"
    >
      <div class="rule">
        <div class="title">游戏规则</div>
        <p>1.用户可以发布唱歌打赏，可限制男女参加。其他用户唱对歌曲可领到相应的奖励。</p>
        <p>2.每人每首歌曲只有一次演唱机会，如果失败，将无法获得奖励</p>
        <p>3.打赏的时间有效期为20分钟,超过20分钟,打赏结束,未领取完的金币自动退回到发布者的账户。</p>
        <p>4.为了防止占坑,发布的用户可以选择私密打赏设置密码,也可在“我发布的打赏”中，点击用户头像，即可禁止该用户参加你的打赏。</p>
        <div
          class="close"
          @click="showRule=false"
        ><img
            src="../assets/images/icon-close.png"
            alt=""
          ></div>
      </div>
    </van-popup>
  </div>
</template>
<script>
import Button from "@/components/Button";
import ButtonPlay from "@/components/button-play";
import Avatar from "@/components/avatar";
import {mapGetters} from 'vuex'
export default {
  data() {
    return {
      title: "",
      showRule: false,
      info: {
        imgUrl: require("../assets/images/avatar.png")
      },
      taskInfo: {}
    };
  },
  created() {
    let taskInfo = this.$route.query.taskInfo || "{}";
    this.taskInfo = JSON.parse(taskInfo);
    console.log(this.taskInfo);
    console.log(this.operateType);
  },
  computed: {
    ...mapGetters({
      'userInfo': 'userInfo'
    }),
    type() {
      // 判断是领唱还是参加
      if (this.taskInfo.leader) {
        return "member";
      } else {
        return "leader";
      }
    },
    operateType() {
      // 区分了四种类型
      if (this.taskInfo.taskId) {
        if (this.taskInfo.leader) {
          this.title = "接歌";
          return "join_member"; // 点击别人发布的，已经有领唱
        } else {
          this.title = "接歌";
          return "join_leader"; // 点击别人发布的，还没有领唱
        }
      } else {
        this.title = "我要领唱";
        if (this.taskInfo.leader) {
          return "own_member"; // 首页点击我要领唱进来的，已经有领唱
        } else {
          return "own_leader"; // 首页点击我要领唱进来的，还没有领唱
        }
      }
    }
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    onClickRight() {},
    handlePlayMusic() {
      // todo 这里调用原生播放音乐
      console.log(this.taskInfo);
      playVoice(this.userInfo.p,this.taskInfo.leaderMusic);
    },
    handRecord() {
      // todo 这里调用原生录音
      console.log(this.taskInfo);
      let obj = {act:'sing',id:this.taskInfo.taskId ? this.taskInfo.taskId : this.taskInfo.songId,type:this.taskInfo.taskId ? 'member' : 'leader'};
      console.log(obj);
      Voice(this.userInfo.p,this.taskInfo.lyric,JSON.stringify(obj));
    }
  },
  components: {
    Button,
    Avatar,
    ButtonPlay
  }
};
</script>
<style scoped lang="scss">
@import "../assets/css/variable";
.banner {
  position: relative;
  .button-operate {
    position: absolute;
    display: flex;
    justify-content: space-between;
    width: torem(852);
    left: 50%;
    bottom: torem(174);
    margin-left: torem(-426);
  }
  .btn-rule {
    position: absolute;
    right: torem(45);
    top: 0;
    width: torem(180);
    height: torem(170);
    text-align: center;
    font-size: torme(48);
    color: #fff;
    background-color: rgba(0, 0, 0, 0.4);
    border-radius: 0 0 torem(180) torem(180);
    box-sizing: border-box;
    padding: torem(10) torem(30) 0;
  }
}
.list {
  padding: torem(45) torem(40) torem(90);
  background: #4d45be;
  .list-item + .list-item {
    margin-top: torem(120);
  }
}
.circle-button {
  position: fixed;
  box-sizing: border-box;
  padding: 0 torem(20);
  padding-top: torem(20);
  right: torem(10);
  bottom: torem(90);
  width: torem(162);
  height: torem(162);
  text-align: center;
  font-size: torem(42);
  color: #fff;
  border-radius: 50%;
  background-color: rgb(255, 116, 78);
  box-shadow: 0px torem(14) torem(10) 0px rgba(85, 65, 162, 0.4),
    inset 0px torem(23) torem(62) 0px rgba(255, 255, 255, 0.24);
}
.popup-rule {
  background-color: transparent;
}
.rule {
  width: torem(800);
  border-radius: torem(60);
  background-color: rgb(111, 104, 216);
  box-shadow: 0px torem(14) torem(10) 0px rgba(85, 65, 162, 0.4),
    inset 0px torem(23) torem(62) 0px rgba(255, 255, 255, 0.24);
  box-sizing: border-box;
  padding: 0 torem(40) torem(100);
  font-size: torem(30);
  color: #fff;
  position: relative;
  margin: 0 auto;
  .title {
    font-size: torem(42);
    line-height: torem(150);
    text-align: center;
  }
  .close {
    position: absolute;
    width: torem(54);
    height: torem(54);
    left: 50%;
    bottom: torem(-100);
    margin-left: torem(-27);
  }
}
.joiner {
  position: relative;
  width: torem(1000);
  padding: torem(100) torem(30) torem(120);
  background-color: #fff;
  border-radius: torem(60) torem(20) torem(60) torem(20);
  margin: torem(-150) auto torem(100);
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
          color: #666666;
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
          color: #666666;
        }
        .score {
          font-size: torem(36);
          color: #6f68d8;
        }
      }
    }
  }
  .bottom {
    border-top: 1px solid #eaeaea;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-top: torem(70);
    .desc {
      color: #666666;
      font-size: torem(42);
      line-height: torem(64);
      text-align: center;
    }
    .song {
      color: #bebebe;
      font-size: torem(34);
      margin-top: torem(30);
      display: flex;
      align-items: center;
      .btn-play {
        margin-left: torem(18);
      }
      .play-btn {
        margin-left: torem(30);
      }
    }
  }
  .icon-recording {
    margin: torem(180) auto 0;
    display: block;
    width: torem(240);
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
  .song-info {
    text-align: center;
    padding-top: torem(80);
    .lyric {
      font-size: torem(42);
      color: #666666;
    }
    .song {
      color: #ff643a;
      font-size: torem(34);
      margin-top: torem(40);
    }
  }
  .own-member {
    text-align: left;
    padding-top: torem(80);
    .bottom{
      border-top: 0 none;
    }
    .top {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      border-bottom: 1px solid #eaeaea;
      margin-top: torem(-110);
      .buyer-info {
        margin-left: torem(30);
        .buyer-name {
          font-size: torem(36);
          color: #666666;
        }
        .score {
          font-size: torem(36);
          color: #6f68d8;
          margin-top: torem(20);
        }
      }
    }

  }
  .own-leader{
    .bottom{
      border: 0 none;
    }
  }
}
</style>
<style>
.container .van-popup {
  background-color: transparent;
  overflow-y: inherit;
}
</style>



