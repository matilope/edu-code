<script>
import { subscribeToService, deleteService } from "../services/services.js";
import { dateToString } from "../helpers/date.js";
import { numberToCurrency } from "../helpers/price.js";
import { modalConfirmation, modalAlert } from "../helpers/modal.js";

export default {
  name: "AdminServices",
  components: {},
  data() {
    return {
      loading: true,
      services: [],
      unsubscribeServices: () => {},
    };
  },
  methods: {
    formatDate(date) {
      return dateToString(date);
    },
    formatPrice(price) {
      return numberToCurrency(price);
    },
    async deleteService(id) {
      const result = await modalConfirmation("¿Estas seguro de eliminar el curso?", "error");
      if(result) {
        try {
          const deletedService = await deleteService(id);
          if (deletedService) {
            modalAlert("Se ha eliminado correctamente", "success");
          }
        } catch ({ message }) {
          modalAlert(message, "error");
        }
      }
    },
  },
  async mounted() {
    this.loading = true;
    try {
      this.unsubscribeServices = subscribeToService(
        (newServices) => (this.services = newServices)
      );
    } catch (err) {
      this.$router.push("/");
    } finally {
      this.loading = false;
    }
  },
  unmounted() {
    this.unsubscribeServices();
  },
};
</script>

<template>
  <div
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
            <th
              colspan="1"
              role="columnheader"
            >
              <div
                class="flex items-center justify-between pb-2 pt-4 text-start uppercase tracking-wide text-gray-600 sm:text-xs lg:text-xs"
              >
                Nombre del curso
              </div>
            </th>
            <th
              colspan="1"
              role="columnheader"
            >
              <div
                class="flex items-center justify-between pb-2 pt-4 text-start uppercase tracking-wide text-gray-600 sm:text-xs lg:text-xs"
              >
                Precio
              </div>
            </th>
            <th
              colspan="1"
              role="columnheader"
            >
              <div
                class="flex items-center justify-between pb-2 pt-4 text-start uppercase tracking-wide text-gray-600 sm:text-xs lg:text-xs"
              >
                Fecha de publicación
              </div>
            </th>
            <th
              colspan="1"
              role="columnheader"
            >
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
                {{ formatPrice(service.price) }}
              </p>
            </td>
            <td class="py-3 text-sm" role="cell">
              <p class="text-md font-medium text-gray-600 dark:text-white">
                {{ formatDate(service.created_at) }}
              </p>
            </td>
            <td>
              <div class="services-actions">
                <router-link class="edit bg-yellow-600 hover:bg-yellow-500" :to="'/admin/cursos/' + service.id + '/editar'"
                  >Editar</router-link
                >
                <form class="delete bg-red-600 hover:bg-red-500" action="#" @submit.prevent="deleteService(service.id)">
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

<style lang="scss" scoped></style>
