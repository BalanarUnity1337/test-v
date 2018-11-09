<template>
  <div class="container">
    <div
      v-if="!isUsersExists"
      class="display-4 text-white text-center">Список пользователей пока пуст</div>

    <div v-else>
      <h3 class="text-white">Список пользователей</h3>

      <smart-table
        v-bind:users="users"
        v-on:update-table="getUsers"
        v-on:remove-user="removeUser" />
    </div>
  </div>
</template>

<script>
import axios from '@/axios.js';

export default {
  name: 'UsersPage',

  components: {
    'smart-table': () => import('@/components/SmartTable.vue')
  },

  computed: {
    users() {
      return this.$store.state.users;
    },

    isUsersExists() {
      return this.users.length > 0;
    }
  },

  mounted() {
    this.getUsers();
  },

  methods: {
    getUsers() {
      this.$store.dispatch('getUsers');
    },

    removeUser(id) {
      axios
        .delete(`/users/${id}`)
        .then(() =>
          this.$store.commit(
            'setUsers',
            this.users.filter(user => user.id !== id)
          )
        );
    }
  }
};
</script>
