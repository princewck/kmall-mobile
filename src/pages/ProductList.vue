<template>
  <div>
    <x-header :left-options="{backText: '返回', preventGoBack: true}" transition="all 1s ease-in" style="background: #f73c6f;flex:0 0 auto;" @on-click-back="goBack">{{ categoryName }}</x-header>
    <Breadcrumb :navs="getNavs()"></Breadcrumb>
    <div class="product-flow-wrapper">
      <product-flow :data="pList" @load="loadMore" :dely="300" container=".product-flow-wrapper"></product-flow>
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
      categoryName: null
    }
  },
  computed: {
    // categoryName: function () {
    //   return '商品列表';
    //   // return this.$route.params.categoryName || '商品列表';
    // }
  },
  mounted() {
    this.fetchProducts();
  },
  methods: {
    getNavs() {
      let routeParams = this.$route.params;
      let categoryId = routeParams.categoryId;
      let groupId = routeParams.groupId;
      var vm = this;
      if (!this.groupName) {
        fetch(`/api/web/categoryGroup/${groupId}`).then((res) => res.json())
          .then(({data}) => {
            console.log(data);
            vm.groupName = data.name;
            data.categories.forEach(c => {
              if (c.id == categoryId ) 
                vm.categoryName = c.name;
            });
          });
      }
      return [
        {
          text: '全部商品'
        },
        {
          text: vm.groupName,
        },
        {
          text: vm.categoryName
        }
      ]
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
      categoryId && (params.categoryIds = [categoryId]);
      groupId && (params.groupId = groupId);
      fetch(`/api/web/products/query/p/${page}`, {
        method: 'POST',
        body: JSON.stringify(params)
      })
        .then(res => res.json())
        .then(({ data }) => {
          console.log(data);
          let newList = Object.assign(vm.pList, {
            pages: data.pages,
            currentPage: data.currentPage,
            total: data.total,
            data: vm.pList.data.concat(data.data)
          });
          console.log(newList);
          vm.$set(vm, 'pList', newList);
        });
    }
  }
}
</script>

<style lang="scss">

</style>

