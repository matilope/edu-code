<script setup>
import PrimaryButton from "../components/PrimaryButton.vue";
import PrimaryInput from "../components/PrimaryInput.vue";
import PrimaryLabel from "../components/PrimaryLabel.vue";
import { register } from "../services/auth.js";
import { ref, inject } from "vue";
import { useRouter } from "vue-router";
import { notificationSymbol } from "../symbols/notification";

const { setNotification } = inject(notificationSymbol);
const router = useRouter();
const loading = ref(false);
const user = ref({
  displayName: "",
  email: "",
  password: "",
});

const handleRegister = async () => {
  loading.value = true;
  try {
    const registerState = await register({ ...user.value });
    if (registerState.email === user.value.email) {
      setNotification({
        message: "Se ha creado la cuenta exitosamente.",
        type: "success",
      });
      router.push("/perfil");
    } else {
      setNotification({
        message: "Los datos no son correctos.",
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
    <h2 class="text-2xl md:text-3xl lg:text-4xl mb-8">Crear cuenta</h2>
    <form action="#" @submit.prevent="handleRegister">
      <div class="my-3">
        <PrimaryLabel for="name">Nombre</PrimaryLabel>
        <PrimaryInput
          id="name"
          type="text"
          :disabled="loading"
          v-model="user.displayName"
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