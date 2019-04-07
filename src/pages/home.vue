<template>
  <div class="container">
    <van-nav-bar
      title="我赏你唱"
      left-text=""
      right-text="打赏记录"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <section class="banner">
      <img src="../assets/images/banner.jpg" alt="">
      <div class="button-operate">
        <Button type="lead-singer" @click="handleToSelectSong">我要领唱</Button>
        <Button type="publish" @click="handlePublish">我要发布</Button>
      </div>
      <div class="btn-rule" @click="showRule=true">活动规则</div>
    </section>
    <van-list
        v-model="loading"
        :finished="finished"
        @load="onLoad"
        :immediate-check="false"
        :offset="100"
      >
      <section class="list">
        <home-list-item
        v-for="(item, index) in list"
        :key="index"
        :taskInfo="item"
        class="list-item"
        ></home-list-item>
      </section>
    </van-list>
    <div class="circle-button" @click="handToLeadRecord">我的领唱</div>
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
        <div class="close" @click="showRule=false"><img src="../assets/images/icon-close.png" alt=""></div>
      </div>
    </van-popup>
  </div>
</template>
<script>
import Button from '@/components/Button'
import HomeListItem from '@/components/home-list-item'
import {res} from '@/mock/home'
console.log(res)
export default {
  data() {
    return {
      list: [],
      showRule: false,
      loading: false,
      finished: false,
      page: 1,
      pageTotal: 0,
    }
  },
  created() {
    this.getData()
  },
  mounted() {
    this.timer = setInterval(() => {
      this.list.forEach(item => {
        item.remainTime--
      })
    }, 1000)
  },
  beforeDestory() {
    clearTimeout(this.timer)
  },
  methods: {
    getData() {
      // todo 发送请求获取接口数据
      this.loading = true
      this.$http.get('/activities/XmasTree17/load', {
        params: {
          page: this.page
        }
      }).then((res) => {
        console.log(res)
      })
      // 这里成功后执行
      setTimeout(() => {
        let data = res
        this.list = this.list.concat(data.list)
        this.pageTotal = data.pageTotal
        this.loading = false
        if (this.pageTotal <= this.page) {
          this.finished = true
        }
      }, 400);
    },
    onLoad() {
      this.page++
      this.getData()
    },
    onClickLeft() {

    },
    onClickRight() {
      this.$router.push({
        path: '/reward-record'
      })
    },
    handlePublish() {
      this.$router.push('/publish')
    },
    handleToSelectSong() {
      this.$router.push({
        path: '/select-song',
        query: {
          from: 'myLeadSinger'
        }
      })
    },
    handToLeadRecord() {
      this.$router.push({
        path: '/lead-record'
      })
    }
  },
  components: {
    Button,
    HomeListItem
  }
}
</script>
<style scoped lang="scss">
@import '../assets/css/variable';
.banner{
  position: relative;
  .button-operate{
    position: absolute;
    display: flex;
    justify-content: space-between;
    width: torem(852);
    left: 50%;
    bottom: torem(174);
    margin-left: torem(-426);
  }
  .btn-rule{
    position: absolute;
    right: torem(45);
    top: 0;
    width: torem(180);
    height: torem(170);
    text-align: center;
    font-size: torme(48);
    color: #fff;
    background-color: rgba(0,0,0,0.4);
    border-radius: 0 0 torem(180) torem(180);
    box-sizing: border-box;
    padding: torem(10) torem(30) 0;
  }
}
.list{
  padding: torem(45) torem(40) torem(90);
  background: #4d45be;
  .list-item+.list-item{
    margin-top: torem(120);
  }
}
.circle-button{
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
  box-shadow: 0px torem(14) torem(10) 0px rgba(85, 65, 162, 0.4),inset 0px torem(23) torem(62) 0px rgba(255, 255, 255, 0.24);
}
.popup-rule{
  background-color: transparent;
}
.rule{
  width: torem(800);
  border-radius: torem(60);
  background-color: rgb(111, 104, 216);
  box-shadow: 0px torem(14) torem(10) 0px rgba(85, 65, 162, 0.4),inset 0px torem(23) torem(62) 0px rgba(255, 255, 255, 0.24);
  box-sizing: border-box;
  padding: 0 torem(40) torem(100);
  font-size: torem(30);
  color: #fff;
  position: relative;
  margin: 0 auto;
  .title{
    font-size: torem(42);
    line-height: torem(150);
    text-align: center;
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
<style>
.container .van-popup {
  background-color: transparent;
  overflow-y: inherit;
}
</style>



