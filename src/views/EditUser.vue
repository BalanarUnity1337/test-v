<template>
  <div class="container mb-3">
    <div
      v-if="!user"
      class="display-4 text-white text-center">Такого пользователя нет</div>

    <div v-else>
      <h3 class="text-white text-center mb-3">Редактирование пользователя</h3>

      <user-form
        v-model="user"
        v-on:send-form="editUser">
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
            v-on:click="sendForm">Подтвердить</button>
        </template>
      </user-form>
    </div>

    <div class="row justify-content-between mt-3">
      <button
        v-bind:disabled="isPrevBtnDisabled"
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
import axios from '@/axios.js';

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

    isPrevBtnDisabled() {
      return this.id < 1;
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
        .get(`/users/${this.id}`)
        .then(response => (this.user = response.data))
        .catch(error => {
          this.user = null;
          console.error(error);
        });
    },

    editUser() {
      axios
        .patch(`/users/${this.id}`, this.user)
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
      this.$router.push({ name: 'users' });
    }
  }
};
</script>
