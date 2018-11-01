<template>
  <div class="card mb-3">
    <div class="card-header">
      Пользователей в базе - {{ usersCountInDB }}

      <button
        class="btn btn-primary float-right"
        type="button"
        v-on:click="updateTable">Обновить таблицу</button>
    </div>

    <div class="card-body">
      <div class="row justify-content-between">
        <table-rows-count v-model="rowsPerPage"/>

        <table-search v-model="filterValue"/>
      </div>

      <user-list
        v-bind:users="usersToShow"
        v-on:remove-user="removeUser" />

      <pagination
        v-model="currentPage"
        v-bind:total-count="usersCount"
        v-bind:rows-per-page="rowsPerPage"
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
    pagination: () => import('@/components/Pagination.vue'),
    'table-search': () => import('@/components/TableSearch.vue')
  },

  props: {
    users: {
      type: Array,
      required: true
    }
  },

  data: () => ({
    rowsPerPage: 5,
    currentPage: null,
    filterValue: ''
  }),

  computed: {
    usersCountInDB: function() {
      return this.users.length;
    },

    usersCount: function() {
      return this.filteredUsers.length;
    },

    sliceStartPoint: function() {
      return (this.currentPage - 1) * this.rowsPerPage;
    },

    filteredUsers: function() {
      return this.users.filter(
        user =>
          user.lastName.toUpperCase().indexOf(this.filterValue.toUpperCase()) >
          -1
      );
    },

    usersToShow: function() {
      return this.filteredUsers.slice(
        this.sliceStartPoint,
        this.rowsPerPage * this.currentPage
      );
    }
  },

  mounted: function() {
    this.currentPage = Number(this.$route.params.page);
  },

  methods: {
    updateTable: function() {
      this.$emit('update-table');
    },

    removeUser: function(id) {
      this.$emit('remove-user', id);
    },

    getCurrentPage: function() {
      this.currentPage = Number(this.$route.params.page);
    },

    switchPage: function(toPage) {
      this.$router.push({ name: 'users', params: { page: toPage } });
    }
  }
};
</script>
