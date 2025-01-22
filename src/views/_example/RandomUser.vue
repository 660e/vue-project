<script setup lang="ts">
import { randomuser } from '@/apis/_example';

const data = ref();
onMounted(async () => {
  data.value = await randomuser();
  const { results, info } = data.value;
  console.log(results);
  console.log(info);
});
</script>

<template>
  <pre>{{ data }}</pre>
</template>
