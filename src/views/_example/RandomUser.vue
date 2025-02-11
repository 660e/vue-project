<script setup lang="ts">
import { randomuser } from '@/apis/_example';
import { useExampleStore } from '@/stores';
import { author } from '@/utils';
import PKG from '../../../package.json';

const seed = ref();
const exampleStore = useExampleStore();

onMounted(async () => {
  const { results, info } = await randomuser();
  seed.value = info.seed;

  console.log(results);
  console.log(info);
  console.log(author());
});
</script>

<template>
  <div>
    <Example />
    <pre>{{ PKG.version }}</pre>
    <pre>{{ seed }}</pre>
    <pre>{{ exampleStore }}</pre>
  </div>
</template>
