<script setup lang="ts">
import L from 'leaflet';

const map = ref<L.Map>();

onMounted(() => {
  map.value = L.map('map', {
    attributionControl: false,
    center: [39.90870752436677, 116.39748036861421],
    zoom: 13,
  });
  L.tileLayer('https://webrd04.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}', {
    maxZoom: 18,
    minZoom: 6,
  }).addTo(map.value);
});
</script>

<template>
  <div class="h-screen">
    <div class="h-full" id="map"></div>
  </div>
</template>
