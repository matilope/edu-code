<script setup>
import PrimaryButton from "../components/PrimaryButton.vue";
import PrimaryInput from "../components/PrimaryInput.vue";
import PrimaryLabel from "../components/PrimaryLabel.vue";
import { register } from "../services/auth.js";
import { modalAlert } from "../helpers/modal.js";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const loading = ref(false);
const user = ref({
  name: "",
  email: "",
  password: "",
});

const handleRegister = async () => {
  loading.value = true;
  try {
    const registerState = await register({ ...user.value });
    if (registerState.email === user.value.email) {
      router.push("/perfil");
    } else {
      modalAlert(registerState.message, "warning");
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
    <h2 class="text-2xl md:text-3xl lg:text-4xl mb-8">Crear cuenta</h2>
    <form action="#" @submit.prevent="handleRegister">
      <div class="my-3">
        <PrimaryLabel for="email">Nombre</PrimaryLabel>
        <PrimaryInput
          id="name"
          type="text"
          :disabled="loading"
          v-model="user.name"
          required
        />
      </div>
      <div class="my-3">
        <PrimaryLabel for="email">Correo electrónico</PrimaryLabel>
        <PrimaryInput
          id="email"
          type="email"
          autocomplete="email"
          :disabled="loading"
          v-model="user.email"
          required
        />
      </div>
      <div class="my-3">
        <PrimaryLabel for="password">Contraseña</PrimaryLabel>
        <PrimaryInput
          id="password"
          type="password"
          :disabled="loading"
          v-model="user.password"
          required
        />
      </div>
      <PrimaryButton type="submit" :loading="loading">Confirmar</PrimaryButton>
    </form>
  </section>
</template>

<style lang="scss" scoped></style>
