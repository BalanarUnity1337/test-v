<template>
  <table class="table table-striped table-bordered text-light table-hover">
    <tbody>
      <tr>
        <td>
          Активен
        </td>

        <td>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="isActive" id="yes" v-model="user.isActive" value="true">
            <label class="form-check-label" for="yes">
              Да
            </label>
          </div>

          <div class="form-check">
            <input class="form-check-input" type="radio" name="isActive" id="no" v-model="user.isActive" value="false">
            <label class="form-check-label" for="no">
              Нет
            </label>
          </div>
        </td>
      </tr>
      <tr>
        <td>
          <label class="col-form-label" for="balance">Баланс</label>
        </td>

        <td>
          <input class="form-control" type="text" id="balance" placeholder="Баланс" v-model="user.balance">
       </td>
      </tr>
      <tr>
        <td>Ссылка на аватар</td>

        <td>
          <input class="form-control" type="text" id="picture" placeholder="Ссылка на аватар" v-model="user.picture">
        </td>
      </tr>

      <tr>
        <td>
          <label class="col-form-label" for="age">Возраст</label>
        </td>

        <td>
          <input class="form-control" type="number" id="age" placeholder="Возраст" min="1" v-model="user.age">
        </td>
      </tr>

      <tr>
        <td>Уровень доступа</td>

        <td>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="accessLevel" id="admin" v-model="user.accessLevel" value="admin">
            <label class="form-check-label" for="admin">
              Админ
            </label>
          </div>

          <div class="form-check">
            <input class="form-check-input" type="radio" name="accessLevel" id="user" v-model="user.accessLevel" value="user">
            <label class="form-check-label" for="user">
              Пользователь
            </label>
          </div>

          <div class="form-check">
            <input class="form-check-input" type="radio" name="accessLevel" id="guest" v-model="user.accessLevel" value="guest">
            <label class="form-check-label" for="guest">
              Гость
            </label>
          </div>
        </td>
      </tr>

      <tr>
        <td>
          <label class="col-form-label" for="firstName">Имя</label>
        </td>

        <td>
          <input class="form-control" type="text" id="firstName" placeholder="Имя" v-model="user.firstName">
        </td>
      </tr>

      <tr>
        <td>
          <label class="col-form-label" for="lastName">Фамилия</label>
        </td>

        <td>
          <input class="form-control" type="text" id="lastName" placeholder="Фамилия" v-model="user.lastName">
        </td>
      </tr>

      <tr>
        <td>
          <label class="col-form-label" for="company">Компания</label>
        </td>

        <td>
          <input class="form-control" type="text" id="company" placeholder="Компания" v-model="user.company">
        </td>
      </tr>

      <tr>
        <td>
          <label class="col-form-label" for="email">E-Mail</label>
        </td>

        <td>
          <input class="form-control" type="email" id="email" placeholder="E-Mail" v-model="user.email">
        </td>
      </tr>

      <tr>
        <td>
          <label class="col-form-label" for="phone">Телефон</label>
        </td>

        <td>
          <input class="form-control" type="tel" id="phone" placeholder="Телефон" v-model="user.phone">
        </td>
      </tr>

      <tr>
        <td>
          <label class="col-form-label" for="address">Адрес</label>
        </td>

        <td>
          <input class="form-control" type="text" id="address" placeholder="Адрес" v-model="user.address">
        </td>
      </tr>

      <tr>
        <td>
          <label class="col-form-label" for="about">О себе</label>
        </td>

        <td>
          <textarea class="form-control" id="about" v-model="user.about"></textarea>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'UserForm',

  props: {
    user: {
      type: Object,
      required: true
    }
  }
};
</script>

<style>
</style>
