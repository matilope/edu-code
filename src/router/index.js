import { createRouter, createWebHashHistory } from 'vue-router';
// createWebHistory necesitas un servidor, server side rendering (ssr)
import { getUser, subscribeToAuth } from '../services/auth.js';

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
    meta: { requiresAuth: true, role: 'user' }
  },
  {
    path: '/perfil',
    component: () => import('../pages/Profile.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/usuario/:id',
    component: () => import('../pages/UserProfile.vue'),
    meta: { requiresAuth: true, role: 'admin' }
  },
  {
    path: '/usuario/:id/chat',
    component: () => import('../admin/Chat.vue'),
    meta: { requiresAuth: true, role: 'admin' }
  },
  {
    path: '/admin/cursos',
    component: () => import('../admin/Services.vue'),
    meta: { requiresAuth: true, role: 'admin' }
  },
  {
    path: '/admin/cursos/crear',
    component: () => import('../admin/CreateService.vue'),
    meta: { requiresAuth: true, role: 'admin'}
  },
  {
    path: '/admin/cursos/:id/editar',
    component: () => import('../admin/EditService.vue'),
    meta: { requiresAuth: true, role: 'admin' }
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

let user = {
  id: null,
  name: null,
  email: null,
  role: null
}

subscribeToAuth(newUser => user = newUser);

router.beforeEach((to, from) => {
  if (to.meta.requiresAuth) {
    if (user.id === null) {
      return '/iniciar-sesion';
    }
    /*
    if (to.path === "/chat" && user.role === "admin") {
      return '/perfil';
    }
    */
  }
});

export default router;