<template>
  <div class="block-group">
    <div class="block-group-header" v-text="name"></div>
    <div class="block-group-content">
      <a class="block-group-item" v-for="(item, index) in items" :key="index">
        <label v-text="item.title"></label>
        <img :src="item.image" class="touch-me" alt="item.title">
        <p v-text="item.description"></p>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'blockGroup',
  props: ['data'],
  computed: {
    items: function() { return this.data.list },
    name: function() { return this.data.name }
  }
}
</script>


<style lang="scss">
.block-group {
  width: 100%;
  padding: 0;
  &-header {
    width: 100%;
    padding: 15px;
    box-sizing: border-box;
  }
  &-content {
    width: 100%;
    box-sizing: border-box;
    .block-group-item {
      background: #fff;
      display: block;
      border: 1px solid #f6f6f6;
      border-left: none;
      width: 50%;
      float: left;
      box-sizing: border-box;
      &:first-of-type {
        border-left: 1px solid #f6f6f6;
      }
      label {
        display:block;
        width: 100%;
        text-align: center;
        text-indent: 15px;
        font-size: 1em;
        color: #c40000;
        line-height: 2em;
      }
      img {
        width: 50%;
        height: auto;
        margin-top: 25%;
        margin: auto auto;
      }
      p {
        line-height: 1em;
        font-size: .5em;
        color: gray;
      }
    }
  }
}
</style>
