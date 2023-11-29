<script setup>
import { deleteService } from "../services/services.js";
import { dateToString } from "../helpers/date.js";
import { numberToCurrency } from "../helpers/price.js";
import { modalConfirmation } from "../helpers/modal.js";
import { inject } from "vue";
import { notificationSymbol } from "../symbols/notification";
import { useServices } from "../composition/useService";
import Loader from "../components/Loader.vue";

const { setNotification } = inject(notificationSymbol);
const { services, servicesLoading } = useServices();

const handleDeleteService = async (id, image) => {
  const result = await modalConfirmation(
    "¿Estas seguro de eliminar el curso?",
    "error"
  );
  if (result) {
    try {
      const deletedService = await deleteService(id);
      if (deletedService) {
        setNotification({
          message: "Se ha eliminado correctamente",
          type: "success",
        });
      }
    } catch ({ message }) {
      setNotification({
        message,
        type: "error",
      });
    }
  } else {
    setNotification({
      message: "No se ha eliminado el curso",
      type: "success",
    });
  }
};
</script>

<template>
  <loader v-if="servicesLoading" />
  <div
    v-else
    class="relative flex w-full flex-col rounded-[10px] border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none"
  >
    <div
      class="flex h-fit w-full items-center justify-between rounded-t-2xl bg-white px-4 pb-[20px] pt-4 shadow-2xl shadow-gray-100 dark:!bg-navy-700 dark:shadow-none"
    >
      <h1 class="text-lg font-bold text-navy-700 dark:text-white">
        Cursos publicados
      </h1>
    </div>
    <div class="w-full overflow-x-scroll px-4 md:overflow-x-hidden">
      <table role="table" class="w-full min-w-[720px] overflow-x-scroll">
        <thead>
          <tr role="row">
            <th colspan="1" role="columnheader">
              <div
                class="flex items-center justify-between pb-2 pt-4 text-start uppercase tracking-wide text-gray-600 sm:text-xs lg:text-xs"
              >
                Nombre del curso
              </div>
            </th>
            <th colspan="1" role="columnheader">
              <div
                class="flex items-center justify-between pb-2 pt-4 text-start uppercase tracking-wide text-gray-600 sm:text-xs lg:text-xs"
              >
                Precio
              </div>
            </th>
            <th colspan="1" role="columnheader">
              <div
                class="flex items-center justify-between pb-2 pt-4 text-start uppercase tracking-wide text-gray-600 sm:text-xs lg:text-xs"
              >
                Duración
              </div>
            </th>
            <th colspan="1" role="columnheader">
              <div
                class="flex items-center justify-between pb-2 pt-4 text-start uppercase tracking-wide text-gray-600 sm:text-xs lg:text-xs"
              >
                Fecha de publicación
              </div>
            </th>
            <th colspan="1" role="columnheader">
              <div
                class="flex items-center justify-between pb-2 pt-4 text-start uppercase tracking-wide text-gray-600 sm:text-xs lg:text-xs"
              >
                Acciones
              </div>
            </th>
          </tr>
        </thead>
        <tbody role="rowgroup" class="px-4">
          <tr role="row" v-for="service in services" :key="service.id">
            <td class="py-3 text-sm" role="cell">
              <div class="flex items-center gap-2">
                <h2 class="text-sm font-medium text-navy-700 dark:text-white">
                  {{ service.title }}
                </h2>
              </div>
            </td>
            <td class="py-3 text-sm" role="cell">
              <p class="text-md font-medium text-gray-600 dark:text-white">
                {{ numberToCurrency(service.price) }}
              </p>
            </td>
            <td class="py-3 text-sm" role="cell">
              <p class="text-md font-medium text-gray-600 dark:text-white">
                {{ service.duration }} horas
              </p>
            </td>
            <td class="py-3 text-sm" role="cell">
              <p class="text-md font-medium text-gray-600 dark:text-white">
                {{ dateToString(service.created_at) }}
              </p>
            </td>
            <td>
              <div class="services-actions">
                <router-link
                  class="edit bg-yellow-600 hover:bg-yellow-500"
                  :to="'/admin/cursos/' + service.id + '/editar'"
                  >Editar</router-link
                >
                <form
                  class="delete bg-red-600 hover:bg-red-500"
                  action="#"
                  @submit.prevent="handleDeleteService(service.id)"
                >
                  <button type="submit">Eliminar</button>
                </form>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>