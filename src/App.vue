<template>
  <div class="app">
    <Home />
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

import Home from './components/Home.vue';

export default {
  components: {
    Home,
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

<style>
body {
  margin: 0;
  padding: 0;
}
.app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.logo {
  cursor: pointer;
}
</style>
