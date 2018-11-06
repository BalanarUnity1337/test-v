<template>
  <div class="container mb-3">
    <h3 class="text-white text-center mb-3">Добавление пользователя</h3>

    <user-form
      v-model="user">
      <template
        slot="footer-buttons"
        slot-scope="{ hasError }">
        <button
          type="button"
          class="btn btn-light mr-4"
          v-on:click="backToUsers">Назад</button>

        <button
          v-bind:disabled="hasError"
          type="button"
          class="btn btn-light"
          v-on:click="addUser">Добавить пользователя</button>
      </template>
    </user-form>
  </div>
</template>

<script>
import axios from 'axios';
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
      },

      usersURI: 'http://localhost:3004/users/'
    };
  },

  methods: {
    addUser() {
      this.user.registered = format(new Date(), 'DD.MM.YYYY');

      axios
        .post(this.usersURI, this.user)
        .then(() => this.backToUsers())
        .catch(error => console.error(error));
    },

    backToUsers() {
      this.$router.push({ path: '/users/page/1' });
    }
  }
};
</script>
