<template>
    <div class="flow-wrapper">
      <div class="image-flow">
        <div class="image-flow-item-wrapper" v-for="(image, index) in images" :key="image.id">
          <a @click="goDetail(image)" class="image-flow-item touch-me">
            <img v-lazy="thumb(https(image.product_image))" />
            <p class="image-description" v-text="image.product_name"></p>
            <p class="price-field">¥ {{ image.real_price }}  <del>¥{{ image.price }}</del></p>
          </a>
        </div>   
      </div>
      <load-more v-if="!noMorePages && !emptyList" tip="加载中..."></load-more>
      <load-more v-if="requesting" tip="加载中..."></load-more>
      <load-more v-if="noMorePages" :show-loading="false" tip="没有更多啦."></load-more>
      <load-more v-if="emptyList && !requesting" :show-loading="false" tip="oh~ 老板好像忘记进货了."></load-more>
    </div>
</template>

<script>
import { LoadMore } from 'vux';
import loading from '../images/loading';
import { thumb } from '../libs/utils';
export default {
  name: 'productFlow',
  components: {LoadMore},
  props: ['data', 'requesting', 'samePage'],
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
      return this.data.currentPage >= this.data.pages && this.images.length;
    },
    emptyList: function () {
      return this.images.length === 0;
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
    thumb: thumb,
    goDetail: function (image) {
      if (this.samePage) {
        this.$emit('onClick', image.id);
      } else {
        this.$router.push(`/product/${image.id}`);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.image-flow {
  box-sizing: border-box;
  width: 100%;
  background: #f0f0f0;
  text-align: left;
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