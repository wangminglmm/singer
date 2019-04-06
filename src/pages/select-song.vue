<template>
  <div class="container">
    <van-nav-bar
      :title="title"
      left-text=""
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="search-box"
      @click="handleSearchClick">
      <van-search placeholder="搜索歌名/歌手/歌词"
      background="transparent"
      input-align="center"
      shape="round"
      disabled/>
    </div>
    <van-tabs
      v-model="active"
      :line-height="0"
      swipeable
      sticky
      title-inactive-color="#999999"
      title-active-color="#4f47c0"
      background="#eeeeee"
      class="tabs">
      <van-tab
      v-for="item in songList"
      :key="item.type"
      :title="item.title"
      >
        <van-list
          v-model="item.loading"
          :finished="item.finished"
          @load="onLoad(item)"
        >
          <div class="song-item"
            v-for="(v, i) in item.list"
            :key="i"
            @click="handleSelectItem(v)">
            <div class="title">
              <span class="song-name">{{v.songName}}</span>
              <span class="song-author">{{v.songAuthor}}</span>
            </div>
            <div class="song-content">
              <div class="lyric"
              v-for="(lyric, lyIndex) in v.lyricList"
              :key="lyIndex">{{lyric}}</div>
            </div>
          </div>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
const songJson = {
  songName: '绿色',
  songAuthor: '陈雪凝',
  lyricList: ['说不痛苦那是假的，毕竟我的心也是肉做的', '你离开时我心里的彩虹，就变成灰色'],
  songId: 1,
  leader: { // 领唱人
    avatarUrl: require('../assets/images/avatar.png'),
    nickName: '小郑',
    uid: '10001', // 用户的id
    score: 95,
  },
}
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      title: '选择歌曲',
      active: 10,
      songList: [
        {
          title: '热门推荐',
          type: 10,
          loading: false,
          finished: false,
          page: 1,
          list: []
        },
        {
          title: '抖音神曲',
          type: 20,
          loading: false,
          finished: false,
          page: 1,
          list: []
        },
        {
          title: 'KTV麦榜',
          type: 30,
          loading: false,
          finished: false,
          page: 1,
          list: []
        },
        {
          title: '粤语金曲',
          type: 40,
          loading: false,
          finished: false,
          page: 1,
          list: []
        },
        {
          title: '经典老歌',
          type: 50,
          loading: false,
          finished: false,
          page: 1,
          list: []
        }
      ],
      from: '', // 判断发布模式还是我的领唱模式
    }
  },
  computed: {

  },
  created() {
    this.from = this.$route.query.from
  },
  methods: {
    ...mapMutations(
      {'setSelectSong': 'setSelectSong'}
    ),
    onClickLeft() {
      this.$router.back();
    },
    onSearch() {

    },
    handleSelectItem(item) {
      console.log(item)
      if (this.from != 'myLeadSinger') {
        this.setSelectSong(item)
        this.$router.push({
          path: '/publish'
        })
      } else {
        this.$router.push({
          path: '/join',
          query: {
            taskInfo: JSON.stringify(item)
          }
        })
      }
    },
    async onLoad(obj) {
      let {type, page} = obj
      let item = this.findByType(type)
      let res = await this.getData(type, page)
      console.log(res)
      item.list.push(...res.data)
      item.loading = false
      item.page = page
      if (page >= res.pageTotal) {
        item.finished = true
      }
      item.page++
    },
    async getData(type, page) {
      console.log(type)
      console.log(page)
      let data = []
      for(let i = 0; i < 10; i ++) {
        data.push({
          ...songJson,
          songId: (Math.random() + '').replace('.', '')
        })
      }
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({
            data,
            pageTotal: 3
          })
        }, 1000)
      })
    },
    findByType(type) {
      let songList = this.songList
      return songList.find(item => {
        return item.type === type
      })
    },
    handleSearchClick() {
      if (this.from != 'myLeadSinger') {
        this.$router.push('/search-song')
      } else {
        this.$router.push({
          path: '/search-song',
          query: {
            from: 'myLeadSinger'
          }
        })
      }
    }
  },
  components: {
  }
}
</script>
<style scoped lang="scss">
@import "../assets/css/variable";
.search-box{
  height: torem(171);
  background: url(../assets/images/publish-bg.jpg) no-repeat top center;
  background-size: 100% auto;
  .van-search__content{
    background: #443e9d;
  }
  /deep/ .van-field__control{
    color: #cdcbf0;
  }
  /deep/ .van-field__control::-webkit-input-placeholder{
    color:#cdcbf0;
  }
  /deep/ .van-icon-search {
    color: #cdcbf0;
  }
}
.song-item{
  background: #ffffff;
  padding: torem(52) torem(32);
  &:active{
    background-color: #eeeeee;
  }
  .title{
    .song-name{
      font-size: torem(42);
      color: #282828;
    }
    .song-author{
      font-size: torem(30);
      color: #999999;
      margin-left: torem(36);
    }
  }
  .lyric{
    font-size: torem(36);
    color: #666666;
    line-height: torem(60);
  }
}
.tabs{
  font-size: torem(36);
}
</style>


