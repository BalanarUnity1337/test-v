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
                v-model="localUser.isActive"
                class="form-check-input"
                type="radio"
                name="isActive"
                value="true">
              <label
                class="form-check-label"
                for="yes">
                Да
              </label>
            </div>

            <div class="form-check">
              <input
                id="no"
                v-model="localUser.isActive"
                class="form-check-input"
                type="radio"
                name="isActive"
                value="false">
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
              v-model="localUser.balance"
              class="form-control"
              type="text"
              placeholder="Баланс">
          </td>
        </tr>
        <tr>
          <td>Ссылка на аватар</td>

          <td>
            <input
              id="picture"
              v-model="localUser.picture"
              class="form-control"
              type="text"
              placeholder="Ссылка на аватар">
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
              v-model.number="localUser.age"
              class="form-control"
              type="number"
              placeholder="Возраст"
              min="1">
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
              v-model="localUser.accessLevel"
              class="form-control"
              name="accessLevel">

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
              v-model="localUser.firstName"
              class="form-control"
              type="text"
              placeholder="Имя">
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
              v-model="localUser.lastName"
              class="form-control"
              type="text"
              placeholder="Фамилия">
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
              v-model="localUser.company"
              class="form-control"
              type="text"
              placeholder="Компания">
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
              v-model="localUser.email"
              class="form-control"
              type="email"
              placeholder="E-Mail">
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
              v-model="localUser.phone"
              class="form-control"
              type="tel"
              placeholder="Телефон">
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
              v-model="localUser.address"
              class="form-control"
              type="text"
              placeholder="Адрес">
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
              v-model="localUser.about"
              class="form-control"></textarea>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'UserForm',

  model: {
    prop: 'user'
  },

  props: {
    user: {
      type: Object,
      required: true
    }
  },

  data: () => ({
    localUser: null
  }),

  watch: {
    localUser: {
      handler: 'updateUser',
      deep: true
    },

    user: function(newVal) {
      this.localUser = Object.assign({}, newVal);
    }
  },

  created: function() {
    this.localUser = Object.assign({}, this.user);
  },

  methods: {
    updateUser: function(newVal, oldVal) {
      if (!this.isUsersEqual(newVal, oldVal)) {
        this.$emit('input', Object.assign({}, this.localUser));
      }
    },

    isUsersEqual: function(newUser, oldUser) {
      return JSON.stringify(newUser) === JSON.stringify(oldUser);
    }
  }
};
</script>
