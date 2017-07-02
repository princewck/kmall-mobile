<template>
  <div class="detail-wrapper">
    <x-header :left-options="{backText: '返回', preventGoBack: true}" transition="all 1s ease-in" style="background: #f73c6f;flex:0 0 auto;" @on-click-back="goBack">商品详情</x-header>
    <div class="detail-content">
      <div class="wechat-hint" v-if="isWechat">
        <span>您使用的是微信浏览器，由于微信屏蔽了淘宝链接，为了更好的浏览和购物体验，请点击右上角菜单选择在手机浏览器或者支付宝中打开以支持唤起app购买。</span>
      </div>
      <img :src="img.product_image">
      <p class="price-row">
        <span class="real-price" v-text="prehandlePrice(img.real_price)"></span>
        <span v-if="img.coupon_price > 0 ">(使用本网内部优惠券后)</span>
      </p>
      <p class="desc-row" v-text="img.product_name"></p>
      <p class="sub-desc">
        <span class="origin-price">官方价: ¥
          <span :class="{del: img.coupon_price > 0}" v-text="prehandlePrice(img.price)"></span>
        </span>
        <span class="sold">月销量:
          <span v-text="img.monthly_sold"> 件 </span>
        </span>
      </p>
      <div class="coupon">
        <a :href="img.coupon_link">
          <span class="coupon-desc"></span>
          <span class="tap-text">立即领券</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { XHeader } from 'vux';
import { isWechat } from '../libs/utils';
import loading from '../images/loading';
export default {
  name: 'product-detail',
  components: { XHeader },
  data() {
    return {
      img: {product_image: loading}
    }
  },
  mounted: function () {
    var pid = this.$route.params.id;
    this.load(pid);
    this.$router.beforeEach((to, from, next) => {
      next();
    });
  },
  computed: {
    isWechat: function () {
      return isWechat();
    }
  },
  methods: {
    load(id) {
      let vm = this;
      fetch(`/api/web/product/${id}`).then(res => (res.json()))
        .then(({ data }) => {
          vm.$set(vm, 'img', data);
        });
    },
    goBack() {
      history.length > 1
        ? (this.$router.go(-1))
        : (this.$router.replace('/'));
    },
    prehandlePrice(price) {
      return Number(price) ? Number(price).toFixed(1) : '0.0';
    }
  }
}
</script>


<style lang="scss" scoped>
.detail-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .detail-content {
    flex: auto;
    overflow: auto;
    text-align: center;
    .wechat-hint {
      text-align: left;
      background: yellow;
      color: #c40000;
      font-size: 0.5rem;
      line-height: 1rem;
      padding: 5px;
    }    
    img {
      border: 1px solid #f5f5f5;
      margin-top: 10px;
      display: inline-block;
      width: 75%;
    }
    p {
      padding: 0 25px;
      text-align: left;
    }
    .desc-row {
      line-height: 1.2rem;
      font-size: .9rem;
      font-weight: bold;
    }
    .price-row {
      .real-price {
        font-size: 2rem;
        color: #c40000;
        font-weight: normal;
        &::before {
          content: '¥'
        }
      }
      span {
        font-size: .5rem;
        color: #c40000;
        font-weight: lighter;
      }
    }
    .sub-desc {
      font-size: .8rem;
      color: #c0c0c0;
      overflow: auto;
      padding-bottom: 20px;
      .origin-price {
        float: left;
        font-size: 1.2rem;
        .del {
          text-decoration: line-through;
        }
      }
      .sold {
        float: right;
      }
    }
    .coupon {
      border-top: 1px solid #f5f5f5;
      text-align: center;
      background-image: linear-gradient(to right, #f73c6f 0%,  #c52251 100%);
      position: relative;
      padding: 10px 30px;
      &::before {
        content: '内部优惠领取';
        margin-top: -16px;
        display: block;
        background: rgb(247, 60, 111);
        border-radius: 15px;
        color: #fff;
        width: 100px;
        margin-left: auto;
        margin-right: auto;
      }
      a {
        display: -webkit-box;
        margin: auto auto;
        width: 300px;
        height: 113px;
        background-image: url('../images/coupon.png');
        background-size: cover;
        text-decoration: none;
        margin-top: 15px;
      }
    }
  }
}
</style>
