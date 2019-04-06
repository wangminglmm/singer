import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home'
const Join = () => import('@/pages/join')
const Publish = () => import('@/pages/publish')
const SelectSong = () => import('@/pages/select-song')
const SearchSong = () => import('@/pages/search-song')
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/join',
      name: 'Join',
      component: Join
    },
    {
      path: '/publish',
      name: 'Publish',
      component: Publish
    },
    {
      path: '/select-song',
      name: 'SelectSong',
      component: SelectSong
    },
    {
      path: '/search-song',
      name: 'SearchSong',
      component: SearchSong
    }
  ]
})
