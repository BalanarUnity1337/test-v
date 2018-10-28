<template>
  <div class="container">
    <h3 class="text-white text-center mb-3">Добавление пользователя</h3>

    <user-form v-bind:user="user" />

    <button type="button" class="btn btn-light mb-3" v-on:click="addUser">Добавить пользователя</button>
  </div>
</template>

<script>
import UserForm from '@/components/UserForm.vue';
import axios from 'axios';
import moment from 'moment';

export default {
  name: 'AddUserPage',

  components: {
    'user-form': UserForm
  },

  data: function() {
    return {
      user: {}
    };
  },

  methods: {
    addUser: function() {
      this.user.registered = moment().format('DD.MM.YYYY');

      axios
        .post('http://localhost:3004/users', this.user, {
          headers: { 'Content-Type': 'application/json' }
        })
        .then(() => this.$router.push({ path: '/users' }))
        .catch(error => console.error(error));
    }
  }
};
</script>
