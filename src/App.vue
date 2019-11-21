<template>
  <div class="app">
    <img
      class="logo"
      alt="Vue logo"
      src="./assets/logo.png"
      @click="increment"
    >
    <HelloWorld msg="Welcome to SplitSmart app" />
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

import HelloWorld from './components/HelloWorld.vue';

export default {
  components: {
    HelloWorld,
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
