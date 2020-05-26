<template>
  <div class="Numberpad">
    <div class="button-row">
      <div
        ref="button-7"
        v-touch:tap="onTap"
        class="button"
      >
        7
      </div>
      <div
        ref="button-8"
        v-touch:tap="onTap"
        class="button"
      >
        8
      </div>
      <div
        ref="button-9"
        v-touch:tap="onTap"
        class="button"
      >
        9
      </div>
    </div>
    <div class="button-row">
      <div
        ref="button-4"
        v-touch:tap="onTap"
        class="button"
      >
        4
      </div>
      <div
        ref="button-5"
        v-touch:tap="onTap"
        class="button"
      >
        5
      </div>
      <div
        ref="button-6"
        v-touch:tap="onTap"
        class="button"
      >
        6
      </div>
    </div>
    <div class="button-row">
      <div
        ref="button-1"
        v-touch:tap="onTap"
        class="button"
      >
        1
      </div>
      <div
        ref="button-2"
        v-touch:tap="onTap"
        class="button"
      >
        2
      </div>
      <div
        ref="button-3"
        v-touch:tap="onTap"
        class="button"
      >
        3
      </div>
    </div>
    <div class="button-row">
      <div
        ref="button-Backspace"
        v-touch:tap="onTap"
        class="button clear"
      >
        {{ backIcon }}
      </div>
      <div
        ref="button-0"
        v-touch:tap="onTap"
        class="button"
      >
        0
      </div>
      <div
        ref="button-Enter"
        v-touch:tap="onTap"
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
      timeout: null,
    };
  },
  mounted() {
    document.addEventListener('keydown', this.onKeyDown);
    document.addEventListener('keyup', this.onKeyup);
  },
  methods: {
    onTap(e) {
      const el = e.currentTarget;
      clearTimeout(this.timeout);
      el.classList.add('pressed');
      this.timeout = setTimeout(() => {
        el.classList.remove('pressed');
      }, 200);
      this.$emit('tapped-button', el.innerText.trim());
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
      height: $block-height;
      min-height: $block-min-height;
      max-height: $block-max-height;
      background-color: $light-bg;
      border-radius: 9px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 200ms ease;
      backface-visibility: hidden;
      user-select: none;

      &:hover {
        background-color: #ecf8ff;
      }

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
        &:hover {
          background-color: #fb7755;
        }
      }
    }
  }
</style>