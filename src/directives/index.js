// 注册一个全局自定义指令 v-focus
import Vue from 'vue';
Vue.directive('square', {
  inserted: el => {
    el.style.height = el.clientWidth;
  },
  componentUpdated: el => {
    el.style.height = el.clientWidth;
  }
});

document.addEventListener('touchstart', e=>{testTouch(e.target)});
const testTouch = (el) => {
  if (!el) return;
  if ([...el.classList].includes('touch-me')) {
    el.classList.add('bounce');
    setTimeout(()=> {
      el.classList.remove('bounce');
    }, 50);
  } else {
    testTouch(el.parentElement);
  }
}