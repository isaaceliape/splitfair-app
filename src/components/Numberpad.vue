<template>
  <div class="NumberPad">
    <div class="button-row">
      <div ref="button7" v-touch:tap="onTap" class="button">7</div>

      <div ref="button8" v-touch:tap="onTap" class="button">8</div>

      <div ref="button9" v-touch:tap="onTap" class="button">9</div>
    </div>

    <div class="button-row">
      <div ref="button4" v-touch:tap="onTap" class="button">4</div>

      <div ref="button5" v-touch:tap="onTap" class="button">5</div>

      <div ref="button6" v-touch:tap="onTap" class="button">6</div>
    </div>

    <div class="button-row">
      <div ref="button1" v-touch:tap="onTap" class="button">1</div>

      <div ref="button2" v-touch:tap="onTap" class="button">2</div>

      <div ref="button3" v-touch:tap="onTap" class="button">3</div>
    </div>

    <div class="button-row">
      <div ref="buttonBackspace" v-touch:tap="onTap" class="button clear">
        {{ backIcon }}
      </div>

      <div ref="button0" v-touch:tap="onTap" class="button">0</div>

      <div ref="buttonEnter" v-touch:tap="onTap" class="button enter">Enter</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const backIcon = ref('<');
const timeout = ref(null);

const buttonRefs = ref({});
const emit = defineEmits(['tapped-button']);

function onTap(e) {
  const el = e.currentTarget;
  clearTimeout(timeout.value);
  el.classList.add('pressed');
  timeout.value = setTimeout(() => {
    el.classList.remove('pressed');
  }, 200);
  emit('tapped-button', el.innerText.trim());
}

function onKeyup(e) {
  const isBackspace = e.key === 'Backspace';
  const isEnter = e.key === 'Enter';
  const isNumber = isNumberKey(e.key);
  if (isNumber) {
    emit('tapped-button', e.key);
  }
  if (isBackspace) {
    emit('tapped-button', '<');
  }
  if (isEnter) {
    emit('tapped-button', 'Enter');
  }
  if (isNumber || isBackspace || isEnter) {
    const buttonEl = buttonRefs.value[`button-${e.key}`];
    buttonEl.classList.add('pressed');
    setTimeout(() => {
      buttonEl.classList.remove('pressed');
    }, 200);
  }
}

function onKeyDown(e) {}

function isNumberKey(value) {
  var reg = new RegExp('^[0-9]+$');
  return reg.test(value);
}

onMounted(() => {
  document.addEventListener('keydown', onKeyDown);
  document.addEventListener('keyup', onKeyup);
});
</script>

<style lang="css" scoped>
@import url('../styles/variables.css');

.NumberPad {
  display: flex;
  flex-direction: column;
}

.button-row {
  display: grid;
  width: 100%;
  grid-gap: 3px;
  grid-template-columns: 1fr 1fr 1fr;
  margin-bottom: 3px;
  font-family: helvetica;
}

.button {
  height: var(--block-height);
  min-height: var(--block-min-height);
  max-height: var(--block-max-height);
  background-color: white;
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 200ms ease;
  backface-visibility: hidden;
  user-select: none;
}

.button:hover {
  background-color: #ecf8ff;
}

.button.pressed {
  transform: scale(0.98);
  opacity: 0.9;
}

.button.clear {
  color: var(--red);
}

.button.enter {
  color: var(--black);
  background-color: var(--red);
}

.button.enter:hover {
  background-color: #fb7755;
}
</style>
