import Vue from 'vue'
import Router from 'vue-router'
import { Home, ProductDetail, Search, Brand, ProductList, Categories, BrandCollection, SearchResult } from '@/pages'

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
    },
    {
      path: '/brands',
      name: 'Brand',
      component: Brand
    },
    {
      path: '/products/:groupId/:categoryId',
      name: 'ProductList',
      component: ProductList
    },
    {
      path: '/brand/collection/:brandId',
      name: 'BrandCollection',
      component: BrandCollection
    },
    {
      path: '/query/:query',
      name: 'SearchResult',
      component: SearchResult
    },    
    {
      path: '/categories',
      name: 'Categories',
      component: Categories
    }    
  ]
})
