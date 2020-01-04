<template>
  <div class="Application">
    <App />
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

import App from './components/App.vue';

export default {
  components: {
    App,
  },
  methods: {
    ...mapMutations('App', [
      'increment',
    ]),
    test() {
      var test = 'test';
      return test;
    }
  },
};

</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
.Application {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.logo {
  cursor: pointer;
}
</style>
