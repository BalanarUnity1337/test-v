<template>
  <div class="container">
    <table class="table table-striped table-bordered text-light table-hover">
      <tbody>
        <tr>
          <td>
            Активен
          </td>

          <td>
            <div class="form-check">
              <input
                id="yes"
                v-bind:checked="user.isActive"
                class="form-check-input"
                type="radio"
                name="isActive"
                value="true"
                v-on:change="propertyChange('isActive', $event.target.value)">
              <label
                class="form-check-label"
                for="yes">
                Да
              </label>
            </div>

            <div class="form-check">
              <input
                id="no"
                v-bind:checked="!user.isActive"
                class="form-check-input"
                type="radio"
                name="isActive"
                value="false"
                v-on:change="propertyChange('isActive', $event.target.value)">
              <label
                class="form-check-label"
                for="no">
                Нет
              </label>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <label
              class="col-form-label"
              for="balance">Баланс</label>
          </td>

          <td>
            <input
              id="balance"
              v-bind:value="user.balance"
              class="form-control"
              type="text"
              placeholder="Баланс"
              v-on:input="propertyChange('balance', $event.target.value)">
          </td>
        </tr>
        <tr>
          <td>Ссылка на аватар</td>

          <td>
            <input
              id="picture"
              v-bind:value="user.picture"
              class="form-control"
              type="text"
              placeholder="Ссылка на аватар"
              v-on:input="propertyChange('picture', $event.target.value)">
          </td>
        </tr>

        <tr>
          <td>
            <label
              class="col-form-label"
              for="age">Возраст</label>
          </td>

          <td>
            <input
              id="age"
              v-bind:value="user.age"
              class="form-control"
              type="number"
              placeholder="Возраст"
              min="1"
              v-on:input="propertyChange('age', +$event.target.value)">
          </td>
        </tr>

        <tr>
          <td>
            <label
              class="col-form-label"
              for="accessLevel">Уровень доступа</label>
          </td>

          <td>
            <select
              id="accessLevel"
              v-bind:value="user.accessLevel"
              class="form-control"
              name="accessLevel"
              v-on:change="propertyChange('accessLevel', $event.target.value)">

              <option value="admin">Администратор</option>
              <option value="user">Пользователь</option>
              <option value="guest">Гость</option>
            </select>
          </td>
        </tr>

        <tr>
          <td>
            <label
              class="col-form-label"
              for="firstName">Имя</label>
          </td>

          <td>
            <input
              id="firstName"
              v-bind:value="user.firstName"
              class="form-control"
              type="text"
              placeholder="Имя"
              v-on:input="propertyChange('firstName', $event.target.value)">
          </td>
        </tr>

        <tr>
          <td>
            <label
              class="col-form-label"
              for="lastName">Фамилия</label>
          </td>

          <td>
            <input
              id="lastName"
              v-bind:value="user.lastName"
              class="form-control"
              type="text"
              placeholder="Фамилия"
              v-on:input="propertyChange('lastName', $event.target.value)">
          </td>
        </tr>

        <tr>
          <td>
            <label
              class="col-form-label"
              for="company">Компания</label>
          </td>

          <td>
            <input
              id="company"
              v-bind:value="user.company"
              class="form-control"
              type="text"
              placeholder="Компания"
              v-on:input="propertyChange('company', $event.target.value)">
          </td>
        </tr>

        <tr>
          <td>
            <label
              class="col-form-label"
              for="email">E-Mail</label>
          </td>

          <td>
            <input
              id="email"
              v-bind:value="user.email"
              class="form-control"
              type="email"
              placeholder="E-Mail"
              v-on:input="propertyChange('email', $event.target.value)">
          </td>
        </tr>

        <tr>
          <td>
            <label
              class="col-form-label"
              for="phone">Телефон</label>
          </td>

          <td>
            <input
              id="phone"
              v-bind:value="user.phone"
              class="form-control"
              type="tel"
              placeholder="Телефон"
              v-on:input="propertyChange('phone', $event.target.value)">
          </td>
        </tr>

        <tr>
          <td>
            <label
              class="col-form-label"
              for="address">Адрес</label>
          </td>

          <td>
            <input
              id="address"
              v-bind:value="user.address"
              class="form-control"
              type="text"
              placeholder="Адрес"
              v-on:input="propertyChange('address', $event.target.value)">
          </td>
        </tr>

        <tr>
          <td>
            <label
              class="col-form-label"
              for="about">О себе</label>
          </td>

          <td>
            <textarea
              id="about"
              v-bind:value="user.about"
              class="form-control"
              v-on:input="propertyChange('about', $event.target.value)"></textarea>
          </td>
        </tr>
      </tbody>
    </table>

    <button
      v-if="isEditPage"
      type="button"
      class="btn btn-light mb-3"
      v-on:click="editUser">Подтвердить</button>

    <button
      v-else-if="isAddPage"
      type="button"
      class="btn btn-light mb-3"
      v-on:click="addUser">Добавить пользователя</button>
  </div>
</template>

<script>
import { ROUTES_NAMES } from '@/mixins/constants.js';

export default {
  name: 'UserForm',

  props: {
    user: {
      type: Object,
      required: true
    }
  },

  computed: {
    isEditPage: function() {
      return this.$route.name === ROUTES_NAMES.editUser;
    },

    isAddPage: function() {
      return this.$route.name === ROUTES_NAMES.addUser;
    }
  },

  methods: {
    editUser: function() {
      this.$emit('edit-user');
    },

    addUser: function() {
      this.$emit('add-user');
    },

    propertyChange: function(property, value) {
      this.$emit('property-change', property, value);
    }
  }
};
</script>
