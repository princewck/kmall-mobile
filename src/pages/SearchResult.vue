<template>
  <div>
    <x-header :left-options="{backText: '返回', preventGoBack: true}" transition="all 1s ease-in" style="background: #f73c6f;flex:0 0 auto;" @on-click-back="goBack">"{{ query }}"的搜索结果</x-header>
    <Breadcrumb :navs="navs" @onClick="clickBreadcrumb"></Breadcrumb>
    <div class="product-flow-wrapper">
      <product-flow :data="pList" :requesting="loading" @load="loadMore" :dely="300" container=".product-flow-wrapper"></product-flow>
    </div>
  </div>
</template>

<script>
import { XHeader } from 'vux';
import { ProductFlow, Breadcrumb } from '../components';
export default {
  name: 'search-result',
  components: {
    XHeader,
    ProductFlow,
    Breadcrumb
  },
  data() {
    return {
      pList: { data: [], currentPage: 0 },
      query: null,
      showDrawer: false,
      loading: false
    }
  },
  computed: {
    navs() {
      var vm = this;
      return [
        {
          text: '首页',
          onClick: function () {
            vm.$router.replace('/');
          }
        },
        {
          text: '商品搜索',
          onClick: function () {
            vm.$router.replace('/search');
          }
        },
        {
          text: vm.query,
        }
      ]
    }
  },
  mounted() {
    var vm = this;
    let routeParams = this.$route.params;
    let query = routeParams.query;
    vm.query = query;
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
        setTimeout(data.termLoading, 1000);
      });
    },
    fetchProducts(page = 1) {
      let vm = this;
      let routeParams = this.$route.params;
      let query = routeParams.query;
      let params = {
        brandIds: [],
        categoryIds: [],
        groupId: 0,
        kwd: query
      };
      vm.$set(vm, 'loading', true);
      return fetch(`/api/web/products/query/p/${page}`, {
        method: 'POST',
        body: JSON.stringify(params),
        headers: { 'Content-Type': 'application/json', }
      })
        .then(res => res.json())
        .then(({ data }) => {
          vm.$set(vm, 'loading', false);
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

