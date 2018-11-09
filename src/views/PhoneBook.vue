<template>
  <div class="container">
    <div
      v-if="!isUsersExists"
      class="display-4 text-white text-center">Телефонная книга пока пуст</div>

    <div v-else>
      <h3 class="text-white">Телефонная книга</h3>

      <smart-table
        v-bind:users="users"
        v-on:update-table="getUsers" >
        <template slot="table-header">
          <th scope="col">#</th>
          <th scope="col">Фамилия</th>
          <th scope="col">Телефон</th>
        </template>

        <template
          slot="table-row"
          slot-scope="{ user, removeUser }">
          <td>
            <router-link
              v-tooltip="'Редактировать'"
              v-bind:to="`/users/${user.id}/edit`"
              class="text-white" >#{{ user.id }} ✎</router-link>
          </td>

          <td>{{ user.lastName }}</td>
          <td>{{ user.phone }}</td>
        </template>
      </smart-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PhoneBook',

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
    }
  }
};
</script>
