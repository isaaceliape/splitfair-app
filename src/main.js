import Vue from 'vue';
import Vuex from 'vuex';

import Application from './Application.vue';
import AppStore from './store/AppStore';
import Vue2TouchEvents from 'vue2-touch-events';
 

Vue.use(Vue2TouchEvents);
Vue.use(Vuex);
window.$store = new Vuex.Store({
  modules: {
    App: AppStore,
  },
});
Vue.config.productionTip = false;

new Vue({
  store: window.$store,
  render: (h) => h(Application),
}).$mount('#app');
