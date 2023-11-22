<script setup>
import Loader from "../components/Loader.vue";

const props = defineProps({
  loading: {
    type: Boolean,
    default: false
  },
});
</script>

<template>
  <button
    class="flex items-center justify-center gap-2 px-6 py-2.5 bg-green-600 text-white rounded-md hover:bg-green-500"
    :disabled="loading"
  >
    <slot>Enviar</slot>
    <template v-if="loading">
      <Loader size="sm" />
    </template>
  </button>
</template>
