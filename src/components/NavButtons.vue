<template>
  <div class="nav-button-group">
    <div class="nav-button-item touch-me"   v-for="item in items" v-bind:key="item.id">
      <img :src="item.img">
      <span v-text="item.title"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'navButtons',
  data() {
    return {
      items: [
        {
          img: 'https://gw.alicdn.com/tfs/TB11OCuRpXXXXaBXFXXXXXXXXXX-230-230.png?avatar=1',
          title: '全部分类'
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
      ]
    }
  },
  computed: {

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
