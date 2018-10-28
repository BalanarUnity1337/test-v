<template>
  <table class="table table-striped table-dark">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Аватар</th>
        <th scope="col">Имя</th>
        <th scope="col">Фамилия</th>
        <th scope="col">Компания</th>
        <th scope="col">Дата регистрации</th>
        <th scope="col"></th>
        <th scope="col"></th>
      </tr>
    </thead>

    <tbody>
      <tr
        v-for="user in users"
        v-bind:key="user.id">

        <th scope="row"></th>

        <td>
          <img
            v-bind:src="user.picture || defaultPicture"
            v-bind:alt="getFullName(user)"
            width="50"
            height="50">
        </td>

        <td>{{ user.firstName }}</td>
        <td>{{ user.lastName }}</td>
        <td>{{ user.company }}</td>
        <td>{{ user.registered }}</td>

        <td>
          <a
            v-tooltip="'Редактировать'"
            v-bind:href="'/users/edit/' + user.id"
            class="btn btn-light">✎</a>
        </td>

        <td>
          <button
            v-tooltip="'Удалить'"
            class="btn btn-light"
            v-on:click="removeUser(user.id)">&times;</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import defaultPicture from '@/assets/default.png';

export default {
  name: 'UserList',

  props: {
    users: {
      type: Array,
      required: true
    }
  },

  data: function() {
    return {
      defaultPicture: defaultPicture
    };
  },

  methods: {
    getFullName: user => user.firstName + ' ' + user.lastName,

    removeUser: function(id) {
      this.$emit('remove-user', id);
    }
  }
};
</script>
