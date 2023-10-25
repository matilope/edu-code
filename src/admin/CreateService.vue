<script>
import PrimaryButton from "../components/PrimaryButton.vue";
import PrimaryInput from "../components/PrimaryInput.vue";
import PrimaryLabel from "../components/PrimaryLabel.vue";
import PrimaryTextarea from "../components/PrimaryTextarea.vue";
import { saveService } from "../services/services.js";
import { modalAlert } from "../helpers/modal.js";

export default {
  name: "CreateService",
  components: {
    PrimaryButton,
    PrimaryInput,
    PrimaryLabel,
    PrimaryTextarea,
  },
  data() {
    return {
      loading: false,
      service: {
        title: null,
        description: null,
        duration: null,
        level: null,
        technologies: null,
        price: null,
      },
    };
  },
  methods: {
    async createService() {
      this.loading = true;
      try {
        const newService = await saveService(this.service);
        if (newService?.id) {
          this.loading = false;
          this.$router.push("/admin/cursos");
        }
      } catch (err) {
        modalAlert("Ha ocurrido un error", "error");
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<template>
  <section
    class="form-user flex min-h-full flex-col justify-center px-6 py-12 lg:px-8"
  >
    <h2 class="text-2xl md:text-3xl lg:text-4xl mb-8">Publicar curso</h2>
    <form action="#" @submit.prevent="createService">
      <div class="my-3">
        <PrimaryLabel for="title">Título</PrimaryLabel>
        <PrimaryInput
          id="title"
          type="text"
          :disabled="loading"
          v-model="service.title"
          required
        />
      </div>
      <div class="my-3">
        <PrimaryLabel for="description">Descripción</PrimaryLabel>
        <PrimaryTextarea
          id="description"
          :disabled="loading"
          v-model="service.description"
          required
        />
      </div>
      <div class="my-3">
        <PrimaryLabel for="duration">Duración (en horas)</PrimaryLabel>
        <PrimaryInput
          id="duration"
          type="number"
          :disabled="loading"
          v-model="service.duration"
          required
        />
      </div>
      <div class="my-3">
        <PrimaryLabel for="level">Nivel</PrimaryLabel>
        <PrimaryInput
          id="level"
          type="text"
          :disabled="loading"
          v-model="service.level"
          required
        />
      </div>
      <div class="my-3">
        <PrimaryLabel for="technologies">Tecnologías</PrimaryLabel>
        <PrimaryInput
          id="level"
          type="text"
          :disabled="loading"
          v-model="service.technologies"
          required
        />
      </div>
      <div class="my-3">
        <PrimaryLabel for="price">Precio</PrimaryLabel>
        <PrimaryInput
          id="level"
          type="number"
          :disabled="loading"
          v-model="service.price"
          required
        />
      </div>
      <PrimaryButton type="submit" :disabled="loading" :loading="loading"> Subir </PrimaryButton>
    </form>
  </section>
</template>

<style lang="scss" scoped></style>
