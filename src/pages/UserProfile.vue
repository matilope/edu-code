<script setup>
import { getUserById } from "../services/user";
import { modalAlert } from "../helpers/modal";
import Loader from "../components/Loader.vue";
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";

const loading = ref(false);
const user = ref({
  id: null,
  name: null,
});

const router = useRouter();
const route = useRoute();

onMounted(async () => {
  loading.value = true;
  try {
    user.value = await getUserById(route.params.id);
  } catch ({ message }) {
    router.push("/");
    modalAlert(message, "error");
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <section class="profile">
    <div class="content">
      <img src="images/user.jpg" alt="Usuario" />
      <div class="info">
        <template v-if="!loading">
          <h1 class="text-1xl md:text-2xl">
            Perfil de {{ user.name || "..." }}
          </h1>
          <p>Este perfil puede ser visto por usuarios registrados</p>
          <router-link
            :to="`/usuario/${user.id}/chat`"
            class="text-green-700 underline mt-3"
            >Iniciar conversación con {{ user.email }}</router-link
          >
        </template>
        <template v-else>
          <Loader />
        </template>
      </div>
    </div>
  </section>
</template>
