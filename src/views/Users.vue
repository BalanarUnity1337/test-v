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
        v-on:remove-user="removeUser" >
        <template
          slot="table-row"
          slot-scope="{ user, removeUser }">
          <td>
            <router-link
              v-tooltip="'Редактировать'"
              v-bind:to="`/users/${user.id}/edit`"
              class="text-white" >#{{ user.id }} ✎</router-link>
          </td>

          <td>{{ user.firstName }}</td>
          <td>{{ user.lastName }}</td>
          <td>{{ user.isActive }}</td>
          <td>{{ user.balance }}</td>
          <td>{{ user.phone }}</td>
          <td>{{ user.registered }}</td>

          <td>
            <button
              v-tooltip="'Удалить'"
              type="button"
              class="btn btn-light"
              v-on:click="removeUser(user.id)">&times;</button>
          </td>
        </template>
      </smart-table>
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

  data() {
    return {
      users: []
    };
  },

  computed: {
    isUsersExists: function() {
      return this.users.length > 0;
    }
  },

  mounted() {
    this.getUsers();
  },

  methods: {
    getUsers() {
      axios.get('/users').then(response => (this.users = response.data));
    },

    removeUser(id) {
      axios
        .delete(`/users/${id}`)
        .then((this.users = this.users.filter(user => user.id !== id)));
    }
  }
};
</script>
