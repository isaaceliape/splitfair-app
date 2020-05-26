<template>
  <div class="App">
    <div class="bg" />
    <header>
      <div class="wrap-logo">
        <div class="block block-02" />
        <div class="block block-03">
          <img
            src="../assets/logo.svg"
            alt="logo"
            class="logo"
          >
        </div>
        <div class="block block-04" />
      </div>
    </header>

    <section class="incomings">
      <div class="wrap-income">
        <h2 class="block label">
          <input
            v-model="firstPerson.name"
            type="text"
            placeholder="Name"
            tabindex="1"
            class="input"
            autofocus
          >
        </h2>
        <div
          class="block income"
          :class="{ active: selectedField === 'firstSalary' }"
        >
          <span v-if="firstPerson.firstSalary">
            {{ currency }}
          </span>
          <input
            :value="firstPerson.firstSalary"
            type="text"
            placeholder="salary"
            tabindex="3"
            class="input firstSalaryField"
            @focus="setSelectedField('firstSalary')"
          >
        </div>
      </div>
      <div class="wrap-income">
        <h2 class="block label">
          <input
            v-model="secondPerson.name"
            type="text"
            placeholder="Name"
            tabindex="2"
            class="input"
          >
        </h2>
        <div
          class="block income"
          :class="{ active: selectedField === 'secondSalary' }"
        >
          <span v-if="firstPerson.secondSalary">
            {{ currency }}
          </span>
          <input
            v-model="firstPerson.secondSalary"
            type="number"
            placeholder="salary"
            tabindex="4"
            class="input secondSalaryField"
            @focus="setSelectedField('secondSalary')"
          >
        </div>
      </div>
    </section>

    <section
      class="expenses"
      :class="{ active: selectedField === 'expenses' }"
    >
      <div class="block label">
        Expenses
      </div>
      <div class="block value">
        <span v-if="expenses">
          {{ currency }}
        </span>
        <input
          v-model="expenses"
          type="text"
          placeholder="expenses"
          tabindex="5"
          class="input expensesField"
          @focus="setSelectedField('expenses')"
        >
      </div>
    </section>

    <a
      class="block split-btn"
      tabindex="6"
      @click="calculate"
    >
      Split
    </a>

    <Numberpad
      v-if="showNumberpad && !shouldShowResults"
      @tapped-button="onTapButtonNumberpad"
    />

    <section
      v-if="shouldShowResults"
      class="results"
    >
      <div class="block title">
        Results
      </div>
      <div class="wrap-results">
        <div class="block label">
          {{ firstPersonResultName }}
        </div>
        <div class="block value">
          {{ currency }}{{ firstPerson.total }}
        </div>
      </div>
      <div class="wrap-results">
        <div class="block label">
          {{ secondPersonResultName }}
        </div>
        <div class="block value">
          {{ currency }}{{ secondPerson.total }}
        </div>
      </div>
      <div class="block percent-each">
        %{{ basePercentage }} each
      </div>
      <div class="wrap-buttons">
        <div class="block share">
          Share
        </div>
        <div
          class="block clear"
          @click="onClickClear"
        >
          Clear
        </div>
      </div>
    </section>

    <ShareCanvas
      :first-person="firstPerson"
      :second-person="secondPerson"
      :currency="currency"
    />
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

import Numberpad from './Numberpad.vue';
import ShareCanvas from './ShareCanvas.vue';

export default {
  components: {
    Numberpad,
    ShareCanvas,
  },
  data() {
    return {
      firstSalary: '0',
      secondSalary: '0',
      expenses: 0,
      showNumberpad: true,
      selectedField: 'firstSalary',
    };
  },
  computed: {
    ...mapState('App', [
      'firstPerson',
      'secondPerson',
      'currency',
      'sumOfDebts',
      'basePercentage',
    ]),
    disabled() {
      const { firstSalary, secondSalary, expenses } = this;
      return firstSalary === '0' || secondSalary === '0' || expenses === '0';
    },
    shouldShowResults() {
      return this.basePercentage !== 0;
    },
    firstPersonResultName() {
      return this.firstPerson.name ? this.firstPerson.name : 'First person';
    },
    secondPersonResultName() {
      return this.secondPerson.name ? this.secondPerson.name : 'Second person';
    }
  },
  methods: {
    ...mapMutations('App', [
      'updateFirstPerson',
      'updateSecondPerson',
      'setBasePercentage',
      'setDebts',
      'reset',
    ]),
    onClickClear() {
      this.firstSalary = '0';
      this.secondSalary = '0';
      this.expenses = '0';
      this.reset();
    },
    setSelectedField(field) {
      this.selectedField = field; 
    },
    onTapButtonNumberpad(tappedButton) {
      let currentField = this[this.selectedField];

      if (tappedButton === '<') {
        this[this.selectedField] = '0';
        return;
      };

      if (tappedButton === 'Enter') {
        console.log('enter');
        return;
      }

      if (currentField.length > 7) return;

      this[this.selectedField] = this[this.selectedField] === '0'
        ? tappedButton
        : this[this.selectedField] + tappedButton;
    },
    calculate() {
      if (this.disabled) return;

      let sum = 0;
      let incrementPercent = 0;
      const format = (val, decimals = 1) => parseFloat(val.toFixed(decimals));

      const p1 = {
        salary: this.firstSalary,
        total: 0,
      };
      const p2 = {
        salary: this.secondSalary,
        total: 0,
      };

      while(sum <= this.expenses) {
        p1.total = format((Number(this.firstSalary) / 100 * incrementPercent), 0);
        p2.total = format((Number(this.secondSalary) / 100 * incrementPercent), 0);

        sum = p1.total + p2.total;
        incrementPercent += 0.01; 
      }

      this.setDebts(this.expenses);
      this.setBasePercentage(format(incrementPercent));
      this.updateFirstPerson(p1);
      this.updateSecondPerson(p2);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import '../styles/variables';

  @keyframes blink-animation {
    to {
      visibility: hidden;
    }
  }
  @-webkit-keyframes blink-animation {
    to {
      visibility: hidden;
    }
  }

  .App {
    width: 100%;
    max-width: 414px;
    margin: 0 auto;
    padding: 3px;
    box-sizing: border-box;
    font-family: Helvetica;
    font-size: 24px;
    border-radius: 9px;
    padding-bottom: 38px;
    position: relative;
    border: 10px solid $light-bg;
    box-shadow: 0px 0px 40px $white;
    transform: translate3d(-50%, -50%, 0);
    transition: transform 500ms ease;
    left: 50%;
    top: 50%;
    position: absolute;

    @media #{$media-query-mobile} {
      border: 0;
      box-shadow: none;
      border-radius: 0;
      width: 100vw;
      max-width: 100vw;
      margin-top: 0;
      padding: 38px 0 38px 0;
    }

    &.menuOpened {
      transform: translate3d(-25vw, -50%, 0);
    }

    .bg {
      background-color: $black;
      width: 100%;
      height: 100%;
      position: absolute;
      z-index: -1;
      border-radius: 9px;
      left: 0;
      top: 0;

      @media #{$media-query-mobile} {
        border-radius: 0;
      }
    }

    header {
      margin-bottom: 3px;
      border-radius: 10px 10px 0 0;
      overflow: hidden;
      .wrap-logo {
        display: grid;
        width: 100%;
        grid-gap: 3px;
        grid-template-columns: 1fr 1fr 1fr;

        .logo {
          height: 70%;
        }

        .block-02,
        .block-03,
        .block-04 {
          height: $block-height-header;
          display: flex;
        }
        .block-03 {
          width: 232px;
          display: flex;
          justify-content: center;
          @media #{$media-query-mobile} {
            width: 62vw;
          }
        }
      }
    }

    .block {
      background-color: $light-bg;
      box-sizing: border-box;
      border-radius: 9px;
      padding: 0 29px;
      display: flex;
      height: $block-height;
      min-height: $block-min-height;
      max-height: $block-max-height;
      justify-content: center;
      align-items: center;
    }

    .input {
      background-color: transparent;
      border: 0;
      width: 100%;
      height: 100%;
      text-align: center;
      font-size: 24px;
      outline: none;
      position: relative;

      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
      &[type=number] {
        -moz-appearance: textfield;
      }

      &::placeholder {
        color: $gray;
      }

      &.firstSalaryField,
      &.secondSalaryField {
        color: $green;
      }
      &.expensesField {
        color: $red;
      }
    }

    .incomings {
      display: flex;
      flex-direction: column;
      width: 100%;

      .wrap-income{
        display: grid;
        grid-gap: 3px;
        grid-template-columns: minmax(43%, 1fr) minmax(calc(57% - 3px), 1fr);
        height: $block-height;
        min-height: $block-min-height;
        max-height: $block-max-height;
        margin-bottom: 3px;

        .label,
        .income {
          display: flex;
          align-items: center;
          font-style: normal;
          font-weight: normal;
          font-size: 24px;
          line-height: 24px;
          text-align: center;
        }
        .label {
          justify-content: center;
        }
        .income {
          color: $green;
          justify-content: flex-end;
          &:focus {
            background-color: red;
          }
        }
        .firstSalaryField {
          height: 100%;
        }
      }
    }

    .expenses {
      display: grid;
      grid-gap: 3px;
      grid-template-columns: minmax(43%, 1fr) minmax(calc(57% - 3px), 1fr);
      height: $block-height;
      min-height: $block-min-height;
      max-height: $block-max-height;
      margin-bottom: 3px;
      &.active {
        .value {
          &::before {
            opacity: 1;
            animation: blink-animation 1s steps(5, start) infinite;
          }
        }
      }

      .label {
        background-color: $red;
        color: $black;
      }
      .value {
        background-color: $black;
        color: $red;
        justify-content: flex-end;

        &::before {
          content: '';
          width: 4px;
          height: 40px;
          background-color: $red;
          margin-right: 5px;
          opacity: 0;
        }
      }
    }

    .results {
      display: flex;
      flex-direction: column;
      width: 100%;
      .title {
        margin-bottom: 3px;
      }
      .wrap-results {
        display: grid;
        grid-gap: 3px;
        grid-template-columns: minmax(43%, 1fr) minmax(calc(57% - 3px), 1fr);
        height: $block-height;
        min-height: $block-min-height;
        max-height: $block-max-height;
        margin-bottom: 3px;

        .value {
          justify-content: flex-end;
          color: $blue;
        }
      }
      .percent-each {
        margin-bottom: 3px;
      }
      .wrap-buttons {
        display: grid;
        grid-gap: 3px;
        grid-template-columns: minmax(calc(67% - 3px), 1fr) minmax(33%, 1fr) ;
        height: $block-height;
        min-height: $block-min-height;
        max-height: $block-max-height;
        margin-bottom: 3px;

        .share {
          background-color: $blue;
          color: $white;
        }
        .clear {
          background-color: $red;
          color: $black;
        }
      }
    }

    .split-btn {
      height: $block-height;
      min-height: $block-min-height;
      max-height: $block-max-height;
      width: 100%;
      font-style: normal;
      font-weight: normal;
      font-size: 24px;
      line-height: 24px;
      text-align: center;
      background-color: $blue;
      color: $light-bg;
      border: 0;
      outline: 0;
      margin-bottom: 3px;
      cursor: url(../assets/cursor-red.png), auto;
      &:hover,
      &:focus {
        background-color: #26adef;
      }
    }
  }
</style>
