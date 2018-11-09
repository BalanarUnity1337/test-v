<template>
  <div class="container mb-3">
    <h3 class="text-white text-center mb-3">Добавление пользователя {{ $store.state.user.firstName }} {{ $store.state.user.lastName }}</h3>

    <user-form
      v-model="user"
      v-on:send-form="addUser">
      <template
        slot="footer-buttons"
        slot-scope="{ sendForm }">
        <button
          type="button"
          class="btn btn-light mr-4"
          v-on:click="backToUsers">Назад</button>

        <button
          type="button"
          class="btn btn-light"
          v-on:click="sendForm">Добавить пользователя</button>
      </template>
    </user-form>
  </div>
</template>

<script>
import axios from '@/axios.js';
import { format } from 'date-fns';

export default {
  name: 'AddUserPage',

  components: {
    'user-form': () => import('@/components/UserForm.vue')
  },

  data() {
    return {
      user: {
        isActive: false,
        balance: '$0',
        picture: '',
        birthday: '',
        accessLevel: 'guest',
        firstName: '',
        lastName: '',
        company: '',
        email: '',
        phone: '',
        address: '',
        about: ''
      }
    };
  },

  methods: {
    addUser() {
      this.user.registered = format(new Date(), 'DD.MM.YYYY');

      axios
        .post('/users', this.user)
        .then(() => this.$store.commit('addUser', this.user))
        .then(() => this.backToUsers())
        .catch(error => console.error(error));
    },

    backToUsers() {
      this.$router.push({ name: 'users' });
    }
  }
};
</script>
