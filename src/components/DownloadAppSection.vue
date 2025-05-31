<template>
  <section
    class="DownloadAppSection"
    :class="{ showOptions: showOptions.value }"
  >
    <a
      href="#"
      class="download-app"
      @click="onClickDownloadApp"
    >
      download app
    </a>
    <div class="overlay">
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

<script setup>
import { ref } from 'vue';
import { defineEmits } from 'vue';

const showOptions = ref(false);
const emit = defineEmits(['is-menu-open']);

const onClickDownloadApp = () => {
  showOptions.value = !showOptions.value;
  emit('is-menu-open', showOptions.value);
};
</script>

<style lang="css" scoped>
@import url("../styles/variables.css");

.DownloadAppSection {
  position: absolute;
  width: 0;
  height: 0;
  z-index: 2;
  right: 0;
  top: 0;
}

.DownloadAppSection.showOptions {
  z-index: 4;
}

.DownloadAppSection.showOptions .overlay {
  transform: translateX(-100vw);
}

.download-app {
  position: absolute;
  text-decoration: none;
  color: var(--black);
  font-size: 28px;
  top: 4vw;
  right: 5vw;
  z-index: 0;
  white-space: nowrap;
}

.download-app:hover {
  color: var(--red);
}

.overlay {
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  transition: 500ms ease;
  transform: translateX(0vw);
  background: url('../assets/desktop_bg.png') 76% center no-repeat;
  background-size: cover;
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
  background-color: var(--red);
  text-align: left;
  padding: 2vw 7vw;
  box-sizing: border-box;
  cursor: url('../assets/cursor-black.png'), auto;
}

.link {
  font-size: 128px;
  text-decoration: none;
  display: block;
  color: var(--black);
  position: absolute;
}

.link:hover {
  color: var(--white);
  cursor: url('../assets/cursor-black.png'), auto;
}

.link.desktop {
  left: 7vw;
  top: 3vw;
}

.link.mobile {
  left: 7vw;
  bottom: 3vw;
}
</style>
