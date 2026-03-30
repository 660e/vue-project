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

      const maskLayer = L.polygon(
        [
          [
            [90, -180],
            [90, 180],
            [-90, 180],
            [-90, -180],
          ],

          getMaskCoordinates(data.features[0]),
        ],
        {
          color: 'yellow',
          weight: 0,
          fillOpacity: 0,
        },
      ).addTo(map.value!);

      maskLayer.on('click', () => {
        console.log('点击了省外区域');
      });
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

function getMaskCoordinates(feature) {
  const coordsArray = [];

  if (feature.geometry.type === 'Polygon') {
    // Polygon: 第一个环是外层，其余是洞
    const polygonCoords = feature.geometry.coordinates.map((ring) => ring.map(([lng, lat]) => [lat, lng]));
    coordsArray.push(...polygonCoords);
  }

  if (feature.geometry.type === 'MultiPolygon') {
    // MultiPolygon: 每个 polygon 的第一个环是外层，其余是洞
    feature.geometry.coordinates.forEach((polygon) => {
      const polygonCoords = polygon.map((ring) => ring.map(([lng, lat]) => [lat, lng]));
      coordsArray.push(...polygonCoords);
    });
  }

  return coordsArray;
}
</script>

<template>
  <div class="h-screen">
    <div class="h-full" id="map"></div>
  </div>
</template>
