import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home.vue';
import Users from '@/views/Users.vue';
import AddUser from '@/views/AddUser.vue';
import EditUser from '@/views/EditUser.vue';

Vue.use(Router);

export default new Router({
  linkExactActiveClass: 'active',
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/users',
      name: 'users',
      component: Users
    },
    {
      path: '/users/add',
      name: 'addUser',
      component: AddUser
    },
    {
      path: '/users/edit/:id',
      name: 'editUser',
      component: EditUser
    }
  ]
});
