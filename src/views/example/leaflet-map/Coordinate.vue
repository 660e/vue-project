<script setup lang="ts">
import { Radar } from '@lucide/vue';
import L from 'leaflet';

defineProps<{ latlng?: L.LatLng }>();
</script>

<template>
  <div class="absolute z-1000 left-4 bottom-4 flex items-center gap-4">
    <Radar :size="32" />

    <div v-if="latlng" class="p-2 rounded text-xs leading-none font-mono bg-black/50 text-white">
      Lat: {{ latlng?.lat.toFixed(6) }}, Lng: {{ latlng?.lng.toFixed(6) }}
    </div>
  </div>
</template>
