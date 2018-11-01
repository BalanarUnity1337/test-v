<template>
  <div class="container">
    <div
      v-if="!usersCount"
      class="display-4 text-white text-center">Список пользователей пока пуст</div>

    <div v-else>
      <h3 class="text-white">Список пользователей</h3>

      <smart-table
        v-bind:users="users"
        v-on:update-table="updateTable"
        v-on:remove-user="removeUser" />
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'UsersPage',

  components: {
    'smart-table': () => import('@/components/SmartTable.vue')
  },

  data: function() {
    return {
      users: [],
      tableVisibility: true,
      usersURI: 'http://localhost:3004/users'
    };
  },

  computed: {
    usersCount: function() {
      return this.users.length;
    }
  },

  mounted: function() {
    this.getUsers();
  },

  methods: {
    getUsers: function() {
      axios
        .get(this.usersURI)
        .then(response => (this.users = response.data))
        .catch(error => console.error(error));
    },

    removeUser: function(id) {
      axios
        .delete(`${this.usersURI}/${id}`)
        .then((this.users = this.users.filter(user => user.id !== id)))
        .catch(error => console.error(error));
    },

    updateTable: function() {
      this.getUsers();
    }
  }
};
</script>
