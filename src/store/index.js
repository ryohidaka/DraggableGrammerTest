import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

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
    test: (state) => (id) => {
      return state.tests.find((test) => {
        return test.id == id;
      });
    },
    newId: (state) => {
      return state.tests.length + 1;
    },
  },
  actions: {},
  modules: {},
  plugins: [createPersistedState()],
});
