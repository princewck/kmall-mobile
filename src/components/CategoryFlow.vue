<template>
  <div class="category-wrapper">
    <div class="group-list">
      <ul>
        <li v-for="(group, index) in groups" :key="group.id" class="touch-me" :class="{active: checkedIndex === index}" @click="changeGroup(index)" v-text="group.name">
        </li>
      </ul>
    </div>
    <div class="category-list">
      <ul>
        <li v-for="(category, index) in categories" :key="category.id">
          <a class="touch-me" @click="goProductFlowRoute(category)">
            <img :src="getCategoryImage(category)">
            <p v-text="category.name"></p>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import holder from '../images/favicon.jpg';
export default {
  name: 'categoryFlow',
  data() {
    return {
      groups: [],
      checkedIndex: 0,
      sideExpanded: true
    }
  },
  computed: {
    categories: function () {
      if (!this.groups.length) return [];
      let categories = this.groups[this.checkedIndex]['categories'] || [];
      return categories.sort((c1, c2) => (c1.sort - c2.sort));
    }
  },
  mounted: function () {
    this.load();
  },
  methods: {
    load() {
      let vm = this;
      fetch('/api/web/categoryGroups/onbanner')
        .then(res => (res.json()))
        .then(({ data }) => {
          vm.$set(vm, 'groups', data.filter(g => g.categories.length));
        });
    },
    goProductFlowRoute(category) {
      this.$router.push({
        name: 'ProductList',
        params: {
          groupId: this.groups[this.checkedIndex]['id'],
          categoryId: category.id
        },
        force: true
      });
      return this.$emit('click');
    },
    changeGroup: function (index) {
      this.$set(this, 'checkedIndex', index);
    },
    getCategoryImage(category) {
      return category.image || holder;
    }
  }
}
</script>


<style lang="scss">
.category-wrapper {
  width: 100%;
  height: 100%;
  flex: 1 1 auto;
  display: flex;
  flex-direction: row;
  .group-list {
    background: #f5f5f5;
    color: #585c64;
    width: 8rem;
    height: 100%;
    font-size: .5rem;
    font-weight: bold;
    flex: 0 0 auto;
    position: relative;
    overflow-x: hidden;
    display: block;
    flex-direction: row;
    align-items: stretch;
    ul {
      box-sizing: border-box;
      padding: 0;
      margin: 0;
      display: block;
      width: 100%;
      height: 100%;
      overflow: auto;
      background: #fff;
      li {
        border-bottom: 1px solid #f5f5f5;
        list-style: none;
        padding: 15px 10px;
        background: #fff;
        color: #585c64;
        text-align: left;
        text-indent: 5px;
        font-size: .6rem;
        white-space: nowrap;
        overflow-x: hidden;
        font-weight: lighter;
        &:first-of-type {
          border-top: 1px solid #f5f5f5;
        }
        &.active {
          background: rgba(247, 60, 111, .8);
          color: #fff;
          font-size: .65rem;
          font-weight: bold;
        }
      }
    }
  }
  .category-list {
    flex: auto;
    display: flex;
    flex-direction: row;
    background: #f5f5f5;
    ul {
      display: block;
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      overflow: auto;
      margin: 0;
      padding: 0;
      text-align: left;
      li {
        display: inline-block;
        box-sizing: border-box;
        font-size: .8rem;
        width: 50%;
        text-align: center;
        padding: 5px 5px 5px 5px;
        a {
          background: #fff;
          display: block;
          overflow: auto;
          img {
            display: inline-block;
            width: 80%;
            height: auto;
          }
          p {
            font-size: .6rem;
          }
        }
      }
    }
  }
}
</style>

