<template>
  <section class="DownloadAppSection">
    <a
      href="#"
      class="download-app"
      @click="onClickDownloadApp"
    >
      download app
    </a>
    <div
      :class="{ show: showOptions }"
      class="overlay"
    >
      <div
        class="left-content"
        @click="onClickDownloadApp"
      />
      <div class="right-content">
        <a
          href="#"
          class="link desktop"
        >
          Desktop
        </a>
        <a
          href="#"
          class="link mobile"
        >
          Mobile
        </a>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      showOptions: false,
    };
  },
  methods: {
    onClickDownloadApp(e) {
      this.showOptions = !this.showOptions;
      this.$emit('is-menun-open', this.showOptions);
    }
  },
};
</script>

<style lang="scss" scoped>
  @import '../styles/variables';

  .DownloadAppSection {
    position: absolute;
    width: 0;
    height: 0;
    z-index: 1;
    right: 0;
    top: 0;
    z-index: 2;

    .download-app {
      position: absolute;
      text-decoration: none;
      color: $black;
      font-size: 28px;
      top: 4vw;
      right: 5vw;
      z-index: 0;
      white-space: nowrap;

      &:hover {
        color: $red;
      }
    }
  }

  .overlay {
    position: absolute;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    transition: 500ms ease; 
    transform: translateX(0vw);

    &.show {
      transform: translateX(-100vw);
    }
    
    .left-content {
      position: absolute;
      left: 0;
      width: 50vw;
      height: 100%;
      cursor: pointer;
      cursor: url('../assets/cursor-cross-red.png'), auto;	
    }
    .right-content {
      width: 50vw;
      position: absolute;
      right: 0;
      height: 100%;
      background-color: $red;
      text-align: left;
      padding: 2vw 7vw;
      box-sizing: border-box;
      cursor: url('../assets/cursor-black.png'), auto;	
  
      .link {
        font-size: 128px;
        text-decoration: none;
        display: block;
        color: $black;
        position: absolute;
  
        &:hover {
          color: $white;
          cursor: url('../assets/cursor-black.png'), auto;	
        }
  
        &.desktop {
          left: 7vw;
          top: 3vw;
        }
        &.mobile {
          left: 7vw;
          bottom: 3vw;
        }
      }
    }
  }
</style>