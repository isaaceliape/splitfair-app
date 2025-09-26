const store = {
  state: {
    firstPerson: {
      name: 'person 1',
      salary: 0,
      percent: 0,
      total: 0,
    },
    secondPerson: {
      name: 'person 2',
      salary: 0,
      percent: 0,
      total: 0,
    },
    currency: '€',
    sumOfDebts: 0,
    basePercentage: 0,
  },
  mutations: {
    updateFirstPerson(payload) {
      this.state.firstPerson = {
        ...this.state.firstPerson,
        ...payload,
      };
    },
    updateSecondPerson(payload) {
      this.state.secondPerson = {
        ...this.state.secondPerson,
        ...payload,
      };
    },
    setDebts(payload) {
      this.state.sumOfDebts = payload === '' ? 0 : payload;
    },
    setBasePercentage(payload) {
      this.state.basePercentage = payload === '' ? 0 : payload;
    },
    reset() {
      this.state.firstPerson.salary = 0;
      this.state.firstPerson.percent = 0;
      this.state.firstPerson.total = 0;
      this.state.secondPerson.salary = 0;
      this.state.secondPerson.percent = 0;
      this.state.secondPerson.total = 0;
      this.state.sumOfDebts = 0;
      this.state.basePercentage = 0;
    },
  },
};

export default store;
