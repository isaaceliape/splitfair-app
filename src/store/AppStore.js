
export default {
  namespaced: true,
  state: {
    firstPerson: {
      name: 'First Person',
      salary: 0,
      percent: 0,
      total: 0,
    },
    secondPerson:  {
      name: 'Second Person',
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
  },
};
