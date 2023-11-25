<script setup>
import { subscribeToAuth } from "../services/auth.js";
import { subscribeToUser } from "../services/user.js";
import Loader from "../components/Loader.vue";
import { modalAlert } from "../helpers/modal";
import { useRouter } from "vue-router";
import { ref, onMounted, onUnmounted } from "vue";
import { useAuth } from '../composition/useAuth.js';

const router = useRouter();
const loading = ref(true);
const { user } = useAuth();
const users = ref([]);

let unSubscribeAuth = () => {};
let unSubscribeUser = () => {};

onMounted(async () => {
  loading.value = true;
  try {
    unSubscribeAuth = subscribeToAuth((authUser) => (user.value = authUser));
    unSubscribeUser = subscribeToUser((users) => (users.value = users));
  } catch ({ message }) {
    router.push("/");
    modalAlert(message, "error");
  } finally {
    loading.value = false;
  }
});

onUnmounted(() => {
  unSubscribeAuth();
  unSubscribeUser();
});
</script>

<template>
  <section class="profile">
    <div class="content">
      <img src="images/user.jpg" alt="Usuario" />
      <div class="info">
        <h1 class="text-1xl md:text-2xl">
          Bienvenido {{ user.name || "..." }}
        </h1>
        <p>
          Su correo es <b>{{ user.email || "..." }}</b>
        </p>
      </div>
      <div class="chat-content">
        <template v-if="!loading">
          <template v-if="user.role != 'admin'">
            <h2 class="text-1xl md:text-2xl">Chats</h2>
            <router-link to="/chat">Conversa con el administrador</router-link>
          </template>
          <template v-else>
            <p class="mb-3">
              Usuarios con los que chatear
            </p>
            <template v-for="userData in users">
              <template v-if="userData.id !== user.id">
                <router-link
                  :to="`/usuario/${userData.id}/chat`"
                  class="text-green-700"
                  >Ir al chat de {{ userData.email }}</router-link
                >
              </template>
            </template>
          </template>
        </template>
        <template v-else>
          <Loader />
        </template>
      </div>
    </div>
  </section>
</template>
