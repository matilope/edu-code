<script setup>
import PrimaryButton from "../components/PrimaryButton.vue";
import PrimaryInput from "../components/PrimaryInput.vue";
import PrimaryLabel from "../components/PrimaryLabel.vue";
import PrimaryTextarea from "../components/PrimaryTextarea.vue";
import { editService } from "../services/services.js";
import { useRouter, useRoute } from "vue-router";
import { ref, inject } from "vue";
import { useService } from "../composition/useService";
import { notificationSymbol } from "../symbols/notification";
import Loader from "../components/Loader.vue";

const { setNotification } = inject(notificationSymbol);
const router = useRouter();
const route = useRoute();
const loading = ref(false);
const { service, serviceLoading } = useService(route.params.id);

const editServiceImage = ref({
  file: null,
  preview: null,
});

const handleServiceFileChange = (event) => {
  editServiceImage.value.file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = function () {
    editServiceImage.value.preview = reader.result;
  };
  reader.readAsDataURL(editServiceImage.value.file);
};

const handleEditService = async () => {
  loading.value = true;
  try {
    const newService = await editService(service.value.id, {
      ...service.value,
      image: editServiceImage.value.file,
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
</script>

<template>
  <section
    class="form-user flex min-h-full flex-col justify-center px-6 py-12 lg:px-8"
  >
    <h2 class="text-2xl md:text-3xl lg:text-4xl mb-8">Editar curso</h2>
    <Loader v-if="serviceLoading" />
    <img
      class="rounded-md object-contain w-[60px] mb-3"
      :src="service.image"
      :alt="service.image_description ? service.image_description : service.title"
      v-if="service.image"
    />
    <form
      action="#"
      @submit.prevent="handleEditService"
      enctype="multipart/form-data"
    >
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
      <div class="my-3">
        <PrimaryLabel for="image">Imagen</PrimaryLabel>
        <div
          class="div-input-img mt-2 flex justify-center rounded-lg border border-gray-900/25 px-6 py-10"
        >
          <div class="text-center">
            <svg
              class="mx-auto h-12 w-12 text-gray-300"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <div
              class="mt-4 flex justify-center text-sm leading-6 text-gray-600"
            >
              <label
                class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
              >
                <span>Subir imagen</span>
                <input
                  type="file"
                  id="image"
                  class="sr-only"
                  :disabled="loading"
                  @change="handleServiceFileChange"
                />
              </label>
            </div>
            <p class="text-xs leading-5 text-gray-600">PNG, JPG, GIF, JPEG</p>
          </div>
        </div>
        <div class="my-3">
          <PrimaryLabel for="image_description">Descripción de la imagen</PrimaryLabel>
          <PrimaryInput
            id="image_description"
            type="text"
            :disabled="loading"
            v-model="service.image_description"
            :value="service.image_description"
          />
        </div>
        <div
          class="mt-4 mb-2"
          v-if="editServiceImage.preview !== null"
        >
          <img
            class="rounded-md object-contain w-[400px]"
            :src="editServiceImage.preview"
            alt=""
          />
        </div>
      </div>
      <PrimaryButton type="submit" :disabled="loading" :loading="loading">
        Editar
      </PrimaryButton>
    </form>
  </section>
</template>
