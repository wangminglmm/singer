import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    userInfo: { // 用户信息
      sex: '',
      nickName: '',
      u: '',
      p: '',
      v: '',
    },
    privateSelectedSong: {},
    publicSelectedSong: {},
    currentPublishType: 'public',
    publishPasswrod: '',
    publicForm: {
      gold: 1000,
      memberNumber: 5,
      sex: 1
    },
    privateForm: {
      gold: 1000,
      memberNumber: 1,
      sex: 1
    }
  },
  mutations: {
    setSelectSong (state, song) {
      let currentPublishType = state.currentPublishType
      state[`${currentPublishType}SelectedSong`] = song
    },
    changePublishType(state, type) {
      state.currentPublishType = type
    },
    changePublishPassword(state, publishPasswrod) {
      state.publishPasswrod = publishPasswrod
    },
    savePublishFrom(state, {publicForm, privateForm}) {
      Object.keys(state.publicForm).forEach(key => {
        state.publicForm[key] = publicForm[key]
      })
      Object.keys(state.privateForm).forEach(key => {
        state.privateForm[key] = privateForm[key]
      })
    },
    clearPublicData(state) {
      state.publicForm = {
        sex: 1
      }
      state.privateForm = {
        gold: 1000,
        memberNumber: 1,
        sex: 1
      }
      state.privateSelectedSong = {}
      state.publicSelectedSong = {},
      state.currentPublishType = 'public',
      state.publishPasswrod = ''
    },
    setUserInfo(state, obj = {}) {
      Object.keys(obj).forEach(key => {
        state.userInfo[key] = obj[key]
      })
    }
  },
  getters: {
    selectedSong(state) {
      let currentPublishType = state.currentPublishType
      return state[`${currentPublishType}SelectedSong`]
    },
    currentPublishType(state) {
      return state.currentPublishType
    },
    publicSelectedSong(state) {
      return state.publicSelectedSong
    },
    privateSelectedSong(state) {
      return state.privateSelectedSong
    },
    publishPasswrod(state) {
      return state.publishPasswrod
    },
    publicForm(state) {
      return state.publicForm
    },
    privateForm(state) {
      return state.privateForm
    },
    userInfo(state) {
      return state.userInfo
    }
  }
})
export default store
