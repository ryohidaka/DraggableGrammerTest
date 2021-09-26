import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tests: [],
  },
  mutations: {
    add(state, payload) {
      state.tests.push(payload);
    },
  },
  getters: {
    tests: (state) => {
      return state.tests;
    },
  },
  actions: {},
  modules: {},
});
