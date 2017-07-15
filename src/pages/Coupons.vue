<template>
  <div>
    <x-header :left-options="{backText: '返回', preventGoBack: true}" transition="all 1s ease-in" style="background: #f73c6f;flex:0 0 auto;" @on-click-back="goBack">人气好券</x-header>
    <div>
      <coupon-flow  :data="list" :kw="kw" :no-more-pages="noMorePages" @load="loadMore"  :requesting="requesting"></coupon-flow>
    </div>
  </div>
</template>

<script>
import { XHeader } from 'vux';
import { CouponFlow } from '../components';
export default {
  components: {
    XHeader,
    CouponFlow
  },
  mounted() {
    this.fetchCoupons();
  },
  data() {
    return {
      list: [],
      noMorePages: true,//API约定了，指定关键词时最多只有一页100条数据
      requesting: false,
      kw: '男装',
      page: 0
    }
  },
  methods: {
    fetchCoupons() {
      var vm = this;
      vm.$set(this, 'requesting', true);
      fetch(`/api/web/nice_coupons/${this.kw}/${this.page+1}`)
        .then(res => res.json())
        .then(({results}) => {
          console.log(results.tbk_coupon);
          vm.$set(this, 'list', vm.list.concat(results.tbk_coupon));
          vm.$set(this, 'page', vm.page+1);
          vm.$set(this, 'requesting', false);
        });
    },
    goBack() {
      this.$router.replace('/');
    },
    loadMore() {

    }
  },
  watch: {
    kw() {
      console.log('搜索词发生变化，从第一页开始显示');
      this.page = 0;
    }
  }
}
</script>

<style lang="sass">

</style>
