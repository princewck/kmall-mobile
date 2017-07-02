<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import './directives';
export default {
  name: 'app'
}
</script>

<style lang="scss">
body,html {
  margin: 0;
  padding: 0;
  height: 100%;
}

#app {
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  & > div {
    height: 100%;
  }
}
.bounce {
  transform: scale(.98);
}
</style>
