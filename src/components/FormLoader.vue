<template>
  <div role="status">
    <div class="animate-pulse flex gap-4 flex-col">
      <div class="h-16 w-16 rounded-full bg-gray-500"></div>
      <div
        v-for="item in [1, 2, 3, 4]"
        :key="item"
        class="flex gap-3 flex-col mt-4"
      >
        <div class="h-8 w-[120px] bg-gray-500 rounded-md"></div>
        <div class="h-16 w-full bg-gray-300 rounded-md"></div>
      </div>
      <div class="h-12 w-full bg-green-500 rounded-md"></div>
    </div>
  </div>
</template>
