<template>
  <div class="search-panel-wrapper">
    <div class="search-panel-header">
      <input type="text" v-model="current" placeholder="请输入要搜索的商品名称">
      <span class="search-btn touch-me" @click="select">搜索</span>
    </div>
    <div class="search-panel-body">
      <label>大家都在找:</label>
      <p class="search-panel-kw">
        <span v-for="(kw, index) in $list" :class="{active: query == kw}" @click="checkKw(kw)" :key="index" v-text="kw"></span>
        <em v-if="!showMore" @click="listMore">更多..</em>
        <em v-if="showMore" @click="cascadeMore">收起</em>
      </p>
    </div>
  </div>
</template>

<script>
import { debounce } from 'lodash';
export default {
  props: ['init'],
  name: 'searchPanel',
  data() {
    return {
      list: ['女装', '女鞋', '女士衬衫', '男装', '面膜', 'T恤', 'YSL', '情侣装', '防晒霜', '手机壳', '男鞋', '钱包', '女包', '袜子'],
      showMore: false,
      current: null,
      query: null
    }
  },
  mounted() {
    this.$set(this, 'current', this.init);
    this.checkKw(this.init);
  },
  computed: {
    $list: function () {
      let vm = this;
      this.list.sort((a, b) => {
        return Number(b === vm.query) - Number(a === vm.query);
      });
      return this.showMore ? this.list : this.list.slice(0, 10);
    }
  },
  watch: {
    query: debounce(function () {
      this.$emit('onSelect', this.query);
    }, 300)
  },
  methods: {
    listMore() {
      let vm = this;
      vm.$set(vm, 'showMore', true);
    },
    cascadeMore() {
      let vm = this;
      vm.$set(vm, 'showMore', false);
    },
    checkKw(kw) {
      this.$set(this, 'query', kw);
      this.$set(this, 'current', kw);
      this.cascadeMore();
    },
    select() {
      this.$set(this, 'query', this.current);
      this.cascadeMore();
    }
  }
}
</script>

<style lang="scss">
.search-panel-wrapper {
  display: block;
  padding: 0;
  border: 1px solid #f5f5f5;
  margin: 5px 5px;
  box-sizing: border-box;
  user-select: none;
  .search-panel-header {
    box-sizing: border-box;
    width: 100%;
    overflow: auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    font-size: .9rem;
    height: 2rem;
    line-height: 2rem;
    input {
      flex: auto;
      outline: none;
      height: 100%;
      line-height: 100%;
      font-size: .8rem;
      text-indent: 10px;
      color: #607d8b;
    }
    .search-btn {
      flex: 0 0 auto;
      width: 4rem;
      background: #c40000;
      color: #fff;
    }
  }
  .search-panel-body {
    width: 100%;
    overflow: auto;
    line-height: 1.5rem;
    background: #f5f5f5;
    &>label {
      box-sizing: border-box;
      line-height: 1rem;
      font-size: .6rem;
      font-weight: lighter;
      color: #c40000;
      text-align: left;
      display: block;
      width: 100%;
      padding: 5px 10px 0 10px;
    }
    p {
      line-height: 1.5rem;
      margin: 0;
      padding: 5px;
      line-height: 1.5rem;
      font-size: .8rem;
      color: #f73c6f;
      text-align: left;
      transition: all .3s ease;
      span {
        padding: 0 10px;
        display: inline-block;
        background: rgba(247, 60, 111, .1);
        margin: 2px 8px 5px 0;
        box-sizing: border-box;
        &.active {
          background: rgba(247, 60, 111, .3);
          color: #fff;
          border: 1px solid #fff;
        }
      }
      em {
        float: right;
        font-style: normal;
        color: #c40000;
        margin-right: 15px;
      }
    }
  }
}
</style>
