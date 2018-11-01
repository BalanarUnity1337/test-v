import Vue from 'vue';
import Router from 'vue-router';
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
      component: () => import('@/views/Home.vue')
    },
    {
      path: '/users/page/:page',
      name: ROUTES_NAMES.users,
      component: () => import('@/views/Users.vue')
    },
    {
      path: '/users/add',
      name: ROUTES_NAMES.addUser,
      component: () => import('@/views/AddUser.vue')
    },
    {
      path: '/users/:id/edit',
      name: ROUTES_NAMES.editUser,
      component: () => import('@/views/EditUser.vue')
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
