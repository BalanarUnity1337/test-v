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

      <user-list
        v-bind:users="usersToShow"
        v-on:remove-user="removeUser">

        <template slot="table-header">
          <slot name="table-header"></slot>
        </template>

        <template
          slot="table-row"
          slot-scope="{ user, removeUser }">
          <slot
            v-bind:user="user"
            v-bind:remove-user="removeUser"
            name="table-row"></slot>
        </template>
      </user-list>

      <content-pagination
        v-model="currentPage"
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
      rowsPerPage: 5,
      currentPage: 1,
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
    }
  },

  watch: {
    $route() {
      this.currentPage = this.getCurrentPage();
    },

    rowsPerPage() {
      this.switchPage({
        name: this.$route.name
      });
    }
  },

  mounted() {
    this.currentPage = this.getCurrentPage();
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
    },

    getCurrentPage() {
      return typeof this.$route.params.page === 'undefined'
        ? 1
        : Number(this.$route.params.page);
    }
  }
};
</script>
