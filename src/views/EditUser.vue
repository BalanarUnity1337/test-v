<template>
  <div class="container">
    <div class="display-4 text-white text-center" v-if="!user">Такого пользователя нет</div>

    <div v-else>
      <h3 class="text-white text-center mb-3">Редактирование пользователя</h3>

      <user-form v-bind:user="user" />

      <button type="button" class="btn btn-light mb-3" v-on:click="editUser">Подтвердить</button>
    </div>
  </div>
</template>

<script>
import UserForm from '@/components/UserForm.vue';
import axios from 'axios';

export default {
  name: 'EditUserPage',

  components: {
    'user-form': UserForm
  },

  data: function() {
    return {
      user: null,
      id: this.$route.params.id
    };
  },

  watch: {
    id: {
      handler: 'getUserById',
      immediate: true
    }
  },

  methods: {
    getUserById: function() {
      axios
        .get('http://localhost:3004/users/' + this.id)
        .then(response => (this.user = response.data))
        .catch(error => console.error(error));
    },

    editUser: function() {
      axios
        .patch('http://localhost:3004/users/' + this.id, this.user, {
          headers: { 'Content-Type': 'application/json' }
        })
        .then(() => this.$router.push({ path: '/users' }))
        .catch(error => console.error(error));
    }
  }
};
</script>
