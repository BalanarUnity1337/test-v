<template>
  <table class="table table-striped table-dark mt-2">
    <thead>
      <tr>
        <slot name="table-header"></slot>
      </tr>
    </thead>

    <tbody>
      <tr
        v-for="user in users"
        v-bind:key="user.id">

        <slot
          v-bind:user="user"
          v-bind:remove-user="removeUser"
          name="table-row"></slot>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'UserList',

  props: {
    users: {
      type: Array,
      required: true
    }
  },

  methods: {
    getFullName: user => user.firstName + ' ' + user.lastName,

    removeUser(id) {
      this.$emit('remove-user', id);
    }
  }
};
</script>
