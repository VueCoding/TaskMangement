import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      counter: 0,
      isAuthCheck: !!localStorage.getItem('token'),
      user: null,
    };
  },
  mutations: {
    CHANGE_STATE_AUTH(state, isAuthenticated) {
      state.isAuthCheck = isAuthenticated;
    },
  },
  actions: {
    updateAuth({ commit }, token) {
      if (token.token) {
        localStorage.setItem('token', JSON.stringify(token));
        commit('CHANGE_STATE_AUTH', true);
      } else {
        localStorage.removeItem('token');
        commit('CHANGE_STATE_AUTH', false);
      }
    },
  },
  getters: {
    isAuthCheck: state => state.isAuthCheck,
  }
});

export default store;
