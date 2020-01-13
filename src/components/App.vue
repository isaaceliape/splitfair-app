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
          >
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
          <input
            v-model="secondPerson.name"
            type="text"
            placeholder="Name"
          >
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

      if (currentField.length > 7) return;

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
    font-family: Helvetica;
    font-size: 24px;
    border-radius: 9px;
    position: relative;
    border: 10px solid $light-bg;
    box-shadow: 0px 0px 40px $white;
    transition: transform 500ms ease;
    margin-top: 5vh;
    padding-bottom: 38px;

    @media #{$media-query-mobile} {
      border: 0;
      box-shadow: none;
      border-radius: 0;
      width: 100vw;
      max-width: 100vw;
      margin-top: 0;
      padding: 38px 0;
    }

    &.menuOpened {
      transform: translateX(-25vw);
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
          justify-content: center;

          input {
            background-color: transparent;
            border: 0;
            height: 100%;
            text-align: center;
            font-size: 24px;
            color: $black;
            outline: none;

            &::placeholder {
              color: $gray;
            }
          }
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
    }
  }
</style>
