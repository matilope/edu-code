<script setup>
import PrimaryButton from "../components/PrimaryButton.vue";
import PrimaryInput from "../components/PrimaryInput.vue";
import PrimaryLabel from "../components/PrimaryLabel.vue";
import PrimaryTextarea from "../components/PrimaryTextarea.vue";
import PrimarySelect from "../components/PrimarySelect.vue";
import { saveService } from "../services/services.js";
import { useRouter } from "vue-router";
import { ref, inject } from "vue";
import { notificationSymbol } from "../symbols/notification";

const { setNotification } = inject(notificationSymbol);
const router = useRouter();
const loading = ref(false);
const service = ref({
  title: "",
  description: "",
  duration: "",
  level: "",
  technologies: "",
  price: "",
  image: null,
  image_description: "",
});

const createServiceImage = ref({
  file: null,
  preview: null,
});

const handleServiceFileChange = (event) => {
  createServiceImage.value.file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = function () {
    createServiceImage.value.preview = reader.result;
  };
  reader.readAsDataURL(createServiceImage.value.file);
};

const createService = async () => {
  loading.value = true;
  try {
    const newService = await saveService({
      ...service.value,
      image: createServiceImage.value.file,
    });
    if (newService) {
      loading.value = false;
      setNotification({
        message: "Se ha creado el curso correctamente",
        type: "success",
      });
      router.push("/admin/cursos");
    } else {
      setNotification({
        message: "Ha ocurrido un error al intentar crear el curso",
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
      </div>
      <div class="my-3">
        <PrimaryLabel for="image_description"
          >Descripción de la imagen</PrimaryLabel
        >
        <PrimaryInput
          id="image_description"
          type="text"
          :disabled="loading"
          v-model="service.image_description"
        />
      </div>
      <div class="mt-4 mb-2" v-if="createServiceImage.preview !== null">
        <img
          class="rounded-md object-contain w-[400px]"
          :src="createServiceImage.preview"
          alt=""
        />
      </div>
      <PrimaryButton type="submit" :disabled="loading" :loading="loading">
        Subir
      </PrimaryButton>
    </form>
  </section>
</template>
