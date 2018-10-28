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
      <tr class="users__body-row" v-for="(user, index) in users" v-bind:key="user.id">
        <th scope="row">{{ index + 1 }}</th>

        <td class="users__avatar">
          <img width="50" height="50" v-bind:src="user.picture || defaultPicture" v-bind:alt="getFullName(user)">
        </td>

        <td>{{ user.firstName }}</td>
        <td>{{ user.lastName }}</td>
        <td>{{ user.company }}</td>
        <td>{{ user.registered }}</td>

        <td>
          <a class="btn btn-light" v-bind:href="'/users/edit/' + user.id" v-tooltip="'Редактировать'">✎</a>
        </td>

        <td>
          <button class="btn btn-light" v-on:click="removeUser(user.id)" v-tooltip="'Удалить'">&times;</button>
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
