import Vue from 'vue';
import Vuex from 'vuex';

import App from './App.vue';
import AppStore from './store/AppStore';

Vue.use(Vuex);
window.$store = new Vuex.Store({
  modules: {
    App: AppStore,
  },
});
Vue.config.productionTip = false;

new Vue({
  store: window.$store,
  render: (h) => h(App),
}).$mount('#app');
