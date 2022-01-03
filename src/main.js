import Vue from 'vue';
import App from './App.vue';
import router from './router';
Vue.config.productionTip = false;

(function (doc, win) {
  var docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function () {
      var clientWidth = docEl.clientWidth;
      if (!clientWidth) return;
      // 根据设备的比例调整初始font-size大小
      if(clientWidth>640) clientWidth = 640;
      docEl.style.fontSize = (clientWidth / 40) + 'px';
    };
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);


new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
