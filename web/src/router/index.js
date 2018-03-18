import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import AddCommunity from '@/components/AddCommunity'
import AddBuilding from '@/components/AddBuilding'
import AddHouse from '@/components/AddHouse'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/addCommunity',
      name: 'addCommunity',
      component: AddCommunity
    },
    {
      path: '/addBuilding',
      name: 'addBuilding',
      component: AddBuilding
    },
    {
      path: '/addHouse',
      name: 'addHouse',
      component: AddHouse
    }
  ]
})
