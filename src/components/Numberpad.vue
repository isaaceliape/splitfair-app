<template>
  <div class="Numberpad">
    <div class="button-row">
      <div
        ref="button-7"
        v-touch:end="onMouseup"
        v-touch:start="onMousedown"
        class="button"
      >
        7
      </div>
      <div
        ref="button-8"
        v-touch:end="onMouseup"
        v-touch:start="onMousedown"
        class="button"
      >
        8
      </div>
      <div
        ref="button-9"
        v-touch:end="onMouseup"
        v-touch:start="onMousedown"
        class="button"
      >
        9
      </div>
    </div>
    <div class="button-row">
      <div
        ref="button-4"
        v-touch:end="onMouseup"
        v-touch:start="onMousedown"
        class="button"
      >
        4
      </div>
      <div
        ref="button-5"
        v-touch:end="onMouseup"
        v-touch:start="onMousedown"
        class="button"
      >
        5
      </div>
      <div
        ref="button-6"
        v-touch:end="onMouseup"
        v-touch:start="onMousedown"
        class="button"
      >
        6
      </div>
    </div>
    <div class="button-row">
      <div
        ref="button-1"
        v-touch:end="onMouseup"
        v-touch:start="onMousedown"
        class="button"
      >
        1
      </div>
      <div
        ref="button-2"
        v-touch:end="onMouseup"
        v-touch:start="onMousedown"
        class="button"
      >
        2
      </div>
      <div
        ref="button-3"
        v-touch:end="onMouseup"
        v-touch:start="onMousedown"
        class="button"
      >
        3
      </div>
    </div>
    <div class="button-row">
      <div
        ref="button-Backspace"
        v-touch:end="onMouseup"
        v-touch:start="onMousedown"
        class="button clear"
      >
        {{ backIcon }}
      </div>
      <div
        ref="button-0"
        v-touch:end="onMouseup"
        v-touch:start="onMousedown"
        class="button"
      >
        0
      </div>
      <div
        ref="button-Enter"
        v-touch:end="onMouseup"
        v-touch:start="onMousedown"
        class="button enter"
      >
        Enter
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      backIcon: '<',
    };
  },
  mounted() {
    console.log('mounted');
    document.addEventListener('keydown', this.onKeyDown);
    document.addEventListener('keyup', this.onKeyup);
  },
  methods: {
    onMousedown(e) {
      console.log('mousedown');
      console.log(e);
      e.currentTarget.classList.add('pressed');
    },
    onMouseup(e) {
      console.log('mouseup');
      e.currentTarget.classList.remove('pressed');
      this.$emit('tapped-button', e.currentTarget.innerText.trim());
    },
    onKeyup(e) {
      const isBackspace = e.key === 'Backspace';
      const isEnter = e.key === 'Enter';
      const isNumber = this.isNumber(e.key);

      if (isNumber) {
        this.$emit('tapped-button', e.key);
      }

      if (isBackspace) {
        this.$emit('tapped-button', '<');
      }

      if (isEnter) {
        this.$emit('tapped-button', 'Enter');
      }

      if (isNumber || isBackspace || isEnter) {
        const buttonEl = this.$refs[`button-${e.key}`];
        buttonEl.classList.add('pressed');

        setTimeout(() => {
          buttonEl.classList.remove('pressed');
        }, 200);
      }
    },
    onKeyDown(e) {
      console.log('keydown', e.currentTarget);
    },
    isNumber(value) {
      var reg = new RegExp('^[0-9]+$');
      return reg.test(value);
    }
  },
};
</script>

<style lang="scss" scoped>
  @import '../styles/variables';

  .button-row {
    display: grid;
    width: 100%;
    grid-gap: 3px;
    grid-template-columns: 1fr 1fr 1fr;
    margin-bottom: 3px;
    font-family: helvetica;

    .button {
      height: 84px;
      background-color: $light-bg;
      border-radius: 9px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 200ms ease;
      backface-visibility: hidden;
      -webkit-touch-callout: none; /* iOS Safari */
        -webkit-user-select: none; /* Safari */
         -khtml-user-select: none; /* Konqueror HTML */
           -moz-user-select: none; /* Old versions of Firefox */
            -ms-user-select: none; /* Internet Explorer/Edge */
                user-select: none; //

      &.pressed {
        transform: scale(0.98);
        opacity: 0.9;
      }

      &.clear {
        color: $red;
      }

      &.enter {
        color: $black;
        background-color: $red;
      }
    }
  }
</style>