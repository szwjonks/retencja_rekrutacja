import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/users',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        name: 'users',
        path: '/users',
        component: () => import('components/UsersList.vue'),
      },
      {
        name: 'user',
        path: '/user/:id',
        component: () => import('components/UserDetails.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
