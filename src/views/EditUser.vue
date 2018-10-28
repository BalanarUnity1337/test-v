<template>
  <div class="container">
    <div
      v-if="!user"
      class="display-4 text-white text-center">Такого пользователя нет</div>

    <div v-else>
      <h3 class="text-white text-center mb-3">Редактирование пользователя</h3>

      <user-form
        v-bind:user="user"
        v-on:edit-user="editUser"
        v-on:property-change="propertyChange" />
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import axios from 'axios';
import AsyncComputed from 'vue-async-computed';
import UserForm from '@/components/UserForm.vue';

Vue.use(AsyncComputed);

export default {
  name: 'EditUserPage',

  components: {
    'user-form': UserForm
  },

  data: function() {
    return {
      usersURI: 'http://localhost:3004/users/'
    };
  },

  computed: {
    id: function() {
      return this.$route.params.id;
    },

    usersIdURI: function() {
      return this.usersURI + this.id;
    }
  },

  asyncComputed: {
    user: function() {
      return axios
        .get(this.usersIdURI)
        .then(response => response.data)
        .catch(error => console.error(error));
    }
  },

  methods: {
    editUser: function() {
      axios
        .patch(this.usersIdURI, this.user)
        .then(() => this.$router.push({ path: '/users' }))
        .catch(error => console.error(error));
    },

    propertyChange: function(property, value) {
      this.user[property] = value;
    }
  }
};
</script>
