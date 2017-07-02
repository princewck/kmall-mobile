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
          <a class="touch-me">
            <img src="https://a3.vimage1.com/upload/goadmin/2017/06/15/14/14975270148380.jpg">
            <p v-text="category.name"></p>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
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
      return this.groups[this.checkedIndex]['categories'];
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
    changeGroup: function (index) {
      this.$set(this, 'checkedIndex', index);
    }
  }
}
</script>


<style lang="scss">
.category-wrapper {
  width: 100%;
  height: 100%;
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
    display: flex;
    flex-direction: row;
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
        &.active {
          background: #c0c0c0;
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
      li {
        display: block;
        box-sizing: border-box;
        font-size: .8rem;
        width: 50%;
        float: left;
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

