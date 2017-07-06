<template>
  <div class="crumb-wrapper">
    <div v-for="(nav, index) in navs" :key="index">
      <a @click="onClick(nav)" v-text="nav.text"></a><icon class="fa-icon" name="angle-right"></icon>
    </div>
  </div>
</template>

<script>
import 'vue-awesome/icons/angle-right';
import Icon from 'vue-awesome/components/Icon'
export default {
  name: 'breadcrumb',
  components: {Icon},
  props: ['navs'],
  methods: {
    onClick(nav) {
      this.$emit('onClick', nav);
    }
  }
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
    padding-left: 10px;
    & > div {
      float: left;
      height: 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      a {
        font-size: .8rem;
        text-decoration: none;
        color: #9e9e9e;
      }
      .fa-icon {
        fill: #9e9e9e;
        height: 1.5rem;
        padding: 2px 5px;
      }
    }
  }
</style>
