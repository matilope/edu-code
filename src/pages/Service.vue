<script setup>
import Loader from "../components/Loader.vue";
import { useRoute } from "vue-router";
import { dateToString } from "../helpers/date.js";
import { numberToCurrency } from "../helpers/price.js";
import { useService } from "../composition/useService";
import { useAuth } from "../composition/useAuth";
import { ref, inject, watchEffect } from "vue";
import { hireService } from "../services/user";
import { notificationSymbol } from "../symbols/notification";
import { modalConfirmation } from "../helpers/modal";

const { setNotification } = inject(notificationSymbol);
const route = useRoute();
const { service, serviceLoading } = useService(route.params.id);
const { user } = useAuth();

const isTechnologiesOpen = ref(false);
const isDurationOpen = ref(false);
const isLevelOpen = ref(false);

const toggle = (type) => {
  switch (type) {
    case "technologies":
      isTechnologiesOpen.value = !isTechnologiesOpen.value;
      break;
    case "duration":
      isDurationOpen.value = !isDurationOpen.value;
      break;
    default:
      isLevelOpen.value = !isLevelOpen.value;
  }
};

const hiring = async () => {
  const result = await modalConfirmation(
    "¿Estas seguro de contratar el curso?",
    "success"
  );
  if (result) {
    try {
      user.value.services.push({
        id: service.value.id,
        title: service.value.title,
        price: service.value.price,
        image: service.value.image
      });
      await hireService(user);
      setNotification({
        message: "Has contratado el curso exitosamente.",
        type: "success",
      });
    } catch ({ message }) {
      setNotification({
        message,
        type: "error",
      });
    }
  } else {
    setNotification({
      message: "No se ha contratado el curso.",
      type: "warning",
    });
  }
};

const alreadyBought = ref(false);
watchEffect(() => {
  if (serviceLoading && user?.value?.services?.length > 0) {
    alreadyBought.value = user.value.services.some(
      (boughtService) => boughtService.id === service.value.id
    );
  }
});
</script>

<template>
  <template v-if="!serviceLoading">
    <article>
      <div class="flex justify-between sm:gap-5 flex-col sm:flex-row">
        <div class="lg:flex justify-center w-full sm:w-[50%]">
          <div class="lg:order-2 lg:ml-5">
            <div class="max-w-xl overflow-hidden rounded-lg mb-3">
              <img class="h-full w-auto sm:w-full mx-auto object-contain p-3" :src="service.image" :alt="service.image_description ? service.image_description : service.title" v-if="service.image" />
              <img class="h-full w-auto sm:w-full mx-auto object-contain" src="images/default.jpg" :alt="service.image_description ? service.image_description : service.title" v-else />
            </div>
          </div>
        </div>
        <div class="w-full sm:w-[50%]">
          <h1 class="text-2xl font-bold text-gray-900 sm:text-3xl">
            {{ service.title }}
          </h1>
          <p class="my-4">
            Publicado el {{ dateToString(service.created_at) }}
          </p>
          <div class="flex items-center">
            <div class="flex items-center">
              <svg
                class="block h-4 w-4 align-middle text-yellow-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  class=""
                ></path>
              </svg>
              <svg
                class="block h-4 w-4 align-middle text-yellow-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  class=""
                ></path>
              </svg>
              <svg
                class="block h-4 w-4 align-middle text-yellow-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  class=""
                ></path>
              </svg>
              <svg
                class="block h-4 w-4 align-middle text-yellow-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  class=""
                ></path>
              </svg>
              <svg
                class="block h-4 w-4 align-middle text-yellow-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  class=""
                ></path>
              </svg>
            </div>
            <p class="ml-2 text-sm font-medium text-gray-500">13 opiniones</p>
          </div>

          <div class="my-5">
            <div
              class="accordion bg-gray-50 py-1 px-2 rounded-md border-t-2 border-b-2 border-solid border-white"
            >
              <button
                @click="toggle('technologies')"
                class="py-3 inline-flex justify-between items-center gap-x-3 w-full font-semibold text-start text-gray-800 hover:text-gray-500 rounded-lg disabled:opacity-50 dark:text-gray-200 dark:hover:text-gray-400 dark:focus:outline-none dark:focus:text-gray-400"
              >
                Tecnologías
                <svg
                  v-if="!isTechnologiesOpen"
                  class="block w-4 h-4 svg-minus"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="M12 5v14" />
                </svg>
                <svg
                  v-else
                  class="block w-4 h-4 svg-plus"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M5 12h14" />
                </svg>
              </button>
              <div
                v-if="isTechnologiesOpen"
                class="content w-full overflow-hidden transition-[height] duration-300"
              >
                <p class="text-gray-800 dark:text-gray-200 mt-1 mb-3">
                  {{ service.technologies }}
                </p>
              </div>
            </div>
            <div
              class="accordion bg-gray-50 py-1 px-2 rounded-md border-t-2 border-b-2 border-solid border-white"
            >
              <button
                @click="toggle('duration')"
                class="py-3 inline-flex justify-between items-center gap-x-3 w-full font-semibold text-start text-gray-800 hover:text-gray-500 rounded-lg disabled:opacity-50 dark:text-gray-200 dark:hover:text-gray-400 dark:focus:outline-none dark:focus:text-gray-400"
              >
                Duración
                <svg
                  v-if="!isDurationOpen"
                  class="block w-4 h-4 svg-minus"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="M12 5v14" />
                </svg>
                <svg
                  v-else
                  class="block w-4 h-4 svg-plus"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M5 12h14" />
                </svg>
              </button>
              <div
                v-if="isDurationOpen"
                class="content w-full overflow-hidden transition-[height] duration-300"
              >
                <p class="text-gray-800 dark:text-gray-200 mt-1 mb-3">
                  {{ service.duration }} horas
                </p>
              </div>
            </div>
            <div
              class="accordion bg-gray-50 py-1 px-2 rounded-md border-t-2 border-b-2 border-solid border-white"
            >
              <button
                @click="toggle('level')"
                class="py-3 inline-flex justify-between items-center gap-x-3 w-full font-semibold text-start text-gray-800 hover:text-gray-500 rounded-lg disabled:opacity-50 dark:text-gray-200 dark:hover:text-gray-400 dark:focus:outline-none dark:focus:text-gray-400"
              >
                Nivel de dificultad
                <svg
                  v-if="!isLevelOpen"
                  class="block w-4 h-4 svg-minus"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="M12 5v14" />
                </svg>
                <svg
                  v-else
                  class="block w-4 h-4 svg-plus"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M5 12h14" />
                </svg>
              </button>
              <div
                v-if="isLevelOpen"
                class="content w-full overflow-hidden transition-[height] duration-300"
              >
                <p class="text-gray-800 dark:text-gray-200 mt-1 mb-3">
                  {{ service.level }}
                </p>
              </div>
            </div>
          </div>

          <div
            class="flex flex-col items-center justify-between gap-5 space-y-4 border-t border-b py-4 sm:flex-row sm:space-y-0"
          >
            <div class="flex items-end">
              <span class="text-3xl font-bold">{{
                numberToCurrency(service.price)
              }}</span>
            </div>
            <template v-if="alreadyBought">
              <span
                class="inline-flex items-center justify-center rounded-md border-2 border-transparent opacity-50 bg-red-500 bg-none px-12 py-3 text-center text-base font-bold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-red-600"
              >
                Contratado
              </span>
            </template>
            <template v-else>
              <template v-if="user.role">
                <form action="#" method="post" @submit.prevent="hiring">
                  <button
                    data-id="{{ $service->id }}"
                    data-name="{{ $service->destiny->name }}"
                    type="submit"
                    class="inline-flex items-center justify-center rounded-md border-2 border-transparent bg-green-500 bg-none px-12 py-3 text-center text-base font-bold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-green-600"
                  >
                    Contratar
                  </button>
                </form>
              </template>
              <template v-else>
                <router-link
                  to="/registro"
                  class="inline-flex items-center justify-center rounded-md border-2 border-transparent bg-orange-500 bg-none px-12 py-3 text-center text-base font-bold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-orange-600"
                  >Registrarse para contratar</router-link
                >
              </template>
            </template>
          </div>
        </div>
      </div>
      <div class="w-full">
        <div class="border-b border-gray-300">
          <nav class="flex gap-4">
            <span
              class="border-b-2 border-green-500 py-4 text-sm font-medium text-gray-900 hover:border-gray-400 hover:text-gray-800"
              >Descripción</span
            >
          </nav>
        </div>

        <div class="mt-4 flow-root">
          <p>
            {{ service.description }}
          </p>
        </div>
      </div>
    </article>
  </template>
  <template v-else>
    <Loader />
  </template>
</template>
