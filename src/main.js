import ApplicationComponent from './Application.vue';
import AppStore from './store/AppStore';
import { createStore } from 'vuex';
import { createApp } from 'vue' ;

const store = createStore({
  modules: {
    App: AppStore,
  },
});

const app = createApp(ApplicationComponent);

app.use(store);
app.mount('#app');
