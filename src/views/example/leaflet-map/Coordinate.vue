<script setup lang="ts">
import { Radar } from '@lucide/vue';
import L from 'leaflet';

defineProps<{ latlng?: L.LatLng }>();

const editable = ref(false);
</script>

<template>
  <div class="absolute z-1000 top-4 right-4 flex items-center gap-4">
    <div class="h-7 px-4 flex items-center rounded text-xs leading-none font-mono bg-black/50 text-white">
      <div v-if="editable">editable</div>
      <div v-else>Lat: {{ latlng?.lat.toFixed(6) || '-' }}, Lng: {{ latlng?.lng.toFixed(6) || '-' }}</div>
    </div>

    <Radar :size="32" @click="editable = !editable" class="cursor-pointer text-red-500" />
  </div>
</template>
