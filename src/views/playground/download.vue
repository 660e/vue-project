<script setup lang="ts">
import axios from 'axios';

const progress = ref(0);

const download = () => {
  progress.value = 0;

  axios
    .get('https://run.mocky.io/v3/05764dba-7eea-462c-9705-0fc007a1808a', {
      responseType: 'blob',
      onDownloadProgress: (progressEvent) => {
        console.log(progressEvent);
        progress.value = progressEvent.progress ?? 0;
      },
    })
    .finally(() => {
      progress.value = 1;
    });
};
</script>

<template>
  <div class="p-4 text-sm leading-none flex items-center gap-2 text-neutral-700">
    <button @click="download" class="px-4 py-2 rounded duration-300 border border-blue-400 bg-blue-200 hover:bg-blue-300">Download</button>
    <span>{{ progress * 100 }}%</span>
  </div>
</template>
