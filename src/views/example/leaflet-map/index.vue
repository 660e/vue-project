<script setup lang="ts">
import { baseLayers, CRS_4490, getGeoData, getMaskCoords } from '.';
import L from 'leaflet';

import Coordinate from './Coordinate.vue';

const map = ref<L.Map>();
const layerStore = new Map<string, L.Layer>();
const currentLatLng = ref<L.LatLng>();

onMounted(async () => {
  map.value = L.map('map', {
    attributionControl: false,
    crs: CRS_4490,
    maxZoom: 22,
    minZoom: 4,
    zoomControl: false,
  });
  baseLayers.forEach((layer) => layer.addTo(map.value!));

  await getData(650000);

  map.value.on('mousemove', (e) => {
    currentLatLng.value = e.latlng;
  });
});

const getData = async (adcode: number) => {
  const wrapperGeoData = await getGeoData(adcode);
  const wrapperLayer = L.geoJSON(wrapperGeoData.json, {
    style: { color: '#38f8ff', fillOpacity: wrapperGeoData.isLeaf ? 0.2 : 0, weight: 3 },
  });
  const maskCoords = getMaskCoords(wrapperGeoData.json.features);
  const maskLayer = L.polygon(maskCoords, { color: '#000000', weight: 0, fillOpacity: 0.5 });

  clearLayers(['mask', 'wrapper', 'children']);

  maskLayer.on('click', async () => {
    if (!wrapperGeoData.isRoot) {
      await getData(wrapperGeoData.parent.adcode);
    }
  });

  map.value?.addLayer(maskLayer);
  layerStore.set('mask', maskLayer);

  map.value?.addLayer(wrapperLayer);
  layerStore.set('wrapper', wrapperLayer);

  if (!wrapperGeoData.isLeaf) {
    const childrenGeoData = await getGeoData(adcode, true);
    const childrenLayer = L.geoJSON(childrenGeoData.json, {
      style: { color: '#38f8ff', fillOpacity: 0.2, weight: 1 },
      onEachFeature: ({ properties }, layer) => {
        layer.on('click', async () => {
          console.log(`${properties.adcode}: ${properties.name}`);
          await getData(properties.adcode);
        });
        layer.on('mouseover', () => {
          (layer as L.Path).setStyle({ fillColor: '#ffffff', fillOpacity: 0.4 });
        });
        layer.on('mouseout', () => {
          (layer as L.Path).setStyle({ fillColor: '#38f8ff', fillOpacity: 0.2 });
        });
      },
    });

    map.value?.addLayer(childrenLayer);
    layerStore.set('children', childrenLayer);
  }

  map.value?.fitBounds(wrapperLayer.getBounds());
};

const clearLayers = (layers: string[]) => {
  if (!map.value) return;
  layers.forEach((layer) => {
    if (layerStore.has(layer)) {
      map.value?.removeLayer(layerStore.get(layer)!);
      layerStore.delete(layer);
    }
  });
};
</script>

<template>
  <div class="h-screen relative">
    <div class="h-full" id="map"></div>

    <Coordinate :latlng="currentLatLng" />
  </div>
</template>
