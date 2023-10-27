<script>
import { getUserById } from "../services/user";
import Loader from "../components/Loader.vue";
import { modalAlert } from "../helpers/modal";

export default {
  name: "UserProfile",
  components: { Loader },
  data() {
    return {
      loading: false,
      user: {
        id: null,
        name: null
      },
    };
  },
  methods: {},
  async mounted() {
    this.loading = true;
    try {
      this.user = await getUserById(this.$route.params.id);
    } catch ({message}) {
      this.$router.push("/");
      modalAlert(message, "error");
    } finally {
      this.loading = false;
    }
  },
};
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
          <router-link :to="`/usuario/${user.id}/chat`" class="text-green-700 underline mt-3">Iniciar conversación con {{ user.email }}</router-link>
        </template>
        <template v-else>
          <Loader />
        </template>
      </div>
    </div>
  </section>
</template>