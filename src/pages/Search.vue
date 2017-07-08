<template>
  <div>
    <div class="input-group-wrapper">
      <a @click="goBack">
        <icon name="angle-left" class="touch-me"></icon>
      </a>
      <div class="input-group">
        <span class="input-group-input">
          <input type="text" v-model="query" placeholder="搜索">
          <span class="clear" v-if="!searchMuted" @click="clear">&times;</span>
        </span>
        <a @click="search" class="touch-me" :class="{muted: searchMuted }">搜索</a>
      </div>
    </div>
    <load-more :show-loading="false" :style="{'margin-bottom': 0}" tip="快速搜索"></load-more>
    <div class="quick-search">
      <ul>
        <li class="touch-me" v-for="(item, index) in 20" :key="index">连衣裙</li>
      </ul>
    </div>
  </div>
</template>

<script>
import 'vue-awesome/icons/angle-left';
import Icon from 'vue-awesome/components/Icon'
import { LoadMore } from 'vux';
export default {
  name: 'search',
  components: {
    Icon,
    LoadMore
  },
  data() {
    return {
      query: ''
    }
  },
  computed: {
    searchMuted: function() {
      return !String(this.query).trim();
    }
  },
  methods: {
    goBack: function () {
      this.$router.go(-1);
    },
    search() {
      if (!this.query) return;
      var query = this.query;
      this.$router.push(`/query/${query}`);
    },
    clear() {
      this.query = '';
    }
  }
}
</script>

<style lang="scss" scoped>
.input-group-wrapper {
  font-size: .9rem;
  background: #f5f5f5;
  padding: 0;
  display: flex;
  flex-direction: row;
  &>a {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex: 0 0 auto;
    width: 30px;
    color: #cecece;
    .fa-icon {
      transform: scale(2);
    }
  }
  .input-group {
    background: #fff;
    flex: auto;
    height: auto;
    box-sizing: border-box;
    text-align: left;
    border: 1px solid #e4e4e4;
    display: flex;
    flex-direction: row;
    padding: 3px 5px;
    margin: 10px 0;
    &-input {
      flex: auto;
      display: flex;
      flex-direction: row;
      background: #fff;
      border: none;
      border-right: 1px solid #e4e4e4;
      input {
        flex: auto;
        border: none;
        height: 2rem;
        font-size: .9rem;
        line-height: 2rem;
        text-indent: 5px;
        outline: none;
      }
      .clear {
        color: #fff;
        margin: auto;
        padding: 0;
        border-radius: 50%;
        width: 1rem;
        height: 1rem;
        background: #e4e4e4;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: auto 5px;
        font-weight: bolder;
      }
    }
    a {
      color: gray;
      min-width: 4rem;
      text-align: center;
      flex: 0 0 auto;
      display: flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;
      background: #ff004a;
      color: #fff;
      &.muted {
        background: #9e9e9e;
      }
    }
  }
}

.quick-search {
  width: 100%;
  padding: 0;
  box-sizing: border-box;
  ul {
    display: block;
    width: 100%;
    padding: 0 10px !important;
    list-style: none;
    text-align: left;
    -webkit-padding-start: 0;
    -webkit-margin-before: 0;
    box-sizing: border-box;
    li {
      box-sizing: border-box;
      display: inline-block;
      margin: 5px 3px;
      background: #f5f5f5;
      font-size: .8rem;
      line-height: 1.8rem;
      height: 1.8rem;
      text-align: center;
      padding: 0 10px;
    }
  }
}
</style>
