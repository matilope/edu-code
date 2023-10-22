<script>
import PrimaryButton from "../components/PrimaryButton.vue";
import PrimaryInput from "../components/PrimaryInput.vue";
import PrimaryLabel from "../components/PrimaryLabel.vue";
import PrimaryTextarea from "../components/PrimaryTextarea.vue";
import { getServiceById, editService, } from "../services/services.js";

export default {
  name: "EditeService",
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
    async editService() {
      this.loading = true;
      try {
        const newService = await editService(this.service.id, {...this.service});
        if (newService) {
          this.loading = false;
          this.$router.push("/servicios");
        }
      } catch (err) {
        console.log("err", err);
      } finally {
        this.loading = false;
      }
    },
  },
  async mounted(){
    this.loading = true;
    try {
      this.service = await getServiceById(this.$route.params.id);
    } catch (err) {}
    this.loading = false;
  }
};
</script>

<template>
  <section
    class="form-user flex min-h-full flex-col justify-center px-6 py-12 lg:px-8"
  >
    <h2 class="text-4xl mb-8">Editar curso</h2>
    <form action="#" @submit.prevent="editService">
      <div class="my-3">
        <PrimaryLabel for="title">Título</PrimaryLabel>
        <PrimaryInput
          id="title"
          type="text"
          :disabled="loading"
          v-model="service.title"
          :value="service.title"
          required
        />
      </div>
      <div class="my-3">
        <PrimaryLabel for="description">Descripción</PrimaryLabel>
        <PrimaryTextarea
          id="description"
          :disabled="loading"
          v-model="service.description"
          :value="service.description"
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
          :value="service.duration"
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
          :value="service.level"
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
          :value="service.technologies"
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
          :value="service.price"
          required
        />
      </div>
      <PrimaryButton type="submit" :disabled="loading" :loading="loading"> Editar </PrimaryButton>
    </form>
  </section>
</template>

<style lang="scss" scoped></style>
