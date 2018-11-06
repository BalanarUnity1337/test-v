<template>
  <div class="container mb-3">
    <div
      v-if="!user"
      class="display-4 text-white text-center">Такого пользователя нет</div>

    <div v-else>
      <h3 class="text-white text-center mb-3">Редактирование пользователя</h3>

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
            v-on:click="editUser">Подтвердить</button>
        </template>
      </user-form>
    </div>

    <div class="row justify-content-between mt-3">
      <button
        class="btn btn-light"
        type="button"
        v-on:click="prevUser">Предыдущий пользователь</button>

      <button
        class="btn btn-light"
        type="button"
        v-on:click="nextUser">Следующий пользователь</button>
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

  data() {
    return {
      user: null,
      usersURI: 'http://localhost:3004/users'
    };
  },

  computed: {
    id() {
      return Number(this.$route.params.id);
    },

    userIdURI() {
      return `${this.usersURI}/${this.id}`;
    }
  },

  watch: {
    $route: 'loadUser'
  },

  mounted() {
    this.loadUser();
  },

  methods: {
    loadUser() {
      axios
        .get(this.userIdURI)
        .then(response => (this.user = response.data))
        .catch(error => {
          this.user = null;
          console.error(error);
        });
    },

    editUser() {
      axios
        .patch(this.userIdURI, this.user)
        .then(() => this.backToUsers())
        .catch(error => console.error(error));
    },

    prevUser() {
      this.switchUser(this.id - 1);
    },

    nextUser() {
      this.switchUser(this.id + 1);
    },

    switchUser(toUser) {
      this.$router.push({ name: 'editUser', params: { id: toUser } });
    },

    backToUsers() {
      this.$router.push({ path: '/users/page/1' });
    }
  }
};
</script>
