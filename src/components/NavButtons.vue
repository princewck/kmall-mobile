<template>
  <div class="nav-button-group">
    <div class="nav-button-item touch-me" @click="prehandlClick(item.onClick)"   v-for="item in buttons" v-bind:key="item.id">
      <img :src="item.img">
      <span v-text="item.title"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'navButtons',
  props: ['buttons'],
  methods: {
    prehandlClick: (fn) => (fn() || new Function()())
  }
}
</script>

<style lang="scss" scoped>
  .nav-button-group {
    width: 100%;
    flex-direction: column;
    box-sizing: border-box;
    .nav-button-item {
      box-sizing: border-box;
      // cursor: pointer;
      float: left;
      padding: 15px;
      width: 25%;
      font-size: .8em;
      border: 1px solid #f5f5f5;
      border-left: none;
      cursor:pointer;
      &:nth-last-of-type(2+1) {
        border-left: none;
      }
      img {
        display: block;
        border-radius: 50%;
        width: 100%;
        margin-left: auto;
        margin-right: auto;
        height: auto;
      }
    }
  }

  @keyframes blink {
    0% {
      background: #fff;
    }
    50% {
      background: lightblue;
    }
    100% {
      background: #fff;
    }
  }
</style>
