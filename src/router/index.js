import { createRouter, createWebHashHistory } from 'vue-router';
// createWebHistory necesitas un servidor, server side rendering (ssr)
import { getUser } from '../services/auth.js';

const routes = [
  {
    path: '',
    component: () => import('../pages/Home.vue')
  },
  {
    path: '/cursos',
    component: () => import('../pages/Services.vue')
  },
  {
    path: '/iniciar-sesion',
    component: () => import('../pages/Login.vue')
  },
  {
    path: '/registro',
    component: () => import('../pages/Register.vue')
  },
  {
    path: '/chat',
    component: () => import('../pages/Chat.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/perfil',
    component: () => import('../pages/Profile.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/usuario/:id',
    component: () => import('../pages/UserProfile.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/usuario/:id/chat',
    component: () => import('../admin/Chat.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/admin/cursos',
    component: () => import('../admin/Services.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/admin/cursos/crear',
    component: () => import('../admin/CreateService.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/admin/cursos/:id/editar',
    component: () => import('../admin/EditService.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/:catchAll(.*)',
    redirect: "/"
  }
];

const router = createRouter({
  routes,
  history: createWebHashHistory()
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const user = getUser();
    if (user.id !== null) {
      next();
    } else {
      next('/iniciar-sesion')
    }
  } else {
    next();
  }
});

export default router;