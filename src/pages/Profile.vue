<script>
import { subscribeToAuth } from "../services/auth.js";
import { subscribeToUser } from "../services/user.js";
import Loader from "../components/Loader.vue";
import { modalAlert } from "../helpers/modal";

export default {
  name: "Profile",
  components: { Loader },
  data() {
    return {
      loading: true,
      user: {
        id: null,
        name: null,
        email: null,
        role: null,
      },
      unsubscribeAuth: () => {},
      unsubscribeUser: () => {},
      users: [],
    };
  },
  methods: {},
  async mounted() {
    this.loading = true;
    try {
      this.unsubscribeAuth = subscribeToAuth(
        (authUser) => (this.user = authUser)
      );
      this.unsubscribeUser = subscribeToUser((users) => (this.users = users));
    } catch ({ message }) {
      this.$router.push("/");
      modalAlert(message, "error");
    } finally {
      this.loading = false;
    }
  },
  unmounted() {
    this.unsubscribeAuth();
    this.unsubscribeUser();
  },
};
</script>

<template>
  <section class="profile">
    <div class="content">
      <img src="images/user.jpg" alt="Usuario" />
      <div class="info">
        <h1 class="text-1xl md:text-2xl">
          Bienvenido a su perfil {{ user.name || "..." }}
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
              Usted tiene chats abiertos con los siguientes usuarios:
            </p>
            <template v-for="userData in users">
              <template v-if="userData.id !== user.id">
                <router-link :to="`/usuario/${userData.id}/chat`" class="text-green-700"
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
