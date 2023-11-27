import { createRouter, createWebHashHistory } from 'vue-router';
import { subscribeToAuth } from '../services/auth.js';

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
    path: '/cursos/:id',
    component: () => import('../pages/Service.vue')
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
    path: '/usuarios',
    component: () => import('../pages/UserList.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/usuarios/:id',
    component: () => import('../pages/UserProfile.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/usuarios/:id/chat',
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

let user = {
  id: null,
  displayName: null,
  photoURL: null,
  email: null,
  role: null
}

subscribeToAuth(newUser => user = newUser);

router.beforeEach((to, from) => {
  if (to.path === "/chat" && user.role === "admin") {
    return '/perfil';
  }
  if (to.path === "/usuarios" && user.role !== "admin") {
    return '/perfil';
  }
  if (user.id === null && to.meta.requiresAuth) {
    return '/iniciar-sesion';
  }
});

export default router;