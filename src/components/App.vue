<template>
  <div class="App">
    <header>
      <div class="block forehead" />
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
          {{ firstPerson.name }}
        </h2>
        <div
          class="block income"
          @click="setSelectedField('firstSalary')"
        >
          {{ currency }}{{ firstSalary }}
        </div>
      </div>
      <div class="wrap-income">
        <h2 class="block label">
          {{ secondPerson.name }}
        </h2>
        <div
          class="block income"
          @click="setSelectedField('secondSalary')"
        >
          {{ currency }}{{ secondSalary }}
        </div>
      </div>
    </section>

    <section class="expenses">
      <div class="block label">
        Expenses
      </div>
      <div
        class="block value"
        @click="setSelectedField('sumOfDebtsState')"
      >
        {{ currency }}{{ sumOfDebtsState }}
      </div>
    </section>

    <button
      class="block split-btn"
      :disabled="disabled"
      @click="calculate"
    >
      Split
    </button>

    <Numberpad
      v-if="showNumberpad && !shouldShowResults"
      @tapped-button="onTapButtonNumberpad"
    />

    <section
      v-if="shouldShowResults"
      class="results"
    >
      <div class="block title">Results</div>
      <div class="wrap-results">
        <div class="block label">{{ firstPerson.name }}</div>
        <div class="block value">{{ currency }}{{ firstPerson.total }}</div>
      </div>
      <div class="wrap-results">
        <div class="block label">{{ secondPerson.name }}</div>
        <div class="block value">{{ currency }}{{ secondPerson.total }}</div>
      </div>
      <div class="block percent-each">%{{ basePercentage }} each</div>
      <div class="wrap-buttons">
        <div class="block share">Share</div>
        <div
          class="block clear"
          @click="onClickClear"
        >
          Clear
        </div>
      </div>
    </section>

    <div class="block chin" />
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

import Numberpad from './Numberpad.vue';

export default {
  components: {
    Numberpad,
  },
  data() {
    return {
      firstSalary: '0',
      secondSalary: '0',
      sumOfDebtsState: '0',
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
      const { firstSalary, secondSalary, sumOfDebtsState } = this;
      return firstSalary === '0' || secondSalary === '0' || sumOfDebtsState === '0';
    },
    shouldShowResults() {
      return this.basePercentage !== 0;
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
      this.sumOfDebtsState = '0';
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

      this[this.selectedField] = this[this.selectedField] === '0'
        ? tappedButton
        : this[this.selectedField] + tappedButton;
    },
    calculate() {
      console.log('calculate');
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

      while(sum <= this.sumOfDebtsState) {
        p1.total = format((Number(this.firstSalary) / 100 * incrementPercent), 0);
        p2.total = format((Number(this.secondSalary) / 100 * incrementPercent), 0);

        sum = p1.total + p2.total;
        incrementPercent += 0.01; 
      }

      this.setDebts(this.sumOfDebtsState);
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

  .App {
    width: 100%;
    max-width: 414px;
    margin: 0 auto;
    padding: 3px;
    box-sizing: border-box;
    background-color: $dark-bg;
    font-family: Helvetica;
    font-size: 24px;

    header {
      margin-bottom: 3px;
      .wrap-logo {
        display: grid;
        width: 100%;
        grid-gap: 3px;
        grid-template-columns: 1fr 1fr 1fr;

        .block-02,
        .block-03,
        .block-04 {
          height: 120px;
          display: flex;
        }
        .block-03 {
          width: 232px;
          display: flex;
          justify-content: center;
        }
      }
    }

    .block {
      background-color: $light-bg;
      box-sizing: border-box;
      border-radius: 9px;
      padding: 0 29px;
      display: flex;
      height: 84px;
      justify-content: center;
      align-items: center;
    }

    .forehead {
      width: 100%;
      height: 34px;
      border-radius: 30px 30px 9px 9px;
      margin-bottom: 3px;
    }

    .chin {
      width: 100%;
      height: 34px;
      border-radius: 9px 9px 30px 30px;
      margin-bottom: 3px;
    }

    .incomings {
      display: flex;
      flex-direction: column;
      width: 100%;

      .wrap-income{
        display: grid;
        grid-gap: 3px;
        grid-template-columns: minmax(43%, 1fr) minmax(calc(57% - 3px), 1fr);
        height: 84px;
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
          color: $gray;
          justify-content: center;
        }
        .income {
          color: $green;
          justify-content: flex-end;
        }
      }
    }

    .expenses {
      display: grid;
      grid-gap: 3px;
      grid-template-columns: minmax(43%, 1fr) minmax(calc(57% - 3px), 1fr);
      height: 84px;
      margin-bottom: 3px;

      .label {
        background-color: $red;
        color: $black;
      }
      .value {
        background-color: $black;
        color: $red;
        justify-content: flex-end;
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
        height: 84px;
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
        height: 84px;
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
      height: 84px;
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

      &[disabled] {
        opacity: 0.7;
        outline: 1px solid red;
      }
    }
  }
</style>
