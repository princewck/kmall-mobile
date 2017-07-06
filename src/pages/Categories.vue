<template>
  <div>
    <x-header :left-options="{backText: '返回', preventGoBack: true}" transition="all 1s ease-in" style="background: #f73c6f;flex:0 0 auto;" @on-click-back="goBack">商品分类</x-header>
    <CategoryFlow></CategoryFlow>
  </div>
</template>

<script>
import { XHeader } from 'vux';
import { ProductFlow, CategoryFlow } from '../components';
export default {
  name: 'categories',
  components: {
    ProductFlow,
    CategoryFlow,
    XHeader
  },
  methods: {
    goBack() {
      this.$router.replace('/');
    }
  }
}
</script>
