<template>
  <section
    class="AboutSection"
    :class="{ showOptions: showOptions.value }"
  >
    <a
      href="#"
      class="about"
      @click="onClickAboutBtn"
    > about </a>
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

<script setup>
import { ref } from 'vue';

const showOptions = ref(false);
const emit = defineEmits(['is-menun-open']);

function onClickAboutBtn(e) {
  showOptions.value = !showOptions.value;
  emit('is-menun-open', showOptions.value);
}
</script>

<style lang="css" scoped>
@import url("../styles/variables.css");

.AboutSection {
  position: absolute;
  width: 0;
  height: 0;
  z-index: 1;
  right: 0;
  bottom: 0;
  z-index: 2;
}

.AboutSection.showOptions {
  z-index: 4;
}

.overlay {
  transform: translateX(-100vw);
}

.about {
  position: absolute;
  text-decoration: none;
}

.left-content {
  left: 0;
  width: 50vw;
  height: 100%;
  cursor: pointer;
}

.right-content {
  color: var(--black);
}
</style>
