<script setup lang="ts">
import { randomuser } from '@/apis/_example';

const seed = ref();
onMounted(async () => {
  const { results, info } = await randomuser();
  seed.value = info.seed;

  console.log(results);
  console.log(info);
});
</script>

<template>
  <pre>{{ seed }}</pre>
</template>
