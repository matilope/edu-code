<script>
import { subscribeToService, deleteService } from "../services/services.js";
import { dateToString } from "../helpers/date.js";

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
    async deleteService(id){
      try {
        const deletedService = await deleteService(id);
        console.log("deleted service", deletedService);
        if(deletedService){
          alert("Se ha eliminado el servicio");
        }
      }
      catch({message}){
        alert(message);
      }
    }
  },
  async mounted() {
    this.loading = true;
    try {
      this.unsubscribeServices = subscribeToService(
        (newServices) => (this.services = newServices)
      );
    } catch (err) {}
    this.loading = false;
  },
  unmounted() {
    this.unsubscribeServices();
  },
};
</script>

<template>
  <article v-for="service in services" class="" :key="service.id">
    <h2>{{ service.title }}</h2>
    <p>{{ service.description }}</p>
    <span>{{ service.duration }}</span>
    <p>{{ formatDate(service.created_at) }}</p>
    <router-link :to="'/admin/servicios/' + service.id + '/editar'">Editar</router-link>
    <form action="#" @submit.prevent="deleteService(service.id)">
      <button type="submit">Eliminar</button>
    </form>
  </article>
</template>

<style lang="scss" scoped></style>
