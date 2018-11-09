<template>
  <div class="container">
    <table class="table table-striped table-bordered text-light table-hover">
      <tbody>
        <tr>
          <td>
            Активен
          </td>

          <td>
            <checkbox v-model="localUser.isActive" />
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
          <td>Аватар</td>

          <td>
            <image-upload v-model="localUser.picture"/>
          </td>
        </tr>

        <tr>
          <td>
            <label
              class="col-form-label"
              for="age">День рождения</label>
          </td>

          <td>
            <datepicker v-model="localUser.birthday" />
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

              <option
                v-for="accessLevel in accessLevelList"
                v-bind:value="accessLevel.value"
                v-bind:key="accessLevel.value" >{{ accessLevel.text }}</option>

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
              v-model.trim="$v.localUser.firstName.$model"
              v-bind:class="{ 'error': $v.localUser.firstName.$error }"
              class="form-control"
              type="text"
              placeholder="Имя">

            <div
              v-if="!$v.localUser.firstName.required && $v.localUser.firstName.$dirty"
              class="error">Пожалуйста, укажите имя</div>

            <div
              v-if="!$v.localUser.firstName.minLength"
              class="error">Имя должно содержать не менее {{ $v.localUser.firstName.$params.minLength.min }} букв.</div>

            <div
              v-if="!$v.localUser.firstName.startsWithUpperCase"
              class="error">Имя должно начинаться с большой буквы</div>
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
              v-model="$v.localUser.lastName.$model"
              v-bind:class="{ 'error': $v.localUser.lastName.$error }"
              class="form-control"
              type="text"
              placeholder="Фамилия">

            <div
              v-if="!$v.localUser.lastName.required && $v.localUser.lastName.$dirty"
              class="error">Пожалуйста, укажите фамилию</div>

            <div
              v-if="!$v.localUser.lastName.minLength"
              class="error">Фамилия должна содержать не менее {{ $v.localUser.lastName.$params.minLength.min }}</div>

            <div
              v-if="!$v.localUser.lastName.startsWithUpperCase"
              class="error">Фамилия должна начинаться с большой буквы</div>
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
              v-model.trim="$v.localUser.email.$model"
              v-bind:class="{ 'error': $v.localUser.email.$error }"
              class="form-control"
              type="email"
              placeholder="E-Mail">

            <div
              v-if="!$v.localUser.email.required && $v.localUser.email.$dirty"
              class="error">Пожалуйста, заполните поле</div>

            <div
              v-if="!$v.localUser.email.email"
              class="error">Введите правильный E-Mail адрес</div>
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
              for="about">Биография</label>
          </td>

          <td>
            <quill-editor v-model="localUser.about" />
          </td>
        </tr>
      </tbody>
    </table>

    <div
      v-if="hasError"
      class="error mb-3">Проверьте правильность заполения полей формы</div>

    <slot
      v-bind:send-form="sendForm"
      name="footer-buttons"></slot>
  </div>
</template>

<script>
import Vue from 'vue';
import Vuelidate from 'vuelidate';
import { required, minLength, email } from 'vuelidate/lib/validators';
import startsWithUpperCase from '@/mixins/StartsWithUpperCase.js';

Vue.use(Vuelidate);

export default {
  name: 'UserForm',

  components: {
    datepicker: () => import('@/components/DatePicker.vue'),
    checkbox: () => import('@/components/CheckBox.vue'),
    'image-upload': () => import('@/components/ImageUpload.vue'),
    'quill-editor': () => import('@/components/QuillEditor.vue')
  },

  model: {
    prop: 'user'
  },

  props: {
    user: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      localUser: null,
      accessLevelList: [
        { text: 'Администратор', value: 'admin' },
        { text: 'Пользователь', value: 'user' },
        { text: 'Гость', value: 'guest' }
      ]
    };
  },

  computed: {
    hasError() {
      return this.$v.$anyError;
    }
  },

  watch: {
    localUser: {
      handler: 'updateUser',
      deep: true
    },

    user(newVal, oldVal) {
      if (!this.isUsersEqual(newVal, oldVal)) {
        this.localUser = Object.assign({}, this.user);
      }
    }
  },

  created() {
    this.localUser = Object.assign({}, this.user);
  },

  methods: {
    updateUser() {
      this.$emit('input', Object.assign({}, this.localUser));
    },

    sendForm() {
      this.$v.$touch();

      if (!this.hasError) {
        this.$emit('send-form');
      }
    },

    isUsersEqual(newUser, oldUser) {
      return JSON.stringify(newUser) === JSON.stringify(oldUser);
    }
  },

  validations: {
    localUser: {
      email: {
        required,
        email
      },

      firstName: {
        required,
        minLength: minLength(3),
        startsWithUpperCase
      },

      lastName: {
        required,
        minLength: minLength(3),
        startsWithUpperCase
      }
    }
  }
};
</script>
