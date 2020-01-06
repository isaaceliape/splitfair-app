
export default {
  namespaced: true,
  state: {
    firstPerson: {
      name: '',
      salary: 0,
      percent: 0,
      total: 0,
    },
    secondPerson:  {
      name: '',
      salary: 0,
      percent: 0,
      total: 0,
    },
    currency: '€',
    sumOfDebts: 0,
    basePercentage: 0,
  },
  mutations: {
    updateFirstPerson(state, payload) {
      state.firstPerson = {
        ...state.firstPerson,
        ...payload,
      };
    },
    updateSecondPerson(state, payload) {
      state.secondPerson = {
        ...state.secondPerson,
        ...payload,
      };
    },
    setDebts(state, payload) {
      state.sumOfDebts = payload === '' ? 0 : payload;
    },
    setBasePercentage(state, payload) {
      state.basePercentage = payload === '' ? 0 : payload;
    },
    reset(state) {
      state.firstPerson.salary = 0;
      state.firstPerson.percent = 0;
      state.firstPerson.total = 0;
      state.secondPerson.salary = 0;
      state.secondPerson.percent = 0;
      state.secondPerson.total = 0;
      state.sumOfDebts = 0;
      state.basePercentage = 0;
    },
  },
};
