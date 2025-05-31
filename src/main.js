import { createApp } from 'vue';
import { createStore } from 'vuex';

import Application from './Application.vue';
import AppStore from './store/AppStore';
import Vue2TouchEvents from 'vue2-touch-events';

const store = createStore({
  modules: {
    App: AppStore,
  },
});

const app = createApp(Application);
app.use(store);
app.use(Vue2TouchEvents);
app.mount('#app');
