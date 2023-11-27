<script setup>
import Loader from "../components/Loader.vue";
import { useRoute } from "vue-router";
import { useUser } from "../composition/useUser";

const route = useRoute();
const { user, userLoading } = useUser(route.params.id);
</script>

<template>
  <section class="profile">
    <div class="content">
      <img src="images/user.jpg" alt="Usuario" />
      <div class="info">
        <template v-if="!userLoading">
          <h1 class="text-1xl md:text-2xl">
            Perfil de {{ user.displayName || "..." }}
          </h1>
          <p>Este perfil puede ser visto por usuarios registrados</p>
          <router-link
            :to="`/usuarios/${user.id}/chat`"
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
