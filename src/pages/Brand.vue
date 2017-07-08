<template>
  <div class="brand-list">
    <x-header :left-options="{backText: '返回', preventGoBack: true}" transition="all 1s ease-in" style="background: #f73c6f;flex:0 0 auto;" @on-click-back="goBack">
      品牌列表</x-header>
    <grid>
      <grid-item :label="brand.name" :link="`/brand/collection/${brand.id}`" v-for="(brand, index) in brands" :key="brand.id">
        <img slot="icon" :src="brand.$logo">
      </grid-item>
    </grid>
  </div>
</template>

<script>
import { Grid, GridItem, XHeader } from 'vux';
export default {
  name: 'brand-list',
  components: {
    Grid,
    GridItem,
    XHeader
  },
  data() {
    return {
      brands: []
    }
  },
  mounted: function () {
    let vm = this;
    fetch('/api/web/brands')
      .then((res) => res.json())
      .then(({ data }) => {
        data.forEach((brand) => {
          let logos = JSON.parse(brand.image)['logos'];
          let logo = logos.length ? logos[0] : '../images/product_demo.jpg';
          brand.$logo = logo;
        });
        vm.$set(vm, 'brands', data);
      });
  },
  methods: {
    goBack() {
      history.length > 1
        ? (this.$router.go(-1))
        : (this.$router.replace('/'));
    },
    goCollection(id) {
      this.$router.replace(`/brand/collection/${id}`);
    }
  }

}
</script>

<style lang="scss" scoped>
.brand-list {
  a {
    text-decoration: none;
  }
}
</style>
