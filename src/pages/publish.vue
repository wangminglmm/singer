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
        <div class="tab-nav-item" :class="{active: tabModel === 1}" @click="tabModel = 1">公开打赏</div>
        <div class="tab-nav-item" :class="{active: tabModel === 2}" @click="tabModel = 2">私密打赏</div>
      </div>
      <div class="tab-content">
        <div class="tab-content-item" :class="{show: tabModel === 1}">
          <div class="song-tip shadow-box" @click="handleSelectSong">
            <template v-if="!publicSelectedSong.songId">
              <div class="tip1">选择歌曲片段</div>
              <div>其他用户演唱成功即可平分赏金</div>
            </template>
            <template v-else>
              <div class="tip1"
              v-for="(item,index) in publicSelectedSong.lyricList"
              :key="index">{{item}}</div>
              <div>《{{publicSelectedSong.songName}}》 {{publicSelectedSong.songAuthor}}</div>
            </template>
            <van-icon name="arrow" class="icon-right" />
          </div>
          <div class="select-con mt20 shadow-box">
            <div class="form-item">
              <div class="label">打赏金额：</div>
              <div class="form-item-con">
                1000金币
              </div>
            </div>
            <div class="form-item">
              <div class="label">参与人数：</div>
              <div class="form-item-con">
                5人
              </div>
            </div>
            <div class="form-item">
              <div class="label">参加者性别：</div>
              <div class="form-item-con">
                <radio-group v-model="publicForm.sex">
                  <radio :name="1">男</radio>
                  <radio :name="0">女</radio>
                  <radio :name="2">不限</radio>
                </radio-group>
              </div>
            </div>
          </div>
        </div>
        <div class="tab-content-item" :class="{show: tabModel === 2}">
          <div class="song-tip shadow-box" @click="handleSelectSong">
            <template v-if="!privateSelectedSong.songId">
              <div class="tip1">选择歌曲片段</div>
              <div>其他用户演唱成功即可平分赏金</div>
            </template>
            <template v-else>
              <div class="tip1"
              v-for="(item,index) in privateSelectedSong.lyricList"
              :key="index">{{item}}</div>
              <div>《{{privateSelectedSong.songName}}》 {{privateSelectedSong.songAuthor}}</div>
            </template>
            <van-icon name="arrow" class="icon-right" />
          </div>
          <div class="select-con mt20 shadow-box">
            <div class="form-item">
              <div class="label">打赏金额：</div>
              <div class="form-item-con">
                <radio-group v-model="privateForm.gold">
                  <radio :name="1000">1000金币</radio>
                  <radio :name="2000">2000金币</radio>
                  <radio :name="5000">5000金币</radio>
                </radio-group>
              </div>
            </div>
            <div class="form-item">
              <div class="label">参与人数：</div>
              <div class="form-item-con">
                <radio-group v-model="privateForm.memberNumber">
                  <radio :name="1">1人</radio>
                  <radio :name="2">2人</radio>
                  <radio :name="4">4人</radio>
                  <radio :name="5">5人</radio>
                </radio-group>
              </div>
            </div>
            <div class="form-item">
              <div class="label">参加者性别：</div>
              <div class="form-item-con">
                <radio-group v-model="privateForm.sex">
                  <radio :name="1">男</radio>
                  <radio :name="0">女</radio>
                  <radio :name="2">不限</radio>
                </radio-group>
              </div>
            </div>
          </div>
          <div class="song-tip mt20 shadow-box" @click="showDialogPassword">
            <div class="tip1">设置密码（{{this.publishPasswrod ? '已设置': '请设置'}}）</div>
            <div>其他用户需输入密码参与悬赏</div>
            <van-icon name="arrow" class="icon-right" />
          </div>
        </div>
      </div>
      <Button type="publish" class="btn-publish" @click="handlePublish">立即发布</Button>
      <dialog-password
        ref="dialogPassword"
        @success="handlePasswordSuccess"></dialog-password>
    </div>
  </div>
</template>
<script>
import Button from '@/components/Button'
import RadioGroup from '@/components/radio-group'
import Radio from '@/components/radio'
import {mapGetters, mapMutations} from 'vuex'
import dialogPassword from '@/components/dialog-password'
export default {
  data() {
    return {
      title: '发布任务',
      tabModel: 1,
      // publicForm: {
      //   sex: 1,
      //   gold: 1000,
      //   memberNumber: 5,
      // },
      // privateForm: {
      //   gold: 1000,
      //   memberNumber: 1,
      //   sex: 1
      // }
    }
  },
  created() {
    this.tabModel = (this.currentPublishType === 'public' ? 1 : 2)
    console.log(this.userInfo)
    let _sex = this.userInfo.sex == 1 ? 0 : 1;
    this.savePublishFrom({
      publicForm:{
        ...this.publicForm,
        sex:_sex,
      },
      privateForm:{
        ...this.privateForm,
        sex:_sex
        }
    })
  },
  computed: {
    ...mapGetters({
      'selectedSong': 'selectedSong',
      'privateSelectedSong': 'privateSelectedSong',
      'publicSelectedSong': 'publicSelectedSong',
      'currentPublishType': 'currentPublishType',
      'publishPasswrod': 'publishPasswrod',
      'publicForm': 'publicForm',
      'privateForm': 'privateForm',
      'userInfo': 'userInfo',
    }),
    postFormData() {
      if (this.currentPublishType === 'public') {
        return {
          ...this.publicForm
        }
      } else {
        return {
          ...this.privateForm,
          password: this.publishPasswrod
        }
      }
    }
  },
  methods: {
    ...mapMutations({
      'changePublishType': 'changePublishType',
      'changePublishPassword': 'changePublishPassword',
      'savePublishFrom': 'savePublishFrom',
      'clearPublicData': 'clearPublicData'
    }),
    onClickLeft() {
      // 清除表单数据
      this.clearPublicData()
      this.$router.push('/');
    },
    handlePublish() {
      let data = {
        songId: this.selectedSong.songId,
        type: this.tabModel,
        ...this.postFormData
      }
      if (!data.songId) {
        return this.$toast('请选择歌曲')
      }
      if (this.currentPublishType === 'private' && !data.password) {
        return this.$toast('请输入密码')
      }
      // todo 请求接口
      console.log(data)
      const toast = this.$toast.loading({
        duration: 0,       // 持续展示 toast
        forbidClick: true, // 禁用背景点击
        loadingType: 'spinner',
        message: '发布中...'
      })
      this.$http.post('/sing/create', data).then((res) => {
        this.$toast(res.msg);
        if(res.error_code == 0){
          setTimeout(() => {
            toast.clear()
            this.onClickLeft() // 成功后调用
          }, 1000)
        }
      })
    },
    handleSelectSong() {
      this.$router.push('/select-song')
      let {publicForm, privateForm} = this
      this.savePublishFrom({
        publicForm: publicForm,
        privateForm: privateForm
      })
    },
    showDialogPassword() {
      this.$refs.dialogPassword.show()
    },
    handlePasswordSuccess(password) {
      this.changePublishPassword(password)
      this.$refs.dialogPassword.hide()
    }
  },
  watch: {
    tabModel(newVal) {
      console.log(newVal)
      let type = newVal == 1 ? 'public' : 'private'
      this.changePublishType(type)
    }
  },
  components: {
    Button,
    RadioGroup,
    Radio,
    dialogPassword
  }
}
</script>
<style scoped lang="scss">
@import "../assets/css/variable";
.container{
   background: url(../assets/images/publish-bg.jpg) no-repeat  center 46px;
   background-size:  100% torem(756);
}
.tabs{
  .tab-nav{
    display: flex;
    justify-content: center;
    margin-top: torem(100);
    .tab-nav-item{
      font-size: torem(42);
      line-height: torem(42);
      height: torem(78);
      color: #fff;
      position: relative;
      &+.tab-nav-item{
        margin-left: torem(230);
      }
      &::before{
        content: '';
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
      &.active{
        color: #ffec4a;
        &::before{
          display: block;
        }
      }
    }
  }
  .tab-content{
    padding: torem(35) torem(60);
    .tab-content-item{
      display: none;
      &.show{
        display: block;
      }
    }
    .song-tip{
      font-size: torem(36);
      color: #cdcbf0;
      position: relative;
      .tip1{
        font-size: torem(42);
        color: #ffffff;
        margin-bottom: torem(5);
      }
    }
    .icon-right{
      position: absolute;
      right: torem(50);
      color: #c3c1ed;
      font-size: torem(50);
      top: 50%;
      transform: translateY(-50%);
    }
    .select-con{
      .form-item{
        display: flex;
        align-items: center;
        font-size: torem(36);
        min-height: torem(100);
        color: #ffffff;
        &+.form-item{
          margin-top: torem(50);
        }
        .label{
          width: torem(230);
        }
        .form-item-con{
          flex: 1;
          overflow: hidden;
        }
      }
    }
  }
}
.mt20{
  margin-top: torem(20);
}
.shadow-box{
  background-color: rgb(111, 104, 216);
  border-radius: torem(60) torem(20) torem(60) torem(20);
  padding: torem(80) torem(60);
  box-shadow: 0px torem(14) torem(10) 0px rgba(85, 65, 162, 0.4),inset 0px torem(23) torem(62) 0px rgba(255, 255, 255, 0.5);
}
.btn-publish{
  margin: torem(130) auto torem(35);
}
</style>


