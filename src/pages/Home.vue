<template>
  <div>
    <k-drawer title="商品分类" placement="left" :show="showDrawer" @toggle="toggleDrawer">
      <div class="home-wrapper">
        <app-header @click="toggleDrawer"></app-header>
        <div class="main-content">
          <nav-buttons :buttons="navButtons"></nav-buttons>
          <div class="home-banner-container">
            <swiper class="home-banner" :aspect-ratio="300/800" :auto="true">
              <swiper-item class="swiper-item-img" v-for="(item, index) in imageList" :key="index">
                <img :src="item">
              </swiper-item>
            </swiper>
          </div>
          <block-group v-for="(group, index) in groups" :key="index" :data="group"></block-group>
          <p class="recommend">精彩推荐</p>
          <product-list :data="pList" @load="loadMoreImgs"></product-list>
        </div>
      </div>
      <div slot="drawer-content">
        <CategoryFlow></CategoryFlow>
      </div>
    </k-drawer>
  </div>
</template>

<script>
import { AppHeader, NavButtons, BlockGroup, ProductList, KDrawer, CategoryFlow } from '../components';
import { Swiper, SwiperItem, Flexbox, FlexboxItem } from 'vux';
export default {
  data() {
    var vm = this;
    return {
      navButtons: [
        {
          img: 'https://gw.alicdn.com/tfs/TB11OCuRpXXXXaBXFXXXXXXXXXX-230-230.png?avatar=1',
          title: '全部分类',
          onClick: vm.toggleDrawer
        },
        {
          img: 'https://gw.alicdn.com/tfs/TB1OaIwRXXXXXapXpXXXXXXXXXX-230-230.png?avatar=1',
          title: '品牌专区'
        },
        {
          img: 'https://gw.alicdn.com/tfs/TB1I9ApRXXXXXcGXpXXXXXXXXXX-230-230.png?avatar=1',
          title: '好券直播'
        },
        {
          img: 'https://gw.alicdn.com/tfs/TB1NTkrRXXXXXcKXpXXXXXXXXXX-230-230.png?avatar=1',
          title: '个人中心'
        },
      ],
      imageList: [
        'https://static.vux.li/demo/1.jpg',
        'https://static.vux.li/demo/2.jpg'
      ],
      groups: [
        { "list": [{ "sort": 0, "title": "包包", "description": "包包", "link": "http://quanerdai.com/#!/products/g/22/c/36&37&39&40/b//kw//p/1", "image": "http://princewck.oss-cn-shanghai.aliyuncs.com/img/41bd65b28bf74b50aea13b32e4fb76da" }, { "sort": 0, "title": "美食", "description": "美食", "link": "http://quanerdai.com/#!/products/g/33/c//b//kw//p/0", "image": "http://princewck.oss-cn-shanghai.aliyuncs.com/img/a7e0bec6dc264578a08c9db99314feb0" }, { "sort": 0, "title": "化妆品", "description": "化妆品", "link": "http://quanerdai.com/#!/products/g/23/c//b//kw//p/", "image": "http://princewck.oss-cn-shanghai.aliyuncs.com/img/1b5d0710aaca48fd9af4ea61e0dc8c07" }, { "sort": 0, "title": "手机数码", "description": "手机数码", "link": "http://quanerdai.com/#!/products/g/25/c//b//kw//p/", "image": "http://princewck.oss-cn-shanghai.aliyuncs.com/img/f503e4d7b37747e395300239c37f5250" }, { "sort": 0, "title": "鞋子", "description": "鞋子", "link": "http://quanerdai.com/#!/products/g/22/c/34&35/b//kw//p/1", "image": "http://princewck.oss-cn-shanghai.aliyuncs.com/img/c5a0a5dd1d6241deb64f84a8c27b42bc" }, { "sort": 0, "title": "衣服", "description": "流行女装", "link": "http://quanerdai.com/#!/products/g/20/c/15&16&17&18&19&20&25/b//kw//p/1", "image": "http://princewck.oss-cn-shanghai.aliyuncs.com/img/924f47fd86f44b23b040796337c1cebe" }], "name": "活动专区" }],
      pList: { data: [], currentPage: 0 },
      showDrawer: false
    }
  },
  mounted: function () {
    // var self = this;
    // self.fetchList();
  },
  methods: {
    loadMoreImgs: function (data) {
      this.fetchList(data.page).then(() => {
        setTimeout(data.termLoading, 2000);
      });
    },
    fetchList: function (page = 1) {
      let vm = this;
      return fetch(`/api/web/products/promotions/${page}`)
        .then(res => (res.json()))
        .then(data => {
          let newList = Object.assign(vm.pList, {
            pages: data.data.pages,
            currentPage: data.data.currentPage,
            total: data.data.total,
            data: vm.pList.data.concat(data.data.data)
          });
          vm.$set(vm, 'pList', newList);
        });
    },
    toggleDrawer: function () {
      this.$set(this, 'showDrawer', !this.showDrawer);
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
    ProductList,
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
