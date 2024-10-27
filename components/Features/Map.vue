<template>
  <div id="map" class="w-full h-96 rounded-lg shadow-lg"></div>
</template>

<script setup>
import { onMounted } from 'vue';
import L from 'leaflet';

// Define the coordinates for the location
const locationCoordinates = [-6.191348462459264, 106.87974461612943];

onMounted(() => {
  // Initialize the map
  const map = L.map('map').setView(locationCoordinates, 15);

  // Add OpenStreetMap tiles
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  // Add a marker
  const marker = L.marker(locationCoordinates).addTo(map);
  marker.bindPopup("<b>Gedung Gelanggang Remaja Pulogadung</b><br>Jl. Raya Pemuda No.17").openPopup();
});
</script>

<style scoped>
#map {
  height: 400px; /* Ensure the map has height */
  width: 100%;   /* Full width */
}
</style>
