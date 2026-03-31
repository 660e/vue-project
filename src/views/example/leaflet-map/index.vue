<script setup lang="ts">
import { baseLayers, CRS_4490, getGeoData, getMaskCoordinates } from '.';
import L from 'leaflet';

const map = ref<L.Map>();

onMounted(async () => {
  map.value = L.map('map', {
    attributionControl: false,
    crs: CRS_4490,
    maxZoom: 22,
    minZoom: 4,
    zoomControl: false,
  });
  baseLayers.forEach((layer) => layer.addTo(map.value!));

  await getData('650000');
});

const getData = async (adcode: string) => {
  const wrapperGeoData = await getGeoData(adcode);

  const wrapperLayer = L.geoJSON(wrapperGeoData.json, {
    style: { color: '#38f8ff', fillOpacity: 0, weight: 3 },
  });

  // console.log(wrapperGeoData.json.features[0].properties.name);

  // clearLayers();

  // const childrenLayer = L.geoJSON(data.children_data, {
  //   style: { color: '#38f8ff', fillOpacity: 0.2, weight: 1 },
  //   onEachFeature: ({ properties }, layer) => {
  //     layer.on('click', async () => {
  //       console.log(`${properties.adcode}: ${properties.name}`);

  //       await getData(properties.adcode);
  //     });
  //     layer.on('mouseover', () => {
  //       const item = layer as L.Path;

  //       item.bringToFront();
  //       setTimeout(() => {
  //         item.setStyle({ fillColor: '#ffffff', fillOpacity: 0.4 });
  //       });
  //     });
  //     layer.on('mouseout', () => {
  //       const item = layer as L.Path;

  //       setTimeout(() => {
  //         item.setStyle({ fillColor: '#38f8ff', fillOpacity: 0.2 });
  //       });
  //     });
  //   },
  // });

  const maskCoords = getMaskCoordinates(wrapperGeoData.json.features);

  console.log(maskCoords);

  map.value?.addLayer(wrapperLayer);
  // map.value?.addLayer(childrenLayer);

  map.value?.fitBounds(wrapperLayer.getBounds());
};

// const clearLayers = () => {
//   map.value?.eachLayer((layer) => {
//     if (layer instanceof L.TileLayer) return;

//     map.value?.removeLayer(layer);
//   });
// };

// type LngLat = [number, number];
// type LatLng = L.LatLngTuple;

// interface PolygonGeometry {
//   type: 'Polygon';
//   coordinates: LngLat[][];
// }

// interface MultiPolygonGeometry {
//   type: 'MultiPolygon';
//   coordinates: LngLat[][][];
// }

// type MaskFeature = {
//   geometry: PolygonGeometry | MultiPolygonGeometry;
// };

//       const worldRing: LatLng[] = [
//         [90, -180],
//         [90, 180],
//         [-90, 180],
//         [-90, -180],
//       ];
//       const maskRings: LatLng[][] = [worldRing, ...getMaskCoordinates(data.features[0])];

//       const maskLayer = L.polygon(maskRings, {
//         color: 'yellow',
//         weight: 0,
//         fillOpacity: 0.2,
//       }).addTo(map.value!);

//       maskLayer.on('click', () => {
//         console.log('点击了省外区域');
//       });
//     });

// function getMaskCoordinates(feature: MaskFeature): LatLng[][] {
//   const coordsArray: LatLng[][] = [];

//   if (feature.geometry.type === 'Polygon') {
//     // Polygon: 第一个环是外层，其余是洞
//     const polygonCoords = feature.geometry.coordinates.map((ring) => ring.map(([lng, lat]: LngLat): LatLng => [lat, lng]));
//     coordsArray.push(...polygonCoords);
//   }

//   if (feature.geometry.type === 'MultiPolygon') {
//     // MultiPolygon: 每个 polygon 的第一个环是外层，其余是洞
//     feature.geometry.coordinates.forEach((polygon) => {
//       const polygonCoords = polygon.map((ring) => ring.map(([lng, lat]: LngLat): LatLng => [lat, lng]));
//       coordsArray.push(...polygonCoords);
//     });
//   }

//   return coordsArray;
// }
</script>

<template>
  <div class="h-screen">
    <div class="h-full" id="map"></div>
  </div>
</template>
