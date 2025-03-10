<script setup lang="ts">
const env = {
  MODE: import.meta.env.MODE,
  BASE_URL: import.meta.env.BASE_URL,
  PROD: import.meta.env.PROD,
  DEV: import.meta.env.DEV,
  SSR: import.meta.env.SSR,

  DEEPSEEK_API_KEY: import.meta.env.VITE_DEEPSEEK_API_KEY,
};
</script>

<template>
  <div class="p-4">
    <table>
      <tbody>
        <tr v-for="(value, key) in env" :key="key">
          <th class="border px-2 py-1 text-right">{{ key }}</th>
          <td class="border px-2 py-1">{{ value }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
