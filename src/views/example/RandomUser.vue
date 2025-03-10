<script setup lang="ts">
import { randomuser } from '@/apis/example';
import { useExampleStore } from '@/stores';
import PKG from '../../../package.json';

const seed = ref('');
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
    <ExampleComponent1 />
    <ExampleComponent2 />
    <pre>{{ PKG.version }}</pre>
    <pre>{{ seed }}</pre>
    <pre>{{ exampleStore }}</pre>
  </div>
</template>
