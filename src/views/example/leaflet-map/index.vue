<script setup lang="ts">
import { baseLayers, CRS_4490 } from '.';
import L from 'leaflet';

type LngLat = [number, number];
type LatLng = L.LatLngTuple;

interface PolygonGeometry {
  type: 'Polygon';
  coordinates: LngLat[][];
}

interface MultiPolygonGeometry {
  type: 'MultiPolygon';
  coordinates: LngLat[][][];
}

type MaskFeature = {
  geometry: PolygonGeometry | MultiPolygonGeometry;
};

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
  baseLayers.forEach((layer) => layer.addTo(map.value!));

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

      const worldRing: LatLng[] = [
        [90, -180],
        [90, 180],
        [-90, 180],
        [-90, -180],
      ];
      const maskRings: LatLng[][] = [worldRing, ...getMaskCoordinates(data.features[0])];

      const maskLayer = L.polygon(maskRings, {
        color: 'yellow',
        weight: 0,
        fillOpacity: 0.2,
      }).addTo(map.value!);

      maskLayer.on('click', () => {
        console.log('点击了省外区域');
      });
    });
  fetch('https://geo.datav.aliyun.com/areas_v3/bound/650000_full.json')
    .then((response) => response.json())
    .then((data) => {
      L.geoJSON(data, {
        style: {
          color: '#38f8ff',
          weight: 1,
        },
        onEachFeature: ({ properties }, layer) => {
          layer.on('click', () => {
            const { adcode, name } = properties;

            console.log(`${adcode}-${name} `);
          });

          layer.on('mouseover', function () {
            (layer as L.Path).setStyle({
              color: 'red',
              weight: 2, // 加粗
              fillOpacity: 0.2, // 半透明填充
            });
          });

          // 鼠标移出
          layer.on('mouseout', function () {
            (layer as L.Path).setStyle({
              color: '#38f8ff',
              weight: 1,
              fillOpacity: 0,
            });
          });
        },
      }).addTo(map.value!);
    });
});

function getMaskCoordinates(feature: MaskFeature): LatLng[][] {
  const coordsArray: LatLng[][] = [];

  if (feature.geometry.type === 'Polygon') {
    // Polygon: 第一个环是外层，其余是洞
    const polygonCoords = feature.geometry.coordinates.map((ring) => ring.map(([lng, lat]: LngLat): LatLng => [lat, lng]));
    coordsArray.push(...polygonCoords);
  }

  if (feature.geometry.type === 'MultiPolygon') {
    // MultiPolygon: 每个 polygon 的第一个环是外层，其余是洞
    feature.geometry.coordinates.forEach((polygon) => {
      const polygonCoords = polygon.map((ring) => ring.map(([lng, lat]: LngLat): LatLng => [lat, lng]));
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
