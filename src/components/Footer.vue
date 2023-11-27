<script setup>
import { useAuth } from "../composition/useAuth";

const { user } = useAuth();
</script>

<template>
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
