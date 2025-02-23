<script setup lang="ts">
import axios from 'axios';

const submit = async () => {
  try {
    const response = await axios.post(
      '/chat/completions',
      {
        messages: [
          {
            content: 'Hi',
            role: 'user',
          },
        ],
        model: 'deepseek-chat',
      },
      {
        baseURL: 'https://api.deepseek.com',
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_DEEPSEEK_API_KEY}`,
          'Content-Type': 'application/json',
        },
      },
    );

    console.log(response);
  } catch (error) {
    console.log(error);
  } finally {
  }
};
</script>

<template>
  <div class="flex p-4">
    <div class="flex-1/2">
      <button @click="submit" class="rounded px-2 py-1 cursor-pointer bg-neutral-200 hover:opacity-80">Submit</button>
    </div>
    <div class="flex-1/2"></div>
  </div>
</template>
