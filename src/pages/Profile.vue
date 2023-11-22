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
      unSubscribeAuth: () => {},
      unSubscribeUser: () => {},
      users: [],
    };
  },
  methods: {},
  async mounted() {
    this.loading = true;
    try {
      this.unSubscribeAuth = subscribeToAuth(
        (authUser) => (this.user = authUser)
      );
      this.unSubscribeUser = subscribeToUser((users) => (this.users = users));
    } catch ({ message }) {
      this.$router.push("/");
      modalAlert(message, "error");
    } finally {
      this.loading = false;
    }
  },
  unmounted() {
    this.unSubscribeAuth();
    this.unSubscribeUser();
  },
};
</script>

<script setup>
import { subscribeToAuth } from "../services/auth.js";
import { subscribeToUser } from "../services/user.js";
import Loader from "../components/Loader.vue";
import { modalAlert } from "../helpers/modal";
import { useRouter } from "vue-router";
import { ref, onMounted, onUnmounted } from "vue";

const router = useRouter();
const loading = ref(true);
const user = ref({
  id: null,
  name: null,
  email: null,
  role: null,
});
const users = ref([]);

let unSubscribeAuth;
let unSubscribeUser;

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
