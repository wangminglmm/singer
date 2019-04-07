<template>
  <div class="container">
    <van-nav-bar
      :title="title"
      left-text=""
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="search-box">
      <form action="/">
        <van-search placeholder="搜索歌名/歌手/歌词"
        v-model="value"
        background="transparent"
        input-align="center"
        shape="round"
        ref="input"
        @search="onSearch"
        @input="onInput"
        />
      </form>
    </div>
    <div class="song-item"
      v-for="(v, i) in list"
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
import {debounce} from '@/utils'
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      value: '',
      title: '搜索歌曲',
      list: [],
      from: '', // 判断发布模式还是我的领唱模式
    }
  },
  computed: {

  },
  created() {
    this.deLoad = debounce(this.onLoad, 1000)
    this.from = this.$route.query.from
  },
  mouted() {
  },
  methods: {
    ...mapMutations(
      {'setSelectSong': 'setSelectSong'}
    ),
    onClickLeft() {
      this.$router.back();
    },
    onSearch() {
      let value = this.value
      this.onLoad()
    },
    onInput() {
      let value = this.value
      console.log(value)
      this.deLoad()
    },
    async onLoad() {
      let list = this.list
      let value = this.value
      let res = await this.getData()
      console.log(res)
      this.list = res.data

    },
    async getData() {
      // 搜索这里不要做分页，有多少就显示多少
      let value = this.value
      console.log(value)
      let data = []
      for(let i = 0; i < 10; i ++) {
        data.push({
          ...songJson,
          songName: value,
          songId: (Math.random() + '').replace('.', '')
        })
      }
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({
            data
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
    handleSelectItem(item) {
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


