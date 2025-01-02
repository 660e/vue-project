<script setup lang="ts">
const contextMenu = ref();

const showContextMenu = (event: MouseEvent) => {
  if ((event.target as HTMLDivElement).id === 'canvas') {
    event.preventDefault();
    contextMenu.value = { x: event.clientX, y: event.clientY };
  } else {
    hideContextMenu();
  }
};

const hideContextMenu = () => {
  contextMenu.value = undefined;
};

window.addEventListener('contextmenu', showContextMenu);
window.addEventListener('click', hideContextMenu);

onUnmounted(() => {
  window.removeEventListener('contextmenu', showContextMenu);
  window.removeEventListener('click', hideContextMenu);
});
</script>

<template>
  <div class="h-screen flex justify-center items-center">
    <div class="h-1/2 w-1/2 bg-neutral-200" id="canvas"></div>
    <div v-if="contextMenu" :style="{ top: `${contextMenu.y}px`, left: `${contextMenu.x}px` }" class="absolute p-2 rounded-lg shadow bg-white">
      <div v-for="n in 3" class="cursor-pointer text-sm leading-none p-2 rounded duration-300 hover:bg-blue-200" :key="n">Menu Item</div>
    </div>
  </div>
</template>
