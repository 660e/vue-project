<script setup lang="ts">
import { baseLayers, CRS_4490 } from '.';
import L from 'leaflet';

const map = ref<L.Map>();

onMounted(() => {
  map.value = L.map('map', {
    attributionControl: false,
    center: [36.71630859375, 108.63611429929733],
    crs: CRS_4490,
    maxZoom: 22,
    minZoom: 4,
    zoom: 5,
  });
  baseLayers.forEach((layer) => layer.addTo(map.value!));
});
</script>

<template>
  <div class="h-screen">
    <div class="h-full" id="map"></div>
  </div>
</template>
