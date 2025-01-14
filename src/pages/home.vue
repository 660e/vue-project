<script setup lang="ts">
import { randomuser } from '@/apis/randomuser';

onMounted(() => {
  randomuser();
});
</script>

<template>
  <div class="h-screen flex justify-center items-center">
    <img class="h-20" src="@/assets/logo.svg" />
  </div>
</template>
