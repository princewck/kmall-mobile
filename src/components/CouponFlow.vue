<template>
  <div class="flow-wrapper">
    <div class="image-flow">
      <div class="image-flow-item-wrapper" v-for="(coupon, index) in data" :key="coupon.num_iid">
        <a @click="goDetail(coupon, $event)" class="image-flow-item touch-me">
          <x-img v-square :default-src="loadingHolder" :src="coupon.pict_url" :offset="100" :container="container"></x-img>
          <p class="image-description" v-text="coupon.title"></p>
          <p class="product-info">
            淘宝价：<del>¥ {{ prepPrice(coupon.zk_final_price) }} </del>
            <span class="month-sold">月销:{{ coupon.volume }}</span>
          </p>
          <p class="price-field">¥{{ prepPrice(coupon.zk_final_price - getCouponPrice(coupon.coupon_info)) }}</p>
        </a>
      </div>
    </div>
    <load-more v-if="!noMorePages && !emptyList" tip="加载中..."></load-more>
    <load-more v-if="requesting" tip="加载中..."></load-more>
    <load-more v-if="!emptyList && noMorePages && !requesting" :show-loading="false" tip="没有更多啦."></load-more>
    <load-more v-if="emptyList && !requesting" :show-loading="false" tip="未查到相关优惠券，换关键词搜搜看."></load-more>
  </div>
</template>

<script>
/**
 * 和ProductFlow的区别在于，这里无法获取页数信息，所以要多掉一次接口确认是否有更多数据，no-more-pages由父组建决定。
 * **/
import { XImg, LoadMore } from 'vux';
import loading from '../images/loading';
export default {
  name: 'couponFlow',
  components: { XImg, LoadMore },
  props: ['data', 'requesting', 'noMorePages', 'kw'],
  data() {
    let vm = this;
    return {
      loading: false,
      loadingHolder: loading,
      container: vm.container,
      lastClick: null
    }
  },
  computed: {
    images: function () {
      return this.data.data;
    },
    pagination: function () {
      return {
        currentPage: this.data.currentPage,
        pages: this.data.pages,
        total: this.data.total
      }
    },
    emptyList: function () {
      return this.data.length === 0;
    }
  },
  mounted: function () {
    var throttle = null;
    var vm = this;
    function handler() {
      if (this.loading || !this.images.length) return;
      var offsetBottom = document.body.scrollHeight - (document.body.scrollTop + window.innerHeight);
      if (offsetBottom < 500) {
        throttle && clearTimeout(throttle);
        throttle = setTimeout(() => {
          vm.$emit('load');
        }, 200);
      }
    }
    document.addEventListener('scroll', handler);
  },
  methods: {
    goDetail: function (coupon, event) {
      var kw = encodeURIComponent(coupon.title);
      var id = coupon.num_iid;
      this.$set(this, 'lastClick', event.target);
      this.$router.push(`/coupons/detail/${kw}/${id}`);
    },
    getCouponPrice(desc) {
      if (!desc) return '';
      var nums = desc.match(/\d+/g);
      if (nums && nums.length) {
        return nums.reverse()[0];
      }
      return '';
    },
    prepPrice(price) {
      return Number(price).toFixed(1);
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
        overflow: hidden;
        text-align: left;
        padding: 0 5px;
      }
      .product-info {
        color: gray;
        font-size: .8em;
        text-indent: 5px;
        del {
          text-decoration: line-through;
        }
        .month-sold {
          float: right;
          font-size: .6rem;
          color: gray;
        }
      }
      .price-field {
        line-height: 1.4em;
        font-size: 1.2em;
        text-indent: 5px;
        color: #c40000;
        overflow: auto;
      }
    }
  }
}
</style>