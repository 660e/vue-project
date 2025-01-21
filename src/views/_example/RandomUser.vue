<script setup lang="ts">
import { randomuser } from '@/apis/_example';

const data = ref();
onMounted(async () => {
  data.value = await randomuser();
});
</script>

<template>
  <pre>{{ data }}</pre>
</template>
