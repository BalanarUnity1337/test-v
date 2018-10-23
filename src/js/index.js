'use strict';

window.app = new Vue({
  el: '#app',

  data: function() {
    return {
      users: [
        {
          id: 1,
          lastName: 'Ушакова',
          firstName: 'Катерина',
          secondName: 'Богдановна',
          avatar: 'dist/img/users_avatars/1.png'
        },
        {
          id: 2,
          lastName: 'Трофимов',
          firstName: 'Тимофей',
          secondName: 'Олегович',
          avatar: 'dist/img/users_avatars/2.png'
        },
        {
          id: 3,
          lastName: 'Яковлев',
          firstName: 'Вениамин',
          secondName: 'Макарович',
          avatar: 'dist/img/users_avatars/3.png'
        },
        {
          id: 4,
          lastName: 'Мартынова',
          firstName: 'Марианна',
          secondName: 'Тарасовна',
          avatar: ''
        },
        {
          id: 5,
          lastName: 'Остимчук',
          firstName: 'Юлий',
          secondName: 'Евгеньевич',
          avatar: 'dist/img/users_avatars/5.png'
        }
      ],
      tableVisibility: true
    }
  },

  methods: {
    toggleTableVisibility: function() {
      this.tableVisibility = !this.tableVisibility;
    },

    getFullName: function(user) {
      return user.lastName + ' ' + user.firstName + ' ' + user.secondName;
    }
  },

  computed: {
    getUsersCount: function() {
      return this.users.length;
    },

    toggleTextOfButton: function() {
      return this.tableVisibility ? 'Скрыть' : 'Показать';
    }
  },

  filters: {
    upperCase: function(value) {
      if (!value) {
        return '';
      }

      value = value.toString();

      return value.toUpperCase();
    }
  }
});
