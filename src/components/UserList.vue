<template>
  <table class="table table-striped table-dark mt-2">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Имя</th>
        <th scope="col">Фамилия</th>
        <th scope="col">Активен</th>
        <th scope="col">Баланс</th>
        <th scope="col">Телефон</th>
        <th scope="col">Дата регистрации</th>
        <th></th>
      </tr>
    </thead>

    <tbody>
      <tr
        v-for="user in users"
        v-bind:key="user.id">

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

    removeUser: function(id) {
      this.$emit('remove-user', id);
    }
  }
};
</script>
