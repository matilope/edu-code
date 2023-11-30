<script setup>
import { ICONS } from "../constants/constants";

const props = defineProps({
  notification: {
    type: Object,
    required: true,
  },
});

const toggle = () => {
  props.notification.message = null;
};
</script>

<template>
  <div
    class="notification m-2 absolute top-0 right-0"
    role="alert"
    v-if="notification.message != null"
  >
    <div
      class="p-4 border rounded-md flex justify-between gap-3 items-center"
      :class="{
        'border-green-700': notification.type == 'success',
        'text-green-700': notification.type == 'success',
        'bg-green-100': notification.type == 'success',
        'border-yellow-700': notification.type == 'warning',
        'text-yellow-700': notification.type == 'warning',
        'bg-yellow-100': notification.type == 'warning',
        'border-red-700': notification.type == 'error',
        'text-red-700': notification.type == 'error',
        'bg-red-100': notification.type == 'error',
      }"
    >
      <p>{{ notification.message }}</p>
      <div v-html="ICONS[notification.type].html" @click="toggle"></div>
    </div>
  </div>
</template>
