<script setup>
import Nav from "./components/Nav.vue";
import Footer from "./components/Footer.vue";
import { provide, readonly, ref } from "vue";
import { notificationSymbol } from "./symbols/notification.js";
import Notification from "./components/Notification.vue";

const notification = ref({
  message: null,
  type: "success",
});

function setNotification(data) {
  notification.value = data;
}

provide(notificationSymbol, {
  notification: readonly(notification),
  setNotification,
});

setTimeout(() => {
  setNotification({
    message: null,
    type: "success",
  });
}, 2000);
</script>

<template>
  <Nav />

  <Notification :notification="notification" />

  <main class="container mx-auto my-8 p-4">
    <router-view></router-view>
  </main>

  <Footer />
</template>
