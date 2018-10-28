import Vue from 'vue';
import App from './App.vue';
import router from './router';
import VTooltip from 'v-tooltip';
import NProgress from 'nprogress';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'nprogress/nprogress.css';
import '@/assets/style.css';
import '@/assets/tooltip.css';

Vue.use(VTooltip);

Vue.config.productionTip = false;

router.beforeResolve((to, from, next) => {
  if (to.path) {
    NProgress.start();
  }

  next();
});

router.afterEach(() => NProgress.done());

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
