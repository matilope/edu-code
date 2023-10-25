<script>
import { subscribeToAuth } from "../services/auth.js";
import { getUserById } from "../services/user.js";
import { subscribeToPrivateChat } from "../services/chat.js";

export default {
  name: "Profile",
  components: {},
  data() {
    return {
      loading: true,
      user: {
        id: null,
        email: null,
      },
      unsubscribeAuth: () => {},
      unsubscribeChat: () => {},
      messages: [],
    };
  },
  methods: {},
  async mounted() {
    this.loading = true;
    try {
      this.unsubscribeAuth = subscribeToAuth(
        (authUser) => (this.user = authUser)
      );
      this.unsubscribeChat = await subscribeToPrivateChat(
        {
          senderId: this.user.id,
          receiverId: "RzfSLE6IlIRpb8kuDETD34I0rE82",
        },
        (newMessages) => (this.messages = newMessages)
      );
    } catch (err) {
      this.$router.push("/");
    } finally {
      this.loading = false;
    }
  },
  unmounted() {
    this.unsubscribeAuth();
    this.unsubscribeChat();
  },
};
</script>

<template>
  <section class="profile">
    <div class="content">
      <img src="images/user.jpg" alt="Usuario" />
      <div class="info">
        <h1 class="text-1xl md:text-2xl">Perfil de <b>{{ user.email }}</b></h1>
        <p>Este perfil puede ser visto por usuarios registrados</p>
      </div>
      <div class="chat-content">
        <template v-if="messages.length">
          <h2 class="text-1xl md:text-2xl">Chats</h2>
          <router-link to="/chat">Continuar la conversación con el administrador</router-link>
        </template>
        <template v-else>
          <p>No tienes chats abiertos, podes <router-link to="/chat">contactar al administrador</router-link></p>
        </template>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped></style>
