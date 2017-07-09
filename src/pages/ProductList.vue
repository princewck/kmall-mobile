<template>
  <div>
    <x-header :left-options="{backText: '返回', preventGoBack: true}" transition="all 1s ease-in" style="background: #f73c6f;flex:0 0 auto;" @on-click-back="goBack">{{ categoryName }}</x-header>
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
  name: 'product-list',
  components: {
    XHeader,
    ProductFlow,
    Breadcrumb
  },
  data() {
    return {
      pList: { data: [], currentPage: 0 },
      groupName: null,
      categoryName: null,
      showDrawer: false,
      requesting: false
    }
  },
  computed: {
    navs() {
      let routeParams = this.$route.params;
      let categoryId = routeParams.categoryId;
      let groupId = routeParams.groupId;
      var vm = this;
      if (!this.groupName) {
        fetch(`/api/web/categoryGroup/${groupId}`).then((res) => res.json())
          .then(({ data }) => {
            vm.groupName = data.name;
            data.categories.forEach(c => {
              if (c.id == categoryId)
                vm.categoryName = c.name;
            });
          });
      }
      return [
        {
          text: '全部商品',
          onClick: function () {
            vm.$router.replace('/categories');
          }
        },
        {
          text: vm.groupName,
        },
        {
          text: vm.categoryName
        }
      ]
    }
  },
  mounted() {
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
      let categoryId = routeParams.categoryId;
      let groupId = routeParams.groupId;
      let params = {
        brandIds: [],
        categoryIds: [],
        groupId: 0,
        kwd: ''
      };
      categoryId && (params.categoryIds = [String(categoryId)]);
      groupId && (params.groupId = String(groupId));
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

