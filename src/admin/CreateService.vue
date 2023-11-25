<script setup>
import PrimaryButton from "../components/PrimaryButton.vue";
import PrimaryInput from "../components/PrimaryInput.vue";
import PrimaryLabel from "../components/PrimaryLabel.vue";
import PrimaryTextarea from "../components/PrimaryTextarea.vue";
import PrimarySelect from "../components/PrimarySelect.vue";
import { saveService } from "../services/services.js";
import { modalAlert } from "../helpers/modal.js";
import { useRouter } from "vue-router";
import { ref } from "vue";

const router = useRouter();
const loading = ref(false);
const service = ref({
  title: null,
  description: null,
  duration: null,
  level: null,
  technologies: null,
  price: null,
});

const createService = async () => {
  loading.value = true;
  try {
    const newService = await saveService(service.value);
    if (newService?.id) {
      loading.value = false;
      modalAlert("Se ha creado el curso correctamente", "success");
      router.push("/admin/cursos");
    } else {
      modalAlert("Ha ocurrido un error al intentar crear el curso", "error");
    }
  } catch ({ message }) {
    modalAlert(message, "error");
  } finally {
    loading.value = false;
  }
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
        <PrimarySelect
          id="level"
          :disabled="loading"
          v-model="service.level"
          required
        >
          <option value="basico">Básico</option>
          <option value="intermedio">Intermedio</option>
          <option value="avanzado">Avanzado</option>
        </PrimarySelect>
      </div>
      <div class="my-3">
        <PrimaryLabel for="technologies">Tecnologías</PrimaryLabel>
        <PrimarySelect
          id="technologies"
          :disabled="loading"
          v-model="service.technologies"
          required
        > 
          <option value="angular">Angular</option>
          <option value="vue">Vue</option>
          <option value="react">React</option>
          <option value="javascript">JavaScript</option>
          <option value="typescript">TypeScript</option>
          <option value="php">PHP</option>
          <option value="laravel">Laravel</option>
          <option value="nodejs">NodeJS</option>
          <option value="mysql">MySQL</option>
          <option value="mongodb">MongoDB</option>
          <option value="html5">HTML5</option>
          <option value="css">CSS</option>
          <option value="sass">SASS</option>
        </PrimarySelect>
      </div>
      <div class="my-3">
        <PrimaryLabel for="price">Precio</PrimaryLabel>
        <PrimaryInput
          id="price"
          type="number"
          :disabled="loading"
          v-model="service.price"
          required
        />
      </div>
      <PrimaryButton type="submit" :disabled="loading" :loading="loading">
        Subir
      </PrimaryButton>
    </form>
  </section>
</template>

<style lang="scss" scoped></style>
