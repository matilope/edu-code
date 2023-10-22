<script>
export default {
  name: "ChatLoader",
};
</script>

<template>
  <div role="status">
    <div class="animate-pulse">
      <div class="date h-8 w-28"></div>
      <div
        v-for="item in [1, 2, 3, 4, 5, 6, 7, 8]"
        :key="item"
        class="message-container"
      >
        <div
          class="message h-12 sm:w-72 w-full"
          :class="{
            'bg-gray-300': item % 2 === 1,
            'bg-green-300': item % 2 === 0,
            'self-end': item % 2 === 0,
            'self-start': item % 2 === 1,
          }"
        ></div>
      </div>
    </div>
  </div>
</template>
