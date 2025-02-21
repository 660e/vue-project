<script setup lang="ts">
const env = {
  MODE: import.meta.env.MODE,
  BASE_URL: import.meta.env.BASE_URL,
  PROD: import.meta.env.PROD,
  DEV: import.meta.env.DEV,
  SSR: import.meta.env.SSR,
};
</script>

<template>
  <div>
    <table>
      <tbody>
        <tr v-for="(value, key) in env" :key="key">
          <th>{{ key }}</th>
          <td>{{ value }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
