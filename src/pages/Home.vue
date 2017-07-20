<template>
  <div>
    <router-view></router-view>
    <k-drawer v-show="routeName == 'home'" title="商品分类" placement="left" :show="showDrawer" @toggle="toggleDrawer">
      <div class="home-wrapper">
        <app-header @click="toggleDrawer"></app-header>
        <div class="main-content">
          <nav-buttons :buttons="navButtons"></nav-buttons>
          <div class="home-banner-container">
            <swiper class="home-banner" :aspect-ratio="300/800" :auto="true">
              <swiper-item class="swiper-item-img" v-for="(item, index) in imageList" :key="index">
                <a :href="item.m_link" target="_blank"><img :src="item.image"></a>
              </swiper-item>
            </swiper>
          </div>
          <block-group v-for="(group, index) in groups" :key="index" :data="group"></block-group>
          <p class="recommend">精彩推荐</p>
          <product-flow :data="pList" @load="loadMoreImgs" :same-page="true" @onClick="clickProduct" container=".main-content"></product-flow>
        </div>
      </div>
      <div slot="drawer-content">
        <CategoryFlow></CategoryFlow>
      </div>
    </k-drawer>
  </div>
</template>

<script>
import { AppHeader, NavButtons, BlockGroup, ProductFlow, KDrawer, CategoryFlow } from '../components';
import { Swiper, SwiperItem, Flexbox, FlexboxItem } from 'vux';
import imgAll from '../images/all.png';
import imgBrands from '../images/brands.jpg';
import imgCoupons from '../images/coupons.jpg';
import imgPromotion from '../images/activity.jpg';
export default {
  data() {
    var vm = this;
    return {
      navButtons: [
        {
          img: imgAll,
          title: '全部分类',
          onClick: vm.toggleDrawer
        },
        {
          img: imgBrands,
          title: '品牌专区',
          onClick: vm.goBrands
        },
        {
          img: imgCoupons,
          title: '好券搜索',
          onClick: vm.goCoupons
        },
        {
          img: imgPromotion,
          title: '限时抢购',
          onClick: ()=>{alert('敬请期待……')}
        },
      ],
      imageList: [],
      groups: [],
      pList: { data: [], currentPage: 0 },
      showDrawer: false,
      routeName: this.$route.name
    }
  },
  mounted: function () {
    var self = this;
    self.fetchList();
    self.fetchBanners();
    self.fetchBlockGroups();
  },
  methods: {
    fetchBlockGroups() {
      let vm = this;
      fetch('/api/web/blockGroup')
        .then(res => res.json())
        .then(({data}) => {
          vm.$set(vm, 'groups', data)
        });
    },
    fetchBanners() {
      let vm = this;
      fetch('/api/web/banners')
        .then(res => res.json())
        .then(({data}) => {
          vm.$set(vm, 'imageList', data.filter(item => item.mobile));
        });
    },
    loadMoreImgs: function (data) {
      this.fetchList(data.page).then(() => {
        setTimeout(data.termLoading, 2000);
      });
    },
    fetchList: function (page = 1) {
      let vm = this;
      return fetch(`/api/web/products/promotions/${page}`)
        .then(res => (res.json()))
        .then(({data}) => {
          let newList = Object.assign(vm.pList, {
            pages: data.pages,
            currentPage: data.currentPage,
            total: data.total,
            data: vm.pList.data.concat(data.data)
          });
          vm.$set(vm, 'pList', newList);
        });
    },
    toggleDrawer: function () {
      this.$set(this, 'showDrawer', !this.showDrawer);
    },
    goBrands() {
      this.$router.push('brands');
    },
    goCoupons() {
      this.$router.push('coupons');
    },
    clickProduct(productId) {
      this.$router.push(`/detail/${productId}`);
    }
  },
  components: {
    AppHeader,
    Swiper,
    SwiperItem,
    Flexbox,
    FlexboxItem,

    NavButtons,
    BlockGroup,
    ProductFlow,
    KDrawer,
    CategoryFlow
  }
}
</script>

<style lang="scss">
.home-wrapper {
  width: 100%;
  height: 100%;
  overflow-y: auto;
}

.main-content {
  background: #f5f5f5;
  position: absolute;
  height: 1px;
  top: 0;
  left: 0;
  width: 100%;
  padding-top: 145px;
  .recommend {
    line-height: 1.5rem;
    font-size: 1rem;
    color: green;
    margin: 15px 0 10px 0;
  }
  .home-banner-container {
    width: 100%;
    box-sizing: border-box;
    padding: 2px;
    .home-banner {
      width: 100%;
      .swiper-item-img {
        img {
          width: 100%;
        }
      }
    }
  }
}
</style>
