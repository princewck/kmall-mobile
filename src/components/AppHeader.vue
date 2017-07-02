<template>
  <header class="app-header">
    <div class="logo">
      <img src="../images/logo.png">
    </div>
    <div class="header-fieldset">
      <a class="header-btn menu-li" @click="clickMenu" ><icon name="list"></icon></a>
      <div class="search-input" @click="onSearch">
        <span><icon name="search"></icon></span>
        <span>搜索商品</span>
      </div>
    </div>
  </header>
</template>

<script>
import 'vue-awesome/icons/list';
import 'vue-awesome/icons/search';
import Icon from 'vue-awesome/components/Icon'
export default {
  name: 'appHeader',
  data() {
    return {}
  },
  components: {
    Icon
  },
  methods: {
    clickMenu: function () {
      this.$emit('click');
    },
    onSearch: function () {
      this.$router.push('search');
    }
  }
}
</script>

<style lang="scss" scoped>
.app-header {
  width: 100%;
  background-image: linear-gradient(to bottom, rgb(247, 60, 111) 0%, rgba(249, 163, 187, 0.35) 60%, rgba(249, 163, 187, 0.35) 50%,#ff004a 100%);
  padding-bottom: 15px;
  position: absolute;
  top:0;
  left: 0;
  height: 130px;
  z-index: 100;
  .logo {
    height: auto;
    width: 100%;
    text-align: center;
    img {
      margin-top: 10px;
      display: inline-block;
      height: 60px;
      width: auto;
    }
  }
  .header-fieldset {
    font-size: 1.5rem;
    color: #d86087;
    .header-btn {
      display: block;
      position: absolute;
      color: #f5f5f5;
      &.menu-li {
        top: 5px;
        left: 10px;
        .fa-icon {
          height: 1.25rem;
          width: auto;
        }
      }
    }
    .search-input {
      border: none;
      font-family: 'Segoe UI', SimHei, Tahoma, Geneva, Verdana, sans-serif;
      background: #fff;
      color: #333;
      font-weight: lighter;
      font-size: 1.2rem;
      width: 90%;
      margin: auto auto;
      height: auto;
      padding: 5px;
      text-align: left;
      text-indent: 10px;
      height: 1.8rem;
      line-height: 1.8rem;
      box-shadow: 0 0 2px #d5d5d5;
      span {
        opacity: .5;
      }
    }

  }

}
</style>
