<script setup>
defineProps({
  src: {
    type: String,
  },
  alt: {
    type: String,
  },
  name: {
    type: String,
  },
});
</script>

<template>
  <img :src="src || 'images/user.png'" :alt="alt || 'Perfil de ' + name" />
</template>
