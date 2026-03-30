<script setup lang="ts">
import { baseLayers, CRS_4490 } from '.';
import L from 'leaflet';

const map = ref<L.Map>();

onMounted(() => {
  map.value = L.map('map', {
    attributionControl: false,
    center: [41.75514499999999, 84.94633349999998],
    crs: CRS_4490,
    maxZoom: 22,
    minZoom: 4,
    zoom: 6,
  });
  baseLayers.forEach((layer) => layer.addTo(map.value!));
});
</script>

<template>
  <div class="h-screen">
    <div class="h-full" id="map"></div>
  </div>
</template>
