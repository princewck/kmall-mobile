<template>
  <drawer :show="show" class="category-drawer" :class="{noscroll: show}" @update:show="toggleDrawer" placement="left" :drawer-style="{background: '#f5f5f5', width: '100%', position:'fixed', overflow:'auto'}">
    <div slot="drawer" class="drawer-content">
      <x-header :left-options="{backText: '返回', preventGoBack: true}" @on-click-back="toggleDrawer" transition="all 1s ease-in" style="background: #f73c6f;flex:0 0 auto;">商品分类</x-header>
      <div class="category-content">
        <h1>234567890-=ghjk</h1>
        <h1>234567890-=ghjk</h1>
        <h1>234567890-=ghjk</h1>
        <h1>234567890-=ghjk</h1>
        <h1>234567890-=ghjk</h1>
        <h1>234567890-=ghjk</h1>
        <h1>234567890-=ghjk</h1>
        <h1>234567890-=ghjk</h1>
        <h1>234567890-=ghjk</h1>
        <h1>234567890-=ghjk</h1>
        <h1>234567890-=ghjk</h1>
        <h1>234567890-=ghjk</h1>
        <h1>234567890-=ghjk</h1>
        <h1>234567890-=ghjk</h1>
        <h1>234567890-=ghjk</h1>
        <h1>234567890-=ghjk</h1>
        <h1>234567890-=ghjk</h1>
        <h1>234567890-=ghjk</h1>
        <h1>234567890-=ghjk</h1>
        <h1>234567890-=ghjk</h1>
        <h1>234567890-=ghjk</h1>
        <h1>234567890-=ghjk</h1>
        <h1>234567890-=ghjk</h1>
        <h1>234567890-=ghjk</h1>
      </div>
    </div>
    <slot></slot>
  </drawer>
</template>

<script>
import { Drawer, XHeader } from 'vux';
export default {
  name: 'categories',
  components: { Drawer, XHeader },
  props: ['show'],
  methods: {
    toggleDrawer: function () {
      this.$emit('toggle');
    }
  }
}
</script>

<style lang="scss">
.drawer-content {
  width: 100%;
  height: 100%;
  background: #fff;
  display: flex;
  flex-direction: column;
  .category-content {
    overflow: auto;
    flex: 1 1 auto;
    -webkit-overflow-scrolling: touch;
    transform: translate3d(0,0,0);
  }
}

.drawer-handler {
  position: absolute;
  z-index: 10000;
  width: 100%;
  height: 100%;
}

.noscroll {
  overflow: hidden;
}
</style>

