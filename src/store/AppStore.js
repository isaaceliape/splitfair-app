
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

      const percent = parseInt(payload).toFixed(0);
      state.secondPerson = {
        ...state.secondPerson,
        ...payload,
      };
    },
    setDebts(state, payload) {
      state.sumOfDebts = payload === '' ? 0 : payload;
    },
    setBasePercentage(state, payload) {
      const percent = parseInt(payload).toFixed(0);
      state.basePercentage = percent === '' ? 0 : payload;
    },
  },
};
