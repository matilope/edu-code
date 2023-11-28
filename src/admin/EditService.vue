<script setup>
import PrimaryButton from "../components/PrimaryButton.vue";
import PrimaryInput from "../components/PrimaryInput.vue";
import PrimaryLabel from "../components/PrimaryLabel.vue";
import PrimaryTextarea from "../components/PrimaryTextarea.vue";
import { getServiceById, editService } from "../services/services.js";
import { useRouter, useRoute } from "vue-router";
import { ref, onMounted, inject } from "vue";
import { notificationSymbol } from "../symbols/notification";

const { setNotification } = inject(notificationSymbol);
const router = useRouter();
const route = useRoute();
const loading = ref(false);
const service = ref({
  title: "",
  description: "",
  duration: "",
  level: "",
  technologies: "",
  price: "",
});

const handleEditService = async () => {
  loading.value = true;
  try {
    const newService = await editService(service.value.id, {
      ...service.value,
    });
    if (newService) {
      loading.value = false;
      setNotification({
        message: "Se ha editado el curso correctamente",
        type: "success",
      });
      router.push("/admin/cursos");
    } else {
      setNotification({
        message: "Ha ocurrido un error al intentar editar el curso",
        type: "warning",
      });
    }
  } catch ({ message }) {
    setNotification({
      message,
      type: "error",
    });
  } finally {
    loading.value = false;
  }
};
onMounted(async () => {
  loading.value = true;
  try {
    service.value = await getServiceById(route.params.id);
  } catch ({ message }) {
    setNotification({
      message,
      type: "error",
    });
    router.push("/admin/cursos");
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <section
    class="form-user flex min-h-full flex-col justify-center px-6 py-12 lg:px-8"
  >
    <h2 class="text-2xl md:text-3xl lg:text-4xl mb-8">Editar curso</h2>
    <form action="#" @submit.prevent="handleEditService">
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
      <PrimaryButton type="submit" :disabled="loading" :loading="loading">
        Editar
      </PrimaryButton>
    </form>
  </section>
</template>