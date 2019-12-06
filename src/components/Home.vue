<template>
  <div class="Home">
    <h1>Split smart 💰</h1>
    <div class="wrap-inputs">
      <div class="input-block">
        <h2 class="label">
          {{ firstPerson.name }}:
        </h2>
        <input
          v-model.number="firstSalary"
          type="number"
          class="input"
          placeholder="Salary"
        >
      </div>
      <div class="input-block">
        <h2 class="label">
          {{ secondPerson.name }}:
        </h2>
        <input
          v-model.number="secondSalary"
          type="number"
          class="input"
          placeholder="Salary"
        >
      </div>
      <div class="input-block">
        <h2 class="label">
          Sum of debts:
        </h2>
        <input
          v-model.number="sumOfDebtsState"
          type="number"
          class="input"
          placeholder="Debts"
        >
      </div>
    </div>
    <button
      class="updateButton"
      :disabled="disabled"
      @click="calculate"
    >
      Calculate
    </button>
    <hr>
    <div class="wrapResult">
      <div class="wrapResult__title">
        <h2>{{ firstPerson.name }}</h2>
        <h2>{{ secondPerson.name }}</h2>
      </div>
      <div class="wrapResult__numbers">
        <span class="firstResult"><b>Total:</b> %{{ firstPerson.percent }}</span> 
        <span class="secondResult"><b>Total:</b> %{{ secondPerson.percent }}</span> 
      </div>
      <div class="wrapResult__numbers">
        <span class="firstResult"><b>Total to pay:</b> {{ currency }}{{ firstPerson.total }}</span> 
        <span class="secondResult"><b>Total to pay:</b> {{ currency }}{{ secondPerson.total }}</span> 
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  props: {
    msg: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      firstSalary: '',
      secondSalary: '',
      sumOfDebtsState: '',
    };
  },
  computed: {
    ...mapState('App', [
      'firstPerson',
      'secondPerson',
      'currency',
      'sumOfDebts',
    ]),
    disabled() {
      const { firstSalary, secondSalary, sumOfDebtsState } = this;
      return firstSalary === '' || secondSalary === '' || sumOfDebtsState === '';
    }
  },
  methods: {
    ...mapMutations('App', [
      'updateFirstPerson',
      'updateSecondPerson',
      'setBasePercentage',
      'setDebts',
    ]),
    calculate() {
      if (this.disabled) return;

      let sum = 0;
      let count = 0;
      const p1 = {
        salary: this.firstSalary,
        percent: 0,
        total: 0,
      };
      const p2 = {
        salary: this.secondSalary,
        percent: 0,
        total: 0,
      };

      while(sum <= this.sumOfDebtsState) {
        p1.total = parseFloat((this.firstSalary / 100 * count).toFixed(0));
        p2.total = parseFloat((this.secondSalary / 100 * count).toFixed(0));
        
        p1.percent = parseFloat((p1.total / this.sumOfDebtsState * 100).toFixed(0)),
        p2.percent = parseFloat((p2.total / this.sumOfDebtsState * 100).toFixed(0)),

        sum = p1.total + p2.total;
        count += 0.1; 
      }

      this.setDebts(this.sumOfDebtsState);
      this.setBasePercentage(p1.percent);
      this.updateFirstPerson(p1);
      this.updateSecondPerson(p2);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .Home {
    max-width: 440px;
    margin: 0 auto;
    padding: 0 0 40px 0;

    hr {
      width: 80%;
      border: 0;
      height: 1px;
      margin: 20px auto;
      background-color: #ccc;
    }
    h2 {
      font-size: 22px;
    }
    .updateButton {
      padding: 7px 10px 11px 10px;
      border-radius: 5px;
      font-size: 24px;
      background-color: #2c3e50;
      color: white;
      cursor: pointer;
      
      &[disabled="disabled"] {
        opacity: 0.7;
        cursor: not-allowed;
      }
      &:hover {
        opacity: 0.8;
      }
    }
    .input-block {
      display: flex;
      flex-direction: row;
      align-items: center;
      width: 360px;
      margin: 0 auto 10px auto;
      padding: 0;
    }
    .input-block {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
    .label {
      margin: 0 10px 0 0;
    }
    .input {
      height: 30px;
      border: 1px solid gray;
      border-radius: 3px; 
      font-size: 14px;
      box-sizing: border-box;
      padding: 0 10px;
      text-align: center;
    }
    .wrapResult {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      margin: 0 auto;
    }
    .wrapResult__title {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
    }
    .wrapResult__numbers {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
    }
  }
</style>
