<template>
  <x-header :left-options="{backText: '返回'}" transition="all 1s ease-in" style="background: #f73c6f;">商品详情</x-header>
</template>

<script>
import { XHeader } from 'vux';
export default {
  name: 'product-detail',
  components: { XHeader }
}
</script>


<style lang="scss" scoped>
  @mixin white {
    color: #fff !important;
  }

  .vux-header-left {
    .vux-header-back {
      @include white;
    }
    .left-arrow {
      @include white;
    }
  }
</style>
