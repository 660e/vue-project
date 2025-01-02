<script setup lang="ts">
import axios from 'axios';

const progress = ref(0);
const inputRef = ref();

const fileChange = (event: Event) => {
  progress.value = 0;
  const file = (event.target as HTMLInputElement).files?.[0];

  if (file) {
    const fd = new FormData();
    fd.append('file', file);

    axios
      .post('https://run.mocky.io/v3/7fa0cba4-08ab-4c56-9b9d-eb354443d6e0', fd, {
        onUploadProgress: (progressEvent) => {
          progress.value = progressEvent.progress ?? 0;
        },
      })
      .finally(() => {
        progress.value = 1;
      });
  }
};
</script>

<template>
  <div class="p-4 text-sm leading-none flex items-center gap-2 text-neutral-700">
    <input @change="fileChange" class="hidden" type="file" ref="inputRef" />
    <button @click="inputRef.click()" class="px-4 py-2 rounded duration-300 border border-blue-400 bg-blue-200 hover:bg-blue-300">Upload</button>
    <span>{{ progress * 100 }}%</span>
  </div>
</template>
