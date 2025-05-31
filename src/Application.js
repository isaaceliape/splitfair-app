/* eslint-disable */
import { mapMutations } from 'vuex';
import App from './components/App.vue';
import DownloadAppSection from './components/DownloadAppSection.vue';
import AboutSection from './components/AboutSection.vue';

export default {
  name: "SplitfairApplication",
  components: { App, DownloadAppSection, AboutSection },
  data() {
    return {
      menuOpened: false,
      desktopOnly: true
    };
  },
  mounted() {
    const mql = window.matchMedia('(max-width: 600px)');
    this.desktopOnly = !mql.matches;
    mql.addListener(this.screenTest);
  },
  methods: {
    ...mapMutations('App', ['increment']),
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
  }
};
