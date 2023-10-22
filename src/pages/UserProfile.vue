<script>
import { getUserById } from "../services/user";
import Loader from "../components/Loader.vue";

export default {
  name: "UserProfile",
  components: { Loader },
  data() {
    return {
      loading: false,
      user: {
        id: null,
        email: null,
        role: null
      },
    };
  },
  methods: {},
  async mounted() {
    this.loading = true;
    try {
      this.user = await getUserById(this.$route.params.id);
    } catch (err) {}
    this.loading = false;
  },
};
</script>

<template>
  <section>
    <Loader size="md" v-if="loading" />
    <h2 class="text-4xl mb-8">Perfil de {{user.email}}</h2>
  </section>
</template>

<style lang="scss" scoped></style>
