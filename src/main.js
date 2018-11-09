import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router.js';
import store from '@/store.js';
import VTooltip from 'v-tooltip';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'nprogress/nprogress.css';
import '@/assets/style.css';
import '@/assets/tooltip.css';

Vue.use(VTooltip);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
