<template>
  <div>
    <x-header :left-options="{backText: '返回', preventGoBack: true}" transition="all 1s ease-in" style="background: #f73c6f;flex:0 0 auto;" @on-click-back="goBack">{{ brandName }}</x-header>
    <Breadcrumb :navs="navs" @onClick="clickBreadcrumb"></Breadcrumb>
    <div class="product-flow-wrapper">
      <product-flow :data="pList" :requesting="requesting" @load="loadMore" :dely="300" container=".product-flow-wrapper"></product-flow>
    </div>
  </div>
</template>

<script>
import { XHeader } from 'vux';
import { ProductFlow, Breadcrumb } from '../components';
export default {
  name: 'brand-collection',
  components: {
    XHeader,
    ProductFlow,
    Breadcrumb
  },
  data() {
    return {
      pList: { data: [], currentPage: 0 },
      brandName: null,
      showDrawer: false,
      requesting: false
    }
  },
  computed: {
    navs() {
      var vm = this;
      return [
        {
          text: '全部商品',
          onClick: function () {
            vm.$router.replace('/categories');
          }
        },
        {
          text: '全部品牌',
          onClick: function () {
            vm.$router.replace('/brands');
          }
        },
        {
          text: vm.brandName,
        }
      ]
    }
  },
  mounted() {
    var vm = this;
    let routeParams = this.$route.params;
    let brandId = routeParams.brandId;
    if (!this.brandName) {
      fetch(`/api/web/brand/${brandId}`).then((res) => res.json())
        .then(({ data }) => {
          vm.brandName = data.name;
        });
    }
    this.init();
  },
  methods: {
    init() {
      this.fetchProducts(1);
    },
    goBack() {
      history.length > 1
        ? (this.$router.go(-1))
        : (this.$router.replace('/'));
    },
    loadMore(data) {
      this.fetchProducts(data.page).then(() => {
        setTimeout(data.termLoading, 2000);
      });
    },
    fetchProducts(page = 1) {
      let vm = this;
      let routeParams = this.$route.params;
      let brandId = routeParams.brandId;
      let params = {
        brandIds: [brandId],
        categoryIds: [],
        groupId: 0,
        kwd: ''
      };
      vm.$set(vm, 'requesting', true);
      fetch(`/api/web/products/query/p/${page}`, {
        method: 'POST',
        body: JSON.stringify(params),
        headers: { 'Content-Type': 'application/json', }
      })
        .then(res => res.json())
        .then(({ data }) => {
          vm.$set(vm, 'requesting', false);
          let newList = Object.assign(vm.pList, {
            pages: data.pages,
            currentPage: data.currentPage,
            total: data.total,
            data: vm.pList.data.concat(data.data)
          });
          vm.$set(vm, 'pList', newList);
        });
    },
    clickBreadcrumb(nav) {
      if (nav.link) return this.$route.push(nav.link);
      if (nav.onClick) return nav.onClick();
    }
  }
}
</script>

<style lang="scss">

</style>

