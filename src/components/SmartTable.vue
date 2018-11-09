<template>
  <div class="card mb-3">
    <div class="card-header">
      Пользователей в базе - {{ usersTotal }}

      <button
        class="btn btn-primary float-right"
        type="button"
        v-on:click="updateTable">Обновить таблицу</button>
    </div>

    <div class="card-body">
      <div class="row justify-content-between">
        <table-rows-count v-model.number="rowsPerPage"/>

        <table-search v-model.trim="filterValue"/>
      </div>

      <table class="table table-striped table-dark mt-2">
        <thead>
          <tr>
            <slot name="table-header">
              <th scope="col">#</th>
              <th scope="col">Имя</th>
              <th scope="col">Фамилия</th>
              <th scope="col">Активен</th>
              <th scope="col">Баланс</th>
              <th scope="col">Телефон</th>
              <th scope="col">Дата регистрации</th>
              <th></th>
            </slot>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="user in usersToShow"
            v-bind:key="user.id">

            <slot
              v-bind:user="user"
              v-bind:remove-user="removeUser"
              name="table-row">
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
            </slot>
          </tr>
        </tbody>
      </table>

      <content-pagination
        v-model="page"
        v-bind:total="usersTotalInView"
        v-bind:limit="rowsPerPage"
        v-on:pagination-click="switchPage" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'SmartTable',

  components: {
    'table-rows-count': () => import('@/components/TableRowsCount.vue'),
    'user-list': () => import('@/components/UserList.vue'),
    'content-pagination': () => import('@/components/ContentPagination.vue'),
    'table-search': () => import('@/components/TableSearch.vue')
  },

  model: {
    prop: 'limit'
  },

  props: {
    users: {
      type: Array,
      required: true
    }
  },

  data() {
    return {
      page: 1,
      rowsPerPage: 5,
      filterValue: ''
    };
  },

  computed: {
    usersTotal() {
      return this.users.length;
    },

    usersTotalInView() {
      return this.filteredUsers.length;
    },

    filteredUsers() {
      const regex = new RegExp(this.filterValue, 'i');

      return this.users.filter(user => regex.test(user.lastName));
    },

    usersToShow() {
      const sliceStartPoint = (this.currentPage - 1) * this.rowsPerPage;
      const sliceEndPoint = this.currentPage * this.rowsPerPage;

      return this.filteredUsers.slice(sliceStartPoint, sliceEndPoint);
    },

    currentPage() {
      return typeof this.$route.params.page === 'undefined'
        ? 1
        : Number(this.$route.params.page);
    }
  },

  watch: {
    $route() {
      this.page = this.currentPage;
    },

    rowsPerPage() {
      this.switchPage({
        name: this.$route.name
      });
    }
  },

  mounted() {
    this.page = this.currentPage;
  },

  methods: {
    updateTable() {
      this.$emit('update-table');
    },

    removeUser(id) {
      this.$emit('remove-user', id);
    },

    switchPage(page) {
      this.$router.push({ name: page.name, params: { page: page.toPage } });
    }
  }
};
</script>
