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
          :class="{ active: selectedField.value === 'firstSalary' }"
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
          :class="{ active: selectedField.value === 'secondSalary' }"
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
      :class="{ active: selectedField.value === 'expenses' }"
    >
      <div class="block label">
        Expenses
      </div>
      <div class="block value">
        <span v-if="expenses.value">
          {{ currency }}
        </span>
        <input
          v-model="expenses.value"
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
    > Split </a>

    <NumberPad
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
      v-if="showCanvas"
      :first-person="firstPerson"
      :second-person="secondPerson"
      :currency="currency"
    />
  </div>
</template>

<script>
import { ref, reactive, computed } from 'vue';
import { useStore } from 'vuex';

import NumberPad from './NumberPad.vue';
import ShareCanvas from './ShareCanvas.vue';

export default {
  components: {
    NumberPad,
    ShareCanvas,
  },
  setup() {
    const store = useStore();

    const firstSalary = ref('0');
    const secondSalary = ref('0');
    const expenses = ref(0);
    const showNumberPad = ref(true);
    const selectedField = ref('firstSalary');

    const firstPerson = computed(() => store.state.App.firstPerson);
    const secondPerson = computed(() => store.state.App.secondPerson);
    const currency = computed(() => store.state.App.currency);
    const basePercentage = computed(() => store.state.App.basePercentage);

    const disabled = computed(() => {
      return firstSalary.value === '0' || secondSalary.value === '0' || expenses.value === '0';
    });

    const shouldShowResults = computed(() => basePercentage.value !== 0);

    const firstPersonResultName = computed(() => {
      return firstPerson.value.name ? firstPerson.value.name : 'First person';
    });

    const secondPersonResultName = computed(() => {
      return secondPerson.value.name ? secondPerson.value.name : 'Second person';
    });

    const onClickClear = () => {
      firstSalary.value = '0';
      secondSalary.value = '0';
      expenses.value = '0';
      store.commit('App/reset');
    };

    const setSelectedField = (field) => {
      selectedField.value = field;
    };

    const onTapButtonNumberPad = (tappedButton) => {
      let currentField = selectedField.value;

      if (tappedButton === '<') {
        selectedField.value = '0';
        return;
      }

      if (tappedButton === 'Enter') {
        console.log('enter');
        return;
      }

      if (currentField.length > 7) return;

      selectedField.value = selectedField.value === '0'
        ? tappedButton
        : selectedField.value + tappedButton;
    };

    const calculate = () => {
      if (disabled.value) return;

      let sum = 0;
      let incrementPercent = 0;
      const format = (val, decimals = 1) => parseFloat(val.toFixed(decimals));

      const p1 = {
        salary: firstSalary.value,
        total: 0,
      };
      const p2 = {
        salary: secondSalary.value,
        total: 0,
      };

      while (sum <= expenses.value) {
        p1.total = format((Number(firstSalary.value) / 100 * incrementPercent), 0);
        p2.total = format((Number(secondSalary.value) / 100 * incrementPercent), 0);

        sum = p1.total + p2.total;
        incrementPercent += 0.01;
      }

      store.commit('App/setDebts', expenses.value);
      store.commit('App/setBasePercentage', format(incrementPercent));
      store.commit('App/updateFirstPerson', p1);
      store.commit('App/updateSecondPerson', p2);
    };

    return {
      firstSalary,
      secondSalary,
      expenses,
      showNumberPad,
      selectedField,
      firstPerson,
      secondPerson,
      currency,
      basePercentage,
      disabled,
      shouldShowResults,
      firstPersonResultName,
      secondPersonResultName,
      onClickClear,
      setSelectedField,
      onTapButtonNumberPad,
      calculate,
    };
  },
};
</script>

<style scoped>

  @import url("../styles/variables.css");

@keyframes blink-animation {
  to {
    visibility: hidden;
  }

  &.menuOpened {
    transform: translate3d(-25vw, -50%, 0);
  }

  .bg {
    background-color: $black;
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
    border: 10px solid var(--light-bg);
    box-shadow: 0px 0px 40px var(--white);
    transform: translate3d(-50%, -50%, 0);
    transition: transform 500ms ease;
    left: 50%;
    top: 50%;
    position: absolute;
  }

  .App.menuOpened {
    transform: translate3d(-25vw, -50%, 0);
  }

  .App .bg {
    background-color: var(--black);
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: -1;
    border-radius: 9px;
    left: 0;
    top: 0;
  }

  .App header {
    margin-bottom: 3px;
    border-radius: 10px 10px 0 0;
    overflow: hidden;
  }

  .App header .wrap-logo {
    display: grid;
    width: 100%;
    grid-gap: 3px;
    grid-template-columns: 1fr 1fr 1fr;
  }

  .App header .wrap-logo .logo {
    height: 70%;
  }

  .App .block {
    background-color: var(--light-bg);
    box-sizing: border-box;
    border-radius: 9px;
    padding: 0 29px;
    display: flex;
    height: var(--block-height);
    min-height: var(--block-min-height);
    max-height: var(--block-max-height);
    justify-content: center;
    align-items: center;
  }

  .App .input {
    background-color: transparent;
    border: 0;
    width: 100%;
    height: 100%;
    text-align: center;
    font-size: 24px;
    outline: none;
    position: relative;
  }

  .App .input::-webkit-outer-spin-button,
  .App .input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  .App .input[type=number] {
    -moz-appearance: textfield;
    appearance: textfield;
  }

  .App .input::placeholder {
    color: var(--gray);
  }

  .App .input.firstSalaryField,
  .App .input.secondSalaryField {
    color: var(--green);
  }

  .App .input.expensesField {
    color: var(--red);
  }

  .App .split-btn {
    height: var(--block-height);
    min-height: var(--block-min-height);
    max-height: var(--block-max-height);
    width: 100%;
    font-style: normal;
    font-weight: normal;
    font-size: 24px;
    line-height: 24px;
    text-align: center;
    background-color: var(--blue);
    color: var(--light-bg);
    border: 0;
    outline: 0;
    margin-bottom: 3px;
    cursor: url(../assets/cursor-red.png), auto;
  }

  .App .split-btn:hover,
  .App .split-btn:focus {
    background-color: var(--split-btn-hover);
  }

  .incomings {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .wrap-income {
    display: grid;
    grid-gap: 3px;
    grid-template-columns: minmax(43%, 1fr) minmax(calc(57% - 3px), 1fr);
    height: var(--block-height);
    min-height: var(--block-min-height);
    max-height: var(--block-max-height);
    margin-bottom: 3px;
  }

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
    color: var(--green);
    justify-content: flex-end;
  }

  .firstSalaryField {
    height: 100%;
  }

  .expenses {
    display: grid;
    grid-gap: 3px;
    grid-template-columns: minmax(43%, 1fr) minmax(calc(57% - 3px), 1fr);
    height: var(--block-height);
    min-height: var(--block-min-height);
    max-height: var(--block-max-height);
    margin-bottom: 3px;
  }

  .expenses.active .value::before {
    opacity: 1;
    animation: blink-animation 1s steps(5, start) infinite;
  }

  .expenses .label {
    background-color: var(--red);
    color: var(--black);
  }

  .expenses .value {
    background-color: var(--black);
    color: var(--red);
    justify-content: flex-end;
    position: relative;
  }

  .expenses .value::before {
    content: '';
    width: 4px;
    height: 40px;
    background-color: var(--red);
    margin-right: 5px;
    opacity: 0;
    display: inline-block;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  }

  .results {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .results .title {
    margin-bottom: 3px;
  }

  .results .wrap-results {
    display: grid;
    grid-gap: 3px;
    grid-template-columns: minmax(43%, 1fr) minmax(calc(57% - 3px), 1fr);
    height: var(--block-height);
    min-height: var(--block-min-height);
    max-height: var(--block-max-height);
    margin-bottom: 3px;
  }

  .results .wrap-results .value {
    justify-content: flex-end;
    color: var(--blue);
  }

  .results .percent-each {
    margin-bottom: 3px;
  }

  .results .wrap-buttons {
    display: grid;
    grid-gap: 3px;
    grid-template-columns: minmax(calc(67% - 3px), 1fr) minmax(33%, 1fr);
    height: var(--block-height);
    min-height: var(--block-min-height);
    max-height: var(--block-max-height);
    margin-bottom: 3px;
  }

  .results .wrap-buttons .share {
    background-color: var(--blue);
    color: var(--white);
  }

  .results .wrap-buttons .clear {
    background-color: var(--red);
    color: var(--black);
  }

</style>
