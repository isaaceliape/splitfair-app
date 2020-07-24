<template>
  <section
    class="AboutSection"
    :class="{ showOptions }"
  >
    <a
      href="#"
      class="about"
      @click="onClickAboutBtn"
    >
      about
    </a>
    <div class="overlay">
      <div
        class="left-content"
        @click="onClickAboutBtn"
      />
      <div class="right-content">
        <h1 class="title">
          About
        </h1>
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
    onClickAboutBtn(e) {
      this.showOptions = !this.showOptions;
      this.$emit('is-menun-open', this.showOptions);
    }
  },
};
</script>

<style lang="scss" scoped>
  @import '../styles/variables';

  .AboutSection {
    position: absolute;
    width: 0;
    height: 0;
    z-index: 1;
    right: 0;
    bottom: 0;
    z-index: 2;

    &.showOptions {
      z-index: 4;

      .overlay {
        transform: translateX(-100vw);
      }
    }
    .about {
      position: absolute;
      text-decoration: none;
      color: $black;
      font-size: 28px;
      bottom: 4vw;
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
    top: -100vh;
    width: 100vw;
    height: 100vh;
    transition: 500ms ease; 
    transform: translateX(0vw);

    .left-content {
      position: absolute;
      left: 0;
      width: 50vw;
      height: 100%;
      cursor: pointer;
      cursor: url('../assets/cursor-cross-green.png'), auto;	
    }
    .right-content {
      width: 50vw;
      position: absolute;
      right: 0;
      height: 100%;
      background-color: $green;
      text-align: left;
      padding: 2vw 7vw;
      box-sizing: border-box;
      overflow: auto;
      cursor: url('../assets/cursor-black.png'), auto;	
  
      .title {
        font-size: 128px;
        text-decoration: none;
        display: block;
        color: $black;
        font-weight: normal;
      }
    }
  }
</style>