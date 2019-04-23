<template>
  <div class="btn-play" @click="handleClick" :style="{color: color}">
    <audio :src="link" ref="aud" controls="" @ended="end()" class="hide"></audio>
    <van-icon :name="icon" class="img" />
    <span class="text">{{text}}</span>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    text: {
      type: String,
      default: '试听',
    },
    color: String,
    musicUrl:String,
  },
  computed: {
    ...mapGetters({
      'userInfo': 'userInfo'
    })
  },
  data() {
    return {
      icon: 'play-circle-o',
      link: ''
    }
  },
  methods: {
    handleClick() {
      if(this.userInfo.p == 'ios'){
        if(this.musicUrl.indexOf('.amr') != -1){
          var that = this;
          this.$http.get('/sing/getMp3Link?link='+this.musicUrl).then((res) => {
            if(res.error_code == 0){
              console.log(res.data.link);
              that.link = res.data.link;
              setTimeout(()=>{
                that.start();
              },2000);
              
            }else{
              this.$toast(res.msg);
            }
          });
        }else{
          this.link = this.musicUrl;
          setTimeout(()=>{
            this.start();
          },200)
        }
      }else{
        this.$emit('click')
      }
    },
    start() {
      let aud = this.$refs.aud
      if(aud.paused){
        aud.play()
        this.icon = 'stop-circle-o'
      }else{
        aud.pause()
        this.icon = 'play-circle-o';
      }
    },
    end() {
      this.icon = 'play-circle-o';
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../assets/css/variable';
.btn-play{
  display: inline-flex;
  align-items: center;
  color: #ffec49;
  .img{
    font-size: torem(52);
    vertical-align: middle;
  }
  .text{
    font-size: torem(30);
    margin-left: torem(8);
    margin-top: torem(-3);
  }
}
</style>


