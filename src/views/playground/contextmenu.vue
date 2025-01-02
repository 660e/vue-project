<script setup lang="ts">
const onContextMenu = (event: MouseEvent) => {
  if ((event.target as HTMLDivElement).id === 'canvas') {
    event.preventDefault();
    console.log(event);

    const pointerX = event.clientX;
    const pointerY = event.clientY;

    console.log(pointerX);
    console.log(pointerY);
  }
};

window.addEventListener('contextmenu', onContextMenu);

onUnmounted(() => {
  window.removeEventListener('contextmenu', onContextMenu);
});
</script>

<template>
  <div class="h-screen flex justify-center items-center">
    <div class="h-1/2 w-1/2 bg-neutral-200" id="canvas"></div>
  </div>
</template>
