<script setup lang="ts">
import { CRS_4490 } from '.';
import L from 'leaflet';

const map = ref<L.Map>();

onMounted(async () => {
  map.value = L.map('map', {
    attributionControl: false,
    // center: [41.75514499999999, 84.94633349999998],
    crs: CRS_4490,
    maxZoom: 22,
    minZoom: 4,
    // zoom: 6,
  });
  // baseLayers.forEach((layer) => layer.addTo(map.value!));

  fetch('https://geo.datav.aliyun.com/areas_v3/bound/650000.json')
    .then((response) => response.json())
    .then((data) => {
      const provinceLayer = L.geoJSON(data, {
        style: {
          // color: '#38f8ff',
          weight: 3,
          fillOpacity: 0,
        },
      }).addTo(map.value!);

      map.value!.fitBounds(provinceLayer.getBounds());
    });
  fetch('https://geo.datav.aliyun.com/areas_v3/bound/650000_full.json')
    .then((response) => response.json())
    .then((data) => {
      L.geoJSON(data, {
        style: {
          // color: '#38f8ff',
          weight: 1,
        },
        onEachFeature: ({ properties }, layer) => {
          layer.on('click', () => {
            const { adcode, name } = properties;

            console.log(`${adcode}-${name} `);
          });
        },
      }).addTo(map.value!);
    });
});
</script>

<template>
  <div class="h-screen">
    <div class="h-full" id="map"></div>
  </div>
</template>
