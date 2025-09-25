/* eslint-disable */
import { mapState, mapMutations } from 'vuex';
import Numberpad from './NumberPad.vue';
import ShareCanvas from './ShareCanvas.vue';

export default {
  name: 'SplitfairApp',
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
    ...mapState('App', ['firstPerson', 'secondPerson', 'currency', 'sumOfDebts', 'basePercentage']),
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
    },
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
      }
      if (tappedButton === 'Enter') {
        console.log('enter');
        return;
      }

      if (currentField.length > 7) return;
      this[this.selectedField] =
        this[this.selectedField] === '0' ? tappedButton : this[this.selectedField] + tappedButton;
    },
    calculate() {
      if (this.disabled) return;
      let sum = 0;
      let incrementPercent = 0;
      const format = (val, decimals = 1) => parseFloat(val.toFixed(decimals));
      const p1 = { salary: this.firstSalary, total: 0 };
      const p2 = { salary: this.secondSalary, total: 0 };
      while (sum <= this.expenses) {
        p1.total = format((Number(this.firstSalary) / 100) * incrementPercent, 0);
        p2.total = format((Number(this.secondSalary) / 100) * incrementPercent, 0);
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
/* eslint-disable */
