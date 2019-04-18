<template>
  <div class="container">
    <van-nav-bar
      :title="title"
      left-text=""
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="tabs">
      <div class="tab-nav">
        <div
          class="tab-nav-item"
          :class="{active: tabModel === 1}"
          @click="tabModel = 1"
        >我发布的打赏</div>
        <div
          class="tab-nav-item"
          :class="{active: tabModel === 2}"
          @click="tabModel = 2"
        >我参与的打赏</div>
      </div>
      <div class="tab-content">
        <div
          class="tab-content-item"
          :class="{show: tabModel === 1}"
        >
          <div
            class="shadow-box publish-item"
            v-for="(item, index) in publish.list"
            :key="index"
          >
            <div class="item-wrapper">
              <div class="top">
                <div class="left">
                  <Avatar
                    :imgUrl="item.seller.avatarUrl"
                    :uid="item.seller.uid"
                    :nickName="item.seller.nickName"
                    type="seller"
                  />
                  <div class="seller-info">
                    <div class="seller-name">{{item.seller.nickName}}</div>
                    <div class="seller-grade">{{item.grade}}</div>
                  </div>

                </div>
                <div
                  class="right"
                  v-if="item.leader"
                >
                  <Avatar
                    :imgUrl="item.leader.avatarUrl"
                    :uid="item.leader.uid"
                    :nickName="item.leader.nickName"
                    type="buyer"
                  />
                  <div class="buyer-info">
                    <div class="buyer-name">{{item.leader.nickName}}</div>
                    <div class="score">领唱评分:{{item.leader.score}}</div>
                  </div>
                </div>
              </div>
              <div class="bottom">
                <div
                  class="desc ellipsis"
                  v-for="(lyric,i) in item.lyricList"
                  :key="i"
                >{{lyric}}</div>
                <div class="song">《{{item.songName}}》 {{item.songAuthor}}
                  <button-play @click="handlePlayMusic(item.leaderMusic)"></button-play>
                </div>
              </div>
              <div class="joiner-list">
                <div
                  class="joiner-item"
                  v-for="joiner in item.joinerList"
                  :key="joiner.uid"
                >
                  <Avatar
                    :imgUrl="joiner.avatarUrl"
                    :uid="joiner.uid"
                    :nickName="joiner.nickName" />
                  <div class="joiner-detail">
                    <div class="nick-name">{{joiner.nickName}}</div>
                    <button-play
                      @click="handlePlayMusic(joiner.musicUrl)"
                      text="播放"
                      class="btn"
                      color="#6f68d8"
                    ></button-play>
                    <div
                      class="joiner-status"
                      :class="{failed: joiner.status == 0}"
                    >{{joiner.status == 0 ? '接唱失败' : '接唱成功'}}</div>
                  </div>
                </div>
              </div>
              <div
                class="left-status"
                :class="[item.remainTime <= 0 ? 'over': 'processing']"
              >
                已结束
                  </div>
                  </div>
                  <div
                  class="status"
                  v-if="item.remainTime > 0"
                >
                  <span class="time">剩余时间：{{item.remainTime | formatSeconds}}</span>
                  <span class="jinbi">剩余金币：{{item.remainGold}}</span>
              </div>
            </div>
          </div>
          <div
            class="tab-content-item"
            :class="{show: tabModel === 2}"
          >
            <div
              class="shadow-box publish-item"
              v-for="(item, index) in participate.list"
              :key="index"
            >
              <div class="item-wrapper">
                <div class="top">
                  <div class="left">
                    <Avatar
                      :imgUrl="item.seller.avatarUrl"
                      :uid="item.seller.uid"
                      :nickName="item.seller.nickName"
                      type="seller"
                    />
                    <div class="seller-info">
                      <div class="seller-name">{{item.seller.nickName}}</div>
                      <div class="seller-grade">{{item.grade}}</div>
                    </div>

                  </div>
                  <div
                    class="right"
                    v-if="item.leader"
                  >
                    <Avatar
                      :imgUrl="item.leader.avatarUrl"
                      :uid="item.leader.uid"
                      :nickName="item.leader.nickName"
                      type="buyer"
                    />
                    <div class="buyer-info">
                      <div class="buyer-name">{{item.leader.nickName}}</div>
                      <div class="score">领唱评分:{{item.leader.score}}</div>
                    </div>
                  </div>
                </div>
                <div class="bottom">
                  <div
                    class="desc ellipsis"
                    v-for="(lyric,i) in item.lyricList"
                    :key="i"
                  >{{lyric}}</div>
                  <div class="song">《{{item.songName}}》 {{item.songAuthor}}
                    <button-play @click="handlePlayMusic(item.leaderMusic)"></button-play>
                  </div>
                </div>
                <div class="joiner-list">
                  <div
                    class="joiner-item"
                    v-for="joiner in item.joinerList"
                    :key="joiner.uid"
                  >
                    <Avatar
                    :imgUrl="joiner.avatarUrl"
                    :uid="joiner.uid"
                    :nickName="joiner.nickName" />
                    <div class="joiner-detail">
                      <div class="nick-name">{{joiner.nickName}}</div>
                      <button-play
                        @click="handlePlayMusic(joiner.musicUrl)"
                        text="播放"
                        class="btn"
                        color="#6f68d8"
                      ></button-play>
                      <div
                        class="joiner-status"
                        :class="{failed: joiner.status == 0}"
                      >{{joiner.status == 0 ? '接唱失败' : '接唱成功'}}</div>
                    </div>
                  </div>
                </div>
                <div
                  class="left-status"
                  :class="[item.remainTime <= 0 ? 'over': 'processing']"
                >
                  已结束
                    </div>
                    </div>
                    <div
                    class="status"
                    v-if="item.remainTime > 0"
                  >
                    <span class="time">剩余时间：{{item.remainTime | formatSeconds}}</span>
                    <span class="jinbi">剩余金币：{{item.remainGold}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
</template>
<script>
import Avatar from "@/components/avatar";
import ButtonPlay from "@/components/button-play";
import {mapGetters} from 'vuex';
export default {
  data() {
    return {
      title: "打赏记录",
      tabModel: 1,
      publish: {
        list: []
      },
      participate: {
        list: []
      }
    };
  },
  created() {
    this.getData()
  },
  computed: {
    ...mapGetters(["userInfo"])
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    handlePlayMusic(musicUrl) {
      // todo 这里调用原生播放音乐
      playVoice(this.userInfo.p,musicUrl);
    },
    getData(){
      // todo 发送请求获取接口数据
      this.loading = true
      this.$http.get('/sing/record', {
        params: {
          page: this.page
        }
      }).then((res) => {
        console.log(res.data)
        let data = res.data
        this.publish.list = this.publish.list.concat(data.publish.list)
        this.participate.list = this.participate.list.concat(data.participate.list)
        //this.pageTotal = data.pageTotal
        this.loading = false
        if (this.pageTotal <= this.page) {
          this.finished = true
        }
      })
    }
  },
  watch: {},
  components: {
    Avatar,
    ButtonPlay
  }
};
</script>
<style scoped lang="scss">
@import "../assets/css/variable";
.container {
  background: url(../assets/images/publish-bg.jpg) no-repeat center 46px;
  background-size: 100% torem(756);
}
.tabs {
  .tab-nav {
    display: flex;
    justify-content: center;
    margin-top: torem(100);
    .tab-nav-item {
      font-size: torem(42);
      line-height: torem(42);
      height: torem(78);
      color: #fff;
      position: relative;
      & + .tab-nav-item {
        margin-left: torem(230);
      }
      &::before {
        content: "";
        position: absolute;
        width: torem(72);
        height: torem(12);
        border-radius: torem(12);
        left: 50%;
        margin-left: torem(-36);
        bottom: 0;
        background-color: #ffec4a;
        display: none;
      }
      &.active {
        color: #ffec4a;
        &::before {
          display: block;
        }
      }
    }
  }
  .tab-content {
    padding: torem(35) torem(37);
    .tab-content-item {
      display: none;
      &.show {
        display: block;
      }
    }
  }
}
.publish-item {
  position: relative;
  margin-top: torem(70);
  padding: 0 !important;
  .item-wrapper {
    padding: torem(70) 0 torem(0) !important;
    position: relative;
    overflow: hidden;
  }
  .top {
    height: torem(200);
    display: flex;
    align-items: center;
    padding-bottom: torem(26);
    padding: 0 torem(34) torem(25);
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
      .btn-play {
        margin-left: torem(18);
      }
    }
  }
  .joiner-list {
    background-color: #fff;
    margin-top: torem(20);
    border-radius: 0 0 torem(60) torem(20);
    .joiner-item {
      height: torem(200);
      display: flex;
      align-items: center;
      padding: 0 torem(100);
      position: relative;
      .joiner-detail {
        color: #6f68d8;
        font-size: torem(30);
        padding-left: torem(40);
        .btn {
          margin-top: torem(20);
        }
      }
      .joiner-status {
        position: absolute;
        width: torem(150);
        height: torem(54);
        line-height: torem(54);
        text-align: center;
        font-size: torem(26);
        color: #fff;
        background: #ff4f32;
        border-radius: torem(24) 0 torem(24) torem(10);
        top: 0;
        right: 0;
        &.failed {
          background-color: #cccccc;
          color: #666666;
        }
      }
      & + .joiner-item {
        border-top: 1px dashed #f5f4ff;
      }
    }
  }
  .left-status {
    position: absolute;
    left: 0;
    top: 0;
    font-size: torem(28);
    text-align: center;
    width: torem(400);
    height: torem(94);
    line-height: torem(94);
    transform: rotate(-45deg) translate3d(-30%, -100%, 0);
    display: none;
    &.over {
      color: #666666;
      background-color: #cccccc;
      display: block;
    }
    &.processing {
      color: #fff;
      background-color: #ff4f32;
      display: none;
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
.mt20 {
  margin-top: torem(20);
}
.shadow-box {
  background-color: rgb(111, 104, 216);
  border-radius: torem(60) torem(20) torem(60) torem(20);
  padding: torem(80) torem(60);
  box-shadow: 0px torem(14) torem(10) 0px rgba(85, 65, 162, 0.4),
    inset 0px torem(23) torem(62) 0px rgba(255, 255, 255, 0.5);
}
.btn-publish {
  margin: torem(130) auto torem(35);
}
</style>


