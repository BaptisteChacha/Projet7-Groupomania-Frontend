import { createStore } from 'vuex'

export default createStore({
  state: {
   token : undefined
  },
  getters: {
    receivedToken(state) {
      return `${state.token}`;
    }
  },
  mutations: {
    SET_TOKEN(state, payload) {
      state.token = payload;
      window.localStorage.setItem("token", payload);
  }
  },
  actions: {
  },
  modules: {
  }
})
