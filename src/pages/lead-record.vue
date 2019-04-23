<template>
  <div class="container">
    <van-nav-bar
      :title="title"
      left-text=""
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="list">
      <div class="list-item shadow-box"
        v-for="(item, index) in list"
        :key="index">
        <div
          class="desc ellipsis"
          v-for="(lyric,i) in item.lyricList"
          :key="i"
        >{{lyric}}</div>
        <div class="song">《{{item.songName}}》 {{item.songAuthor}}</div>
        <span class="paly-btn" @click="handlePlayMusic(item.leaderMusic)"><img src="../assets/images/icon-erji.png" class="icon-erji" alt="">点击试听
        <audio :src="item.leaderMusic" :ref="item.leaderMusic" controls="" @ended="end()" class="hide"></audio>
        </span>
        
        <!--<div class="play-count">播放次数：{{item.playCount}}</div>-->
      </div>
      <div class="no-data" v-if="!list.length">暂无领唱，快去首页领唱吧！</div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex"
export default {
  data() {
    return {
      title: "我的领唱",
      list: [
        {
          songName: '绿色',
          songAuthor: '陈雪凝',
          lyricList: ['说不痛苦那是假的，毕竟我的心也是肉做的', '你离开时我心里的彩虹，就变成灰色'],
          songId: 1,
          playCount: 100
        },
        {
          songName: '绿色',
          songAuthor: '陈雪凝',
          lyricList: ['说不痛苦那是假的，毕竟我的心也是肉做的', '你离开时我心里的彩虹，就变成灰色'],
          songId: 1,
          playCount: 100
        },
        {
          songName: '绿色',
          songAuthor: '陈雪凝',
          lyricList: ['说不痛苦那是假的，毕竟我的心也是肉做的', '你离开时我心里的彩虹，就变成灰色'],
          songId: 1,
          playCount: 100
        },
        {
          songName: '绿色',
          songAuthor: '陈雪凝',
          lyricList: ['说不痛苦那是假的，毕竟我的心也是肉做的', '你离开时我心里的彩虹，就变成灰色'],
          songId: 1,
          playCount: 100
        },
        {
          songName: '绿色',
          songAuthor: '陈雪凝',
          lyricList: ['说不痛苦那是假的，毕竟我的心也是肉做的', '你离开时我心里的彩虹，就变成灰色'],
          songId: 1,
          playCount: 100
        }
      ]
    };
  },
  created() {
    this.getData()
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    getData() {
      this.$http.get('/sing/leaderRecord').then((data) => {
        console.log(data);
        this.list = data.data;
      })
    },
    start(url) {
      let aud = this.$refs[url][0]
      if(aud.paused){
        aud.play()
        //this.icon = 'stop-circle-o'
      }else{
        aud.pause()
        //this.icon = 'play-circle-o';
      }
    },
    end() {
      //this.icon = 'play-circle-o';
    },
    handlePlayMusic(url) {
      console.log(this.userInfo)
      // todo 这里调用原生播放音乐
      console.log(url)

      if(this.userInfo.p == 'ios'){
        if(url.indexOf('.amr') != -1){
          var that = this;
          this.$http.get('/sing/getMp3Link?link='+url).then((res) => {
            if(res.error_code == 0){
              that.link = res.data.link;
              setTimeout(()=>{
                that.start(url);
              },2000);
              
            }else{
              this.$toast(res.msg);
            }
          });
        }else{
          setTimeout(()=>{
            this.start(url);
          },200)
        }
      }else{
        playVoice(this.userInfo.p,url);
      }
      //alert("这里调用原生播放音乐");
    }
  },
  watch: {},
  components: {}
};
</script>
<style scoped lang="scss">
@import "../assets/css/variable";
.container {
  background: url(../assets/images/publish-bg.jpg) no-repeat center 46px;
  background-size: 100% torem(756);
}
.list{
  padding: torem(0) torem(55) torem(0);
  .list-item{
    padding: torem(70) torem(60) torem(160);
    margin-top: torem(34);
    text-align: center;
    position: relative;
    &:nth-first-of-type(1){
      margin-top: torem(54);
    }
    &:nth-last-of-type(1) {
      margin-bottom: torem(30);
    }
    .desc{
      font-size: torem(36);
      color: #deddfd;
      line-height: torem(64);
    }
    .song{
      font-size: torem(30);
      color: #ffde44;
      margin: torem(20) 0;
    }
    .paly-btn{
      font-size: torem(36);
      color: #3a3586;
      position: relative;
      .icon-erji{
        width: torem(42);
        margin-top: torem(-8);
        margin-right: torem(10);
      }
      &:before{
        content: '';
        position: absolute;
        bottom: torem(-10);
        height: 1px;
        width: 100%;
        background-color: #3a3586;
      }
    }
    .play-count{
      position: absolute;
      bottom: 0;
      left: 0;
      height: torem(108);
      line-height: torem(108);
      text-align: right;
      font-size: torem(36);
      color: #5149c2;
      padding-right: torem(30);
      box-sizing: border-box;
      background-color: #b7b4ec;
      width: 100%;
      border-radius: 0 0 torem(60) torem(20);
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
.no-data{
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
  color: #ccc;
}
</style>


