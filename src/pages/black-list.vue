<template>
  <div class="container">
    <van-nav-bar
      :title="title"
      left-text=""
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="black-item"
      v-for="(item, i) in list"
      :key="i"
    >
      <Avatar
        :imgUrl="item.avatarUrl"
        :uid="item.uid"
        :nickName="item.nickName"
      />
      <div class="info">
        <div class="name">{{item.nickName}}</div>
        <div class="uid">ID：{{item.uid}}</div>
      </div>
      <div class="btn" @click="unForbid(item.uid)">取消黑名单</div>
    </div>
  </div>
</template>
<script>
import Avatar from "../components/avatar"
export default {
  data() {
    return {
      title: '黑名单',
      list: [],
    }
  },
  computed: {

  },
  created() {
    this.getData()
  },
  mouted() {
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    getData() {
      this.$http.get('/sing/forbidList').then((res) => {
        this.list = res.data;
      })
    },
    unForbid(uid) {
      this.$http.get('/sing/unForbid?uid='+uid).then((res) => {
        this.$toast(res.msg);
        if(res.error_code == 0){
          this.getData();
        }
      });
    }
  },
  components: {
    Avatar
  }
}
</script>
<style scoped lang="scss">
@import "../assets/css/variable";
.container{
  background-color: #f3f2f7;
  min-height: 100vh;
}
.black-item{
  background: #ffffff;
  padding: torem(52) torem(32);
  &+.black-item{
    border-top: 1px solid #f3f2f7;
  }

  display: flex;
  align-content: center;
  .info{
    flex: 1;
      margin-left: torem(40);
    .name{
      font-size: torem(42);
      color: #282828;
    }
    .uid{
      font-size: torem(36);
      color: #666666;
      margin-top: torem(10)
    }
  }
  .btn{
    width: torem(250);
    height: torem(100);
    line-height: torem(100);
    text-align: center;
    background-color: rgb(111, 104, 216);
    font-size: torem(34);
    color: #fff;
    border-radius: torem(100);
    margin-right: torem(10);
  }
}
.tabs{
  font-size: torem(36);
}
</style>

