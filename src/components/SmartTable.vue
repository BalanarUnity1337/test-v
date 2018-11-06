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
        <table-rows-count v-model.number="localLimit"/>

        <table-search v-model.trim="locaFilterValue"/>
      </div>

      <user-list
        v-bind:users="users"
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
        v-bind:page="page"
        v-bind:total="total"
        v-bind:limit="limit"
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
    },

    usersTotal: {
      type: Number,
      required: true
    },

    total: {
      type: Number,
      required: true
    },

    page: {
      type: Number,
      required: true
    },

    limit: {
      type: Number,
      required: true
    },

    filterValue: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      localPagination: null,
      localLimit: 0,
      locaFilterValue: ''
    };
  },

  watch: {
    localLimit: 'updateLimit',
    locaFilterValue: 'updateFilter'
  },

  mounted() {
    this.currentPage = this.paramPage;
  },

  created() {
    this.localPagination = Object.assign({}, this.pagination);
    this.localLimit = this.limit;
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

    updateFilter() {
      this.$emit('update-filter', this.locaFilterValue);
    },

    updateLimit() {
      this.$emit('input', this.localLimit);
    }
  }
};
</script>
