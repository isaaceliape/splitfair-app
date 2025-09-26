<template>
  <div class="Application">
    <a v-if="desktopOnly" href="#" :class="{ menuOpened }" class="Application__link logo">
      splitfair
    </a>

    <span v-if="desktopOnly" :class="{ menuOpened }" class="Application__version"> v0.1 </span>

    <App :class="{ menuOpened }" />

    <DownloadAppSection v-if="desktopOnly" @is-menun-open="moveAppSideways" />

    <AboutSection v-if="desktopOnly" @is-menun-open="moveAppSideways" />
  </div>
</template>

<script>
import options from './Application.js';
export default options;
</script>

<style>
@import url('./styles/variables.css');

* {
  margin: 0;
  padding: 0;
}

body {
  background-color: var(--light-bg);
}
@media (max-width: 600px) {
  body {
    background-color: var(--dark-bg);
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
  cursor: url(assets/cursor-red.png), auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--Blocks, #d9e4ea);
}

.Application__logo {
  cursor: pointer;
}

.Application__link {
  position: absolute;
  text-decoration: none;
  color: var(--black);
  font-size: 28px;
  z-index: 1;
  transition: opacity 250ms ease;
}
.Application__link.menuOpened {
  opacity: 0;
  pointer-events: none;
}
.Application__link.logo {
  top: 4vw;
  left: 5vw;
}

.Application__version {
  position: absolute;
  bottom: 4vw;
  left: 5vw;
  color: var(--black);
  font-size: 28px;
  opacity: 0.4;
  transition: opacity 250ms ease;
}
.Application__version.menuOpened {
  opacity: 0;
  pointer-events: none;
}
</style>
