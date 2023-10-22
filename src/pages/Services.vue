<script>
import { subscribeToService } from "../services/services.js";
import { dateToString } from "../helpers/date.js";

export default {
  name: "Services",
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
  </article>
</template>

<style lang="scss" scoped></style>
