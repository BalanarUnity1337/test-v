<template>
  <div class="container">
    <div
      v-if="!usersExist"
      class="display-4 text-white text-center">Телефонная книга пока пуст</div>

    <div v-else>
      <h3 class="text-white">Телефонная книга</h3>

      <smart-table
        v-bind:users="users"
        v-model.number="limit"
        v-bind:total="totalInCollection"
        v-bind:page="currentPage"
        v-bind:users-total="usersTotal"
        v-on:update-table="getUsers"
        v-on:filter-changed="getUsers" >
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
import axios from 'axios';

export default {
  name: 'PhoneBook',

  components: {
    'smart-table': () => import('@/components/SmartTable.vue')
  },

  data() {
    return {
      users: [],
      usersURI: 'http://localhost:3004/users',
      usersTotal: 0,
      currentPage: 1,
      limit: 5,
      totalInCollection: 0
    };
  },

  computed: {
    usersExist() {
      return this.usersTotal > 0;
    },

    paramPage() {
      return Number(this.$route.params.page);
    },

    url() {
      return `${this.usersURI}?_page=${this.currentPage}&_limit=${this.limit}`;
    }
  },

  watch: {
    $route() {
      this.currentPage = this.paramPage;
      this.getUsers();
    },

    limit() {
      this.getUsers();
    }
  },

  mounted() {
    this.getUsers();
  },

  methods: {
    getUsers(filterValue) {
      if (filterValue) {
        axios
          .get(`${this.url}&q=${filterValue}`)
          .then(response => this.onLoadUsersFiltered(response))
          .catch(error => console.error(error));
      } else {
        axios
          .get(this.url)
          .then(response => this.onLoadUsersDefault(response))
          .catch(error => console.error(error));
      }
    },

    onLoadUsersDefault(response) {
      this.usersTotal = this.totalInCollection = Number(
        response.headers['x-total-count']
      );
      this.users = response.data;
    },

    onLoadUsersFiltered(response) {
      this.totalInCollection = Number(response.headers['x-total-count']);
      this.users = response.data;
    }
  }
};
</script>
