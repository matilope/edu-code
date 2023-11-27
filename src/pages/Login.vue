<script setup>
import PrimaryButton from "../components/PrimaryButton.vue";
import PrimaryInput from "../components/PrimaryInput.vue";
import PrimaryLabel from "../components/PrimaryLabel.vue";
import { logIn } from "../services/auth.js";
import { useRouter } from "vue-router";
import { ref, inject } from "vue";
import { notificationSymbol } from "../symbols/notification";

const { setNotification } = inject(notificationSymbol);
const loading = ref(false);
const user = ref({
  email: "",
  password: "",
});
const router = useRouter();

const handleLogIn = async () => {
  loading.value = true;
  try {
    const loginState = await logIn({ ...user.value });
    if (loginState.email === user.value.email) {
      setNotification({
        message: "Se ha iniciado sesión correctamente.",
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
    <h2 class="text-2xl md:text-3xl lg:text-4xl mb-8">Inicio de sesión</h2>
    <form action="#" @submit.prevent="handleLogIn">
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
      <PrimaryButton type="submit" :disabled="loading" :loading="loading">
        Ingresar
      </PrimaryButton>
    </form>
  </section>
</template>
