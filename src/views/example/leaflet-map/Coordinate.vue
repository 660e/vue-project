<script setup lang="ts">
import L from 'leaflet';

defineProps<{ latlng: L.LatLng }>();
</script>

<template>
  <div class="absolute z-1000 left-4 bottom-4 p-2 rounded text-xs leading-none font-mono bg-black/50 text-white">
    Lat: {{ latlng?.lat.toFixed(6) }}, Lng: {{ latlng?.lng.toFixed(6) }}
  </div>
</template>
