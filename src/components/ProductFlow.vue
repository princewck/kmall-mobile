<template>
    <div class="flow-wrapper">
      <div class="image-flow">
        <div class="image-flow-item-wrapper" v-for="(image, index) in images" :key="image.id">
          <a @click="goDetail(image)" class="image-flow-item touch-me">
            <x-img v-square :default-src="loadingHolder" :src="image.product_image" :offset="100" :container="container"></x-img>
            <p class="image-description" v-text="image.product_name"></p>
            <p class="price-field">¥ {{ image.real_price }}  <del>¥{{ image.price }}</del></p>
          </a>
        </div>   
      </div>
      <load-more v-if="!noMorePages" tip="加载中..."></load-more>
      <load-more v-if="noMorePages" :show-loading="false" tip="没有更多啦."></load-more>
    </div>
</template>

<script>
import { XImg, LoadMore } from 'vux';
import loading from '../images/loading';
export default {
  name: 'productFlow',
  components: {XImg, LoadMore},
  props: ['data'],
  data() {
    let vm = this;
    return {
      loading: false,
      loadingHolder: loading,
      container: vm.container
    }
  },
  computed: {
    images: function() {
      console.log(this.data);
      return this.data.data;
    },
    pagination: function() {
      return {
        currentPage: this.data.currentPage,
        pages: this.data.pages,
        total: this.data.total
      }
    },
    noMorePages: function() {
      return this.data.currentPage >= this.data.pages;
    }
  },
  mounted: function() {
    var throttle = null;
    var vm = this;
    function load() {
      var p = vm.pagination;
      var current = Number(p.currentPage);
      var total = Number(p.pages);
      if (vm.loading) return;
      vm.$set(vm, 'loading', true);
      if (current == 0 || current < total) {
        vm.$emit('load', {page: current+1, termLoading: () => {vm.$set(vm, 'loading', false)} });
      }
    }
    function handler() {
      if (this.loading || !this.images.length) return;
      var offsetBottom = document.body.scrollHeight - (document.body.scrollTop + window.innerHeight);
      if(offsetBottom < 500) {
        throttle && clearTimeout(throttle);
        throttle = setTimeout(load, 200);
      }
    }
    document.addEventListener('scroll', handler);
  },
  methods: {
    goDetail: function (image) {
      this.$router.push(`/product/${image.id}`);
    }
  }
}
</script>

<style lang="scss" scoped>
.image-flow {
  box-sizing: border-box;
  width: 100%;
  background: #f0f0f0;
  .image-flow-item-wrapper {
    box-sizing: border-box;
    display: inline-block;
    width: 50%;
    border: none;
    padding: 5px;
    padding: 10px;
    &:nth-of-type(odd) {
      padding: 5px 5px 5px 10px;
    }
    &:nth-of-type(even) {
      padding: 5px 10px 5px 5px;
    }
    .image-flow-item {
      background: #fff;
      box-shadow: 0 0 1px #cecece;
      width: 100%;
      border: 1px solid #f5f5f5;
      display: block;
      box-sizing: border-box;
      text-align: left;
      padding: 5px;
      img {
        width: 100%;
        height: auto;
      }
      p {
        padding: 0;
        margin: 0;
      }
      .image-description {
        line-height: 1.2em;
        font-size: .6em;
        font-weight: bold;
        height: 2.4em;
        overflow:hidden;
        text-align: left;
        padding: 0 5px;
      }
      .price-field {
        line-height:1.4em;
        font-size: 1.2em;
        text-indent: 5px;
        color: #c40000;
        del {
          text-descoration: line-through;
          color: gray;
          font-size: .8em;
        }
      }
    }    
  }
}

</style>