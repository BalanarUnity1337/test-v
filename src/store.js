import Vue from 'vue';
import Vuex from 'vuex';
import axios from '@/axios.js';

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    users: []
  },
  mutations: {
    setUsers: (state, payload) => (state.users = payload),
    addUser: (state, payload) => state.users.push(payload)
  },
  actions: {
    getUsers(context) {
      axios
        .get('/users')
        .then(response => context.commit('setUsers', response.data))
        .catch(error => console.error(error));
    }
  }
});

export default store;
