<template>
  <div>
    <div class="input-group">
      <input type="text" placeholder="搜索">
      <span>搜索</span>
    </div>
    <a @click="goBack">取消</a>
  </div>
</template>

<script>
export default {
  methods: {
    goBack: function() {
      this.$router.go(-1);
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
