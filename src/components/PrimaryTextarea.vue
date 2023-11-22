<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    required: true
  },
});

defineEmits(["update:modelValue"]);
</script>

<template>
  <textarea
    class="block w-full rounded-md border-0 py-3 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 hover:ring-green-600 focus:ring-2 focus:ring-inset focus:ring-green-600 outline-none sm:text-sm sm:leading-6"
    @input="$emit('update:modelValue', $event.target.value)"
    :value="modelValue"></textarea>
</template>
