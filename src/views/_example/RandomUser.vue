<script setup lang="ts">
import { randomuser } from '@/apis/_example';
import { useExampleStore } from '@/stores';

const seed = ref();
const exampleStore = useExampleStore();

onMounted(async () => {
  const { results, info } = await randomuser();
  seed.value = info.seed;

  console.log(results);
  console.log(info);
});
</script>

<template>
  <div>
    <Example />
    <pre>{{ seed }}</pre>
    <pre>{{ exampleStore }}</pre>
  </div>
</template>
