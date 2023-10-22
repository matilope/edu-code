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
      alert("Ha ocurrido un error");
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
    <h1>Perfil de {{ user.email }}</h1>
    <p>Este perfil tiene un rol de {{ user.role }}</p>
    <template v-if="messages.length">
      <h2>Chats</h2>
      <router-link to="/chat">Ver chat</router-link>
    </template>
    <template v-else>
      <p>No tienes chats, <router-link to="/chat">contactar al administrador</router-link></p>
    </template>
  </section>
</template>

<style lang="scss" scoped></style>
