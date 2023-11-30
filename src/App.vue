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
  if (notification.value.type == "success") {
    setTimeout(() => {
      notification.value.message = null;
    }, 3000);
  }
}

provide(notificationSymbol, {
  notification: readonly(notification),
  setNotification,
});
</script>

<template>
  <Nav />

  <Notification :notification="notification" />

  <main class="container mx-auto my-8 p-4">
    <router-view></router-view>
  </main>

  <Footer />
</template>
