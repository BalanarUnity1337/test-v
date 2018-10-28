import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home.vue';
import Users from '@/views/Users.vue';
import AddUser from '@/views/AddUser.vue';
import EditUser from '@/views/EditUser.vue';
import NProgress from 'nprogress';
import { ROUTES_NAMES } from '@/mixins/constants.js';

Vue.use(Router);

const router = new Router({
  linkExactActiveClass: 'active',
  mode: 'history',
  routes: [
    {
      path: '/',
      name: ROUTES_NAMES.home,
      component: Home
    },
    {
      path: '/users',
      name: ROUTES_NAMES.users,
      component: Users
    },
    {
      path: '/users/add',
      name: ROUTES_NAMES.addUser,
      component: AddUser
    },
    {
      path: '/users/edit/:id',
      name: ROUTES_NAMES.editUser,
      component: EditUser
    }
  ]
});

router.beforeResolve((to, from, next) => {
  if (to.path) {
    NProgress.start();
  }

  next();
});

router.afterEach(() => NProgress.done());

export default router;
