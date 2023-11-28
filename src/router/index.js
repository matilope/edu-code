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
    meta: { requiresAuth: true, roles: ["user"] }
  },
  {
    path: '/perfil',
    component: () => import('../pages/Profile.vue'),
    meta: { requiresAuth: true, roles: ["admin", "user"] }
  },
  {
    path: '/usuarios',
    component: () => import('../pages/UserList.vue'),
    meta: { requiresAuth: true, roles: ["admin"] }
  },
  {
    path: '/usuarios/:id',
    component: () => import('../pages/UserProfile.vue'),
    meta: { requiresAuth: true, roles: ["admin"] }
  },
  {
    path: '/usuarios/:id/chat',
    component: () => import('../admin/Chat.vue'),
    meta: { requiresAuth: true, roles: ["admin"] }
  },
  {
    path: '/admin/cursos',
    component: () => import('../admin/Services.vue'),
    meta: { requiresAuth: true, roles: ["admin"] }
  },
  {
    path: '/admin/cursos/crear',
    component: () => import('../admin/CreateService.vue'),
    meta: { requiresAuth: true, roles: ["admin"] }
  },
  {
    path: '/admin/cursos/:id/editar',
    component: () => import('../admin/EditService.vue'),
    meta: { requiresAuth: true, roles: ["admin"] }
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
  role: null
}

subscribeToAuth(newUser => user = newUser);

router.beforeEach((to, from) => {
  if (user.id === null && to.meta.requiresAuth) {
    return '/iniciar-sesion';
  }
  if (from.path != "/iniciar-sesion" && from.path != "/registro" && user.id != null && to.meta.roles && !to.meta.roles.includes(user.role)) {
    return '/perfil';
  }
  return;
});

export default router;