<template>
  <div class="container">
    <div class="display-4 text-white text-center" v-if="!users.length">Список пользователей пока пуст</div>

    <div v-else>
      <div class="row justify-content-between mb-3">
        <h3 class="text-white text-center">Список пользователей: {{ usersCount }}</h3>

        <button class="btn btn-secondary" type="button" v-on:click="toggleTableVisibility">{{ toggleButtonStateText }}</button>
      </div>

      <user-list v-bind:users="users" v-if="tableVisibility" v-on:remove-user="removeUser" />
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
      tableVisibility: true
    };
  },

  mounted: function() {
    this.getUsers();
  },

  computed: {
    usersCount: function() {
      return this.users.length;
    },

    toggleButtonStateText: function() {
      return this.tableVisibility ? 'Скрыть таблицу' : 'Показать таблицу';
    }
  },

  methods: {
    getUsers: function() {
      axios
        .get('http://localhost:3004/users')
        .then(response => (this.users = response.data))
        .catch(error => console.error(error));
    },

    toggleTableVisibility: function() {
      this.tableVisibility = !this.tableVisibility;
    },

    removeUser: function(id) {
      axios
        .delete('http://localhost:3004/users/' + id)
        .then(() => this.getUsers())
        .catch(error => console.error(error));
    }
  }
};
</script>
