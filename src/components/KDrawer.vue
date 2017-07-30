<template>
  <drawer :show="show" class="category-drawer" :class="{noscroll: show}" @update:show="toggleDrawer" :placement="placement" :drawer-style="{background: '#f5f5f5', width: '100%', position:'fixed', overflow:'auto'}">
    <div slot="drawer" class="drawer-content">
      <x-header :left-options="{backText: '返回', preventGoBack: true}" @on-click-back="toggleDrawer" transition="all 1s ease-in" style="background: #f73c6f;flex:0 0 auto;"> {{ title }} </x-header>
      <div class="category-content">
        <slot name="drawer-content"></slot>
      </div>
    </div>
    <slot></slot>
  </drawer>
</template>

<script>
import { Drawer, XHeader } from 'vux';
export default {
  name: 'KDrawer',
  components: { Drawer, XHeader },
  props: ['show', 'title', 'placement'],
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
    height: 100%;
    overflow: auto;
    flex: 1 1 auto;
    -webkit-overflow-scrolling: touch;
    transform: translate3d(0,0,0);
    display: flex;
    flex-direction: column;
    &>div {
      display: flex;
      flex-direction: column;
      height: 100%;
      flex: 1 1 auto; 
    }
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

