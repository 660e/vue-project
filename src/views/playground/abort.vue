<script setup lang="ts">
import axios from 'axios';

let abortController: AbortController;

const request = () => {
  abortController = new AbortController();
  axios.get('https://run.mocky.io/v3/7db6cdcd-0c60-4a1c-a8cf-13a945cccf7a', {
    signal: abortController.signal,
  });
};

const abort = () => {
  abortController.abort();
};
</script>

<template>
  <div class="p-4 text-sm leading-none flex gap-2 text-neutral-700">
    <button @click="request" class="px-4 py-2 rounded duration-300 border border-blue-400 bg-blue-200 hover:bg-blue-300">Request</button>
    <button @click="abort" class="px-4 py-2 rounded duration-300 border border-red-400 bg-red-200 hover:bg-red-300">Abort</button>
  </div>
</template>
