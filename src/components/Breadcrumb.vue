<template>
  <div class="crumb-wrapper">
    <!--<span>全部商品</span>
    <span>女装</span>
    <span>短裤</span>-->
    <span v-for="(nav, index) in navs" :key="index" v-text="nav.text">
      <span><a :href="nav.link" v-if="nav.link" v-text="nav.text"></a></span>
      <span :href="nav.link" v-if="nav.link" v-text="nav.text"></span>
    </span>
  </div>
</template>

<script>
export default {
  name: 'breadcrumb',
  props: ['navs']
}
</script>


<style lang="scss">
  .crumb-wrapper {
    display: flex;
    width: 100%;
    height: 2rem;
    flex-direction: row;
    align-items: center;
    justify-content: start;
    line-height: 2rem;
    background: #fbf2f5;
    span {
      display: block;
      float: left;
      font-size: .8rem;
      color: #c7c7c7;
      height: 100%;
      padding-left: 2rem;
      text-indent: 5px;
      background-image: linear-gradient(to right, #fff, #fbf2f5);
      a {
        text-decoration: none;
        color: gray;
      }
      &:first-of-type {
        padding-left: 5px;
      }
      &::after {
        content: '';
        border: 1rem solid transparent;
        border-left-color: #fbf2f5;
        border-top-color: #fbf2f5;
        width: 0;
        height: 0;
        margin-right: 1rem;
        position: absolute;
      }
    }
  }
</style>
