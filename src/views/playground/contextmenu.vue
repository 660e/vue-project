<script setup lang="ts">
const onContextMenu = () => {
  console.log('contextmenu');
};

window.addEventListener('contextmenu', onContextMenu);
</script>

<template>
  <div>contextmenu</div>
</template>
