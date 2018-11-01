<template>
  <div class="container mb-3">
    <div
      v-if="!user"
      class="display-4 text-white text-center">Такого пользователя нет</div>

    <div v-else>
      <h3 class="text-white text-center mb-3">Редактирование пользователя</h3>

      <user-form
        v-model="user" />

      <button
        type="button"
        class="btn btn-light mb-3"
        v-on:click="editUser">Подтвердить</button>

      <div class="row justify-content-between">
        <button
          v-bind:disabled="!isPrevBtnActive"
          class="btn btn-light"
          v-on:click="switchUser(id - 1)">Предыдущий пользователь</button>

        <button
          v-bind:disabled="!isNextBtnActive"
          class="btn btn-light"
          v-on:click="switchUser(id + 1)">Следующий пользователь</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'EditUserPage',

  components: {
    'user-form': () => import('@/components/UserForm.vue')
  },

  data: function() {
    return {
      user: null,
      usersURI: 'http://localhost:3004/users',
      isNextBtnActive: true
    };
  },

  computed: {
    id: function() {
      return Number(this.$route.params.id);
    },

    userIdURI: function() {
      return `${this.usersURI}/${this.id}`;
    },

    isPrevBtnActive: function() {
      return this.id > 0;
    }
  },

  watch: {
    $route: 'loadUser'
  },

  mounted: function() {
    this.loadUser();
  },

  methods: {
    loadUser: function() {
      axios
        .get(this.userIdURI)
        .then(response => (this.user = response.data))
        .catch(error => console.error(error));
    },

    editUser: function() {
      axios
        .patch(this.userIdURI, this.user)
        .then(() => this.$router.push({ path: '/users' }))
        .catch(error => console.error(error));
    },

    switchUser: function(toUser) {
      this.$router.push({ name: 'editUser', params: { id: toUser } });
    }
  }
};
</script>
