<script>
import PrimaryButton from "../components/PrimaryButton.vue";
import PrimaryInput from "../components/PrimaryInput.vue";
import PrimaryLabel from "../components/PrimaryLabel.vue";
import { logIn } from "../services/auth.js";

export default {
  name: "Login",
  components: {
    PrimaryButton,
    PrimaryInput,
    PrimaryLabel,
  },
  data() {
    return {
      user: {
        email: "",
        password: ""
      },
      loading: false,
    };
  },
  methods: {
    async logIn() {
      this.loading = true;
      try {
        const loginState = await logIn({ ...this.user });
        if (loginState.email === this.user.email) {
          this.$router.push("/perfil");
        } else {
          alert(loginState.message);
        }
      } catch ({ message }) {
        alert(message);
      }
      this.loading = false;
    },
  },
};
</script>

<template>
  <section
    class="form-user flex min-h-full flex-col justify-center px-6 py-12 lg:px-8"
  >
    <h2 class="text-4xl mb-8">Inicio de sesión</h2>
    <form action="#" @submit.prevent="logIn">
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
      <PrimaryButton type="submit" :disabled="loading" :loading="loading"> Ingresar </PrimaryButton>
    </form>
  </section>
</template>

<style lang="scss" scoped></style>
