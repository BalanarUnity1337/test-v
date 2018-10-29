<template>
  <div class="container">
    <div
      v-if="!usersCount"
      class="display-4 text-white text-center">Список пользователей пока пуст</div>

    <div v-else>
      <div class="row justify-content-between mb-3">
        <h3 class="text-white text-center">Список пользователей: {{ usersCount }}</h3>

        <button
          class="btn btn-secondary"
          type="button"
          v-on:click="toggleTableVisibility">{{ toggleButtonStateText }}</button>
      </div>

      <user-list
        v-if="tableVisibility"
        v-bind:users="users"
        v-on:remove-user="removeUser" />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import UserList from '@/components/UserList.vue';

export default {
  name: 'UsersPage',

  components: {
    'user-list': UserList
  },

  data: function() {
    return {
      users: [],
      tableVisibility: true,
      usersURI: 'http://localhost:3004/users/'
    };
  },

  computed: {
    usersCount: function() {
      return this.users.length;
    },

    toggleButtonStateText: function() {
      return this.tableVisibility ? 'Скрыть таблицу' : 'Показать таблицу';
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

    toggleTableVisibility: function() {
      this.tableVisibility = !this.tableVisibility;
    },

    removeUser: function(id) {
      axios
        .delete(`${this.usersURI}${id}`)
        .then((this.users = this.users.filter(user => user.id !== id)))
        .catch(error => console.error(error));
    }
  }
};
</script>
