<template>
  <div class="Application">
    <a
      v-if="desktopOnly"
      href="#"
      :class="{ menuOpened }"
      class="Application__link logo"
    >
      sliptsmart
    </a>
    
    <span
      v-if="desktopOnly"
      :class="{ menuOpened }"
      class="Application__version"
    >
      v0.1
    </span>

    <App :class="{ menuOpened }" />

    <DownloadAppSection
      v-if="desktopOnly"
      @is-menun-open="moveAppSideways"
    />

    <AboutSection
      v-if="desktopOnly"
      @is-menun-open="moveAppSideways"
    />
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

import App from './components/App.vue';
import DownloadAppSection from './components/DownloadAppSection.vue';
import AboutSection from './components/AboutSection.vue';

export default {
  components: {
    App,
    DownloadAppSection,
    AboutSection,
  },
  data() {
    return {
      menuOpened: false,
      desktopOnly: true,
    };
  },
  mounted() {
    const mql = window.matchMedia('(max-width: 600px)');
    this.desktopOnly = !mql.matches;
    mql.addListener(this.screenTest);
  },
  methods: {
    ...mapMutations('App', [
      'increment',
    ]),
    test() {
      var test = 'test';
      return test;
    },
    moveAppSideways(value) {
      this.menuOpened = value;
    },
    screenTest(e) {
      this.desktopOnly = !e.matches;
    }
  },
};

</script>

<style lang="scss">
@import 'styles/variables';

* {
  margin: 0;
  padding: 0;
}

body {
  background-color: $light-bg;

  @media #{$media-query-mobile} {
    background-color: $dark-bg;
  }
}

.Application {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  overflow-y: auto;
  overflow-x: hidden;
  width: 100vw;
  height: 100vh;
  position: relative;

  .Application__logo {
    cursor: pointer;
  }

  .Application__link {
    position: absolute;
    text-decoration: none;
    color: $black;
    font-size: 28px;
    z-index: 1;
    transition: opacity 250ms ease;

    &.menuOpened {
      opacity: 0;
      pointer-events: none;
    }

    &.logo {
      top: 4vw;
      left: 5vw;
    }
  }

  .Application__version {
    position: absolute;
    bottom: 4vw;
    left: 5vw;
    color: $black;
    font-size: 28px;
    opacity: 0.4;
    transition: opacity 250ms ease;

    &.menuOpened {
      opacity: 0;
      pointer-events: none;
    }
  }
}
</style>
