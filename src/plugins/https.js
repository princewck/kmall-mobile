export default {
  install (Vue) {
    Vue.prototype.https = (url) =>  ((url && url.indexOf('http://') > -1 && url.replace('http', 'https')) || url);
  }
}