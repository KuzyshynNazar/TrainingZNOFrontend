import {createWebHistory, createRouter } from 'vue-router'
import store from '../store';
const routes = [
  {
    path: '/main',
    component: () => import( '../views/MainPage'),
    beforeEnter: ((to, from, next) => {
      if (store.getters['auth/isAuthorized']) {
        next();
      } else {
        next({path: '/'});
      }
    }),
    children: [
      {
        path: '/home',
        component: () => import( '../views/HomePage'),
      },
      {
        path: '/account-settings',
        component: () => import( '../views/account-settings/AccountSettingsPage'),
        children: [
          {
            path: '/account-settings/test1',
            component: () => import( '../views/account-settings/AccountSettingsTest1Page'),
          },
          {
            path: '/account-settings/test2',
            component: () => import( '../views/account-settings/AccountSettingsTest2Page'),
          },
        ]
      },
      {
        path: '/settings',
        component: () => import( '../views/settings/SettingsPage'),
        children: [
          {
            path: '/settings/test1',
            component: () => import( '../views/settings/SettingsTest1Page'),
          },
          {
            path: '/settings/test2',
            component: () => import( '../views/settings/SettingsTest2Page'),
          },
        ]
      },
      {
        path: '/account',
        component: () => import( '../views/account/AccountPage'),
        children: [
          {
            path: '/account/test1',
            component: () => import( '../views/account/AccountTest1Page'),
          },
          {
            path: '/account/test2',
            component: () => import( '../views/account/AccountTest2Page'),
          },
        ]
      },
      {
        path: '/:pathMatch(.*)*',
        component: () => import( '../components/NotFound'),
      },
      {
        path: '*',
        component: () => import( '../views/HomePage'),
      },
    ]
  },
  {
    path: '/dashboard',
    component: () => import( '../views/dashboard/DashboardPage'),
    beforeEnter: ((to, from, next) => {
      if (store.getters['auth/isAuthorized'] && store.getters['auth/isAdmin']) {
        next();
      } else {
        next({path: '/not-access'});
      }
    }),
    children: [
      {
        path: '/dashboard/students',
        component: () => import( '../views/dashboard/StudentsPage'),
      },
      {
        path: '/dashboard/tree-categories',
        component: () => import( '../views/dashboard/TreeCategoryPage'),
      },
      {
        path: '/dashboard/tests',
        component: () => import( '../views/dashboard/TestPage'),
      },
      {
        path: '/:pathMatch(.*)*',
        component: () => import( '../components/NotFound'),
      },
      {
        path: '*',
        component: () => import( '../views/HomePage'),
      },
    ]
  },
  {
    path: '/',
    component: () => import('../views/auth/AuthPage.vue'),
    beforeEnter: ((to, from, next) => {
      if (store.getters['auth/isAuthorized']) {
        next({path: '/home'});
      } else {
        next();
      }
    }),
    children: [
      {
        path: 'login',
        component: () => import('../views/auth/AuthPage.vue')
      },
      {
        path: '/:pathMatch(.*)*',
        component: () => import('../views/auth/AuthPage.vue')
      },
      {
        path: '*',
        component: () => import('../views/auth/AuthPage.vue')
      },
    ]
  },
  {
    path: '/not-access',
    component: () => import( '../components/NotFound'),
  },
]
export default createRouter({
  history: createWebHistory(),
  routes,
})

