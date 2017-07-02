import Vue from 'vue'
import Router from 'vue-router'
import { Home, ProductDetail, Search } from '@/pages'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/product/:id',
      name: 'ProductDetail',
      component: ProductDetail
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    }
  ]
})
