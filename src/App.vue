<script setup>
import { subscribeToAuth, logOut } from "./services/auth.js";
import { useRouter } from "vue-router";
import { ref, onMounted, onUnmounted } from "vue";

const { handleLogOut } = useLogOut();
const { user } = useAuth();

const toggle = () => {
  /* chequear
  this.$refs.mobileMenu?.classList.toggle("hidden");
  if (this.$refs.menuButton?.getAttribute("aria-expanded") == "false") {
    this.$refs.menuButton?.setAttribute("aria-expanded", "true");
  } else {
    this.$refs.menuButton?.setAttribute("aria-expanded", "false");
  } */
};

function useLogOut() {
  const router = useRouter();
  const handleLogOut = () => {
    logOut();
    router.push("/iniciar-sesion");
  };
  return {
    handleLogOut
  }
}

function useAuth() {
  const user = ref({
    id: null,
    name: null,
    email: null,
    role: null,
  });

  let unSubscribeAuth;

  onMounted(
    () =>
      (unSubscribeAuth = subscribeToAuth(
        (user) => (user.value = { ...user })
      ))
  );

  onUnmounted(() => unSubscribeAuth());

  return {
    user
  }
}
</script>

<template>
  <nav
    class="container mx-auto relative py-4 flex justify-between lg:items-center bg-white flex-col items-start"
  >
    <div class="w-full px-4">
      <div class="relative flex h-16 items-center justify-between">
        <div class="absolute inset-y-0 left-0 flex items-center lg:hidden">
          <button
            type="button"
            @click="toggle"
            class="custom-menu relative inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-green-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            ref="menuButton"
            aria-controls="mobile-menu"
            aria-expanded="false"
          >
            <span class="absolute -inset-0.5"></span>
            <span class="sr-only">Abrir menu principal</span>

            <svg
              class="block h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>

            <svg
              class="hidden h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div class="flex flex-1 items-center justify-center lg:justify-start">
          <div class="flex flex-shrink-0 items-center">
            <router-link class="text-3xl font-bold leading-none" to="/">
              <img src="images/logo.png" alt="Logo del sitio" />
            </router-link>
          </div>
          <div class="hidden lg:ml-6 lg:block">
            <ul class="flex space-x-4 items-center">
              <li>
                <router-link
                  to="/"
                  class="hover:bg-gray-200 text-md text-black rounded-md px-3 py-2 font-medium"
                  >Inicio</router-link
                >
              </li>
              <li>
                <router-link
                  to="/cursos"
                  class="hover:bg-gray-200 text-md text-black rounded-md px-3 py-2 font-medium"
                  >Cursos</router-link
                >
              </li>
              <template v-if="user.id">
                <li>
                  <router-link
                    to="/perfil"
                    class="hover:bg-gray-200 text-md text-black rounded-md px-3 py-2 font-medium"
                    >Perfil</router-link
                  >
                </li>
                <template v-if="user.role == 'user'">
                  <li>
                    <router-link
                      class="hover:bg-gray-200 text-md text-black rounded-md px-3 py-2 font-medium"
                      to="/chat"
                      >Chat</router-link
                    >
                  </li>
                </template>
                <template v-if="user.role == 'admin'">
                  <li>
                    <router-link
                      class="hover:bg-gray-200 text-md text-black rounded-md px-3 py-2 font-medium"
                      to="/admin/cursos"
                      >Administrador</router-link
                    >
                  </li>
                  <li>
                    <router-link
                      class="hover:bg-gray-200 text-md text-black rounded-md px-3 py-2 font-medium"
                      to="/admin/cursos/crear"
                      >Crear curso</router-link
                    >
                  </li>
                </template>
              </template>
            </ul>
          </div>
        </div>

        <div
          class="absolute inset-y-0 right-0 flex items-center pr-2 lg:static lg:inset-auto lg:ml-6 lg:pr-0"
        >
          <div class="relative ml-3">
            <template v-if="!user.id">
              <router-link
                class="hidden lg:inline-block lg:ml-auto lg:mr-3 px-6 py-2.5 bg-gray-50 hover:bg-gray-100 text-sm text-gray-900 font-bold rounded-md transition duration-200"
                to="/iniciar-sesion"
              >
                Iniciar sesión
              </router-link>
              <router-link
                class="hidden lg:inline-block px-6 py-2.5 bg-green-600 hover:bg-green-500 text-sm text-white font-bold rounded-md transition duration-200"
                to="/registro"
              >
                Registrarse
              </router-link>
            </template>
            <template v-else>
              <form
                class="hidden lg:block"
                action="#"
                @submit.prevent="handleLogOut"
              >
                <button
                  class="px-6 py-2.5 bg-yellow-600 hover:bg-yellow-500 text-sm text-white font-bold rounded-md transition duration-200"
                  type="submit"
                >
                  Cerrar sesión
                </button>
              </form>
            </template>
          </div>
        </div>
      </div>
    </div>

    <div class="hidden lg:hidden w-full" id="mobile-menu" ref="mobileMenu">
      <div class="space-y-1 px-2 pb-3 pt-2 flex flex-col">
        <router-link
          to="/"
          class="hover:bg-gray-200 text-black block rounded-md px-3 py-2 text-base font-medium"
          >Inicio</router-link
        >
        <router-link
          to="/cursos"
          class="hover:bg-gray-200 text-md text-black rounded-md px-3 py-2 font-medium"
          >Cursos</router-link
        >
        <template v-if="!user.id">
          <router-link
            class="inline-block lg:ml-auto lg:mr-3 px-6 py-2.5 bg-gray-50 hover:bg-gray-100 text-sm text-gray-900 font-bold rounded-md transition duration-200"
            to="/iniciar-sesion"
          >
            Iniciar sesión
          </router-link>
          <router-link
            class="inline-block px-6 py-2.5 bg-green-600 hover:bg-green-500 text-sm text-white font-bold rounded-md transition duration-200"
            to="/registro"
          >
            Registrarse
          </router-link>
        </template>
        <template v-else>
          <router-link
            to="/perfil"
            class="hover:bg-gray-200 text-md text-black rounded-md px-3 py-2 font-medium"
            >Perfil</router-link
          >
          <template v-if="user.role == 'user'">
            <router-link
              class="hover:bg-gray-200 text-md text-black rounded-md px-3 py-2 font-medium"
              to="/chat"
              >Chat</router-link
            >
          </template>
          <template v-if="user.role == 'admin'">
            <router-link
              class="hover:bg-gray-200 text-md text-black rounded-md px-3 py-2 font-medium"
              to="/admin/cursos"
              >Administrador</router-link
            >
            <router-link
              class="hover:bg-gray-200 text-md text-black rounded-md px-3 py-2 font-medium"
              to="/admin/cursos/crear"
              >Crear curso</router-link
            >
          </template>
          <form class="block" action="#" @submit.prevent="handleLogOut">
            <button
              class="px-6 py-2.5 bg-yellow-600 hover:bg-yellow-500 text-sm text-white font-bold rounded-md transition duration-200"
              type="submit"
            >
              Cerrar sesión
            </button>
          </form>
        </template>
      </div>
    </div>
  </nav>

  <main class="container mx-auto my-8 p-4">
    <router-view></router-view>
  </main>

  <footer class="bg-white shadow dark:bg-gray-900">
    <div class="container m-auto p-4 md:py-8">
      <div class="sm:flex sm:items-center sm:justify-between">
        <router-link
          to="/"
          class="flex items-center mb-4 sm:mb-0 footer-educode"
        >
          <img src="images/logo.png" class="h-8 mr-3" alt="EduCode Logo" />
          <span
            class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
            >EduCode</span
          >
        </router-link>
        <ul
          class="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400"
        >
          <li>
            <router-link to="/" class="mr-4 hover:underline md:mr-6"
              >Inicio</router-link
            >
          </li>
          <li>
            <router-link to="/cursos" class="mr-4 hover:underline md:mr-6"
              >Cursos</router-link
            >
          </li>
          <template v-if="!user.id">
            <li>
              <router-link
                to="/iniciar-sesion"
                class="mr-4 hover:underline md:mr-6"
                >Iniciar sesión</router-link
              >
            </li>
            <li>
              <router-link to="/registro" class="hover:underline"
                >Registrarse</router-link
              >
            </li>
          </template>
        </ul>
      </div>
      <hr
        class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8"
      />
      <span
        class="block text-sm text-gray-500 sm:text-center dark:text-gray-400"
        >© 2023
        <router-link to="/" class="hover:underline">EduCode</router-link>. Todos
        los derechos reservados.</span
      >
    </div>
  </footer>
</template>

<style lang="scss" scoped></style>
