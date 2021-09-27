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
    edit(state, payload) {
      const index = state.tests.findIndex((v) => v.id === payload.id);
      state.tests.splice(index, 1, payload);
    },
    deleteById(state, payload) {
      state.tests = state.tests.filter((v) => v.id != payload);
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
  },
  actions: {},
  modules: {},
  plugins: [createPersistedState()],
});
