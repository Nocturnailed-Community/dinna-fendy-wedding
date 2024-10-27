<template>
  <div ref="mapContainer" class="h-96"></div> <!-- Ensure this matches the ref -->
</template>

<script>
import { onMounted, ref } from 'vue';
import L from 'leaflet';
import profileImage from '@/assets/images/profile/profile.jpeg'; // Import your custom image

export default {
  setup() {
    const mapContainer = ref(null); // Reference for the map container

    onMounted(() => {
      // Check if the mapContainer is defined before using it
      if (mapContainer.value) {
        const map = L.map(mapContainer.value).setView([-6.1968929, 106.8774217], 15); // Set your coordinates

        // Add tile layer (you can use any tile layer provider)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
        }).addTo(map);

        // Create a custom icon using the imported image
        const customIcon = L.icon({
          iconUrl: profileImage,
          iconSize: [50, 50], // Adjust size as needed
          iconAnchor: [25, 50], // Anchor the icon
        });

        // Add the custom marker to the map
        L.marker([-6.1968929, 106.8774217], { icon: customIcon }).addTo(map);
      } else {
        console.error("Map container not found.");
      }
    });

    return {
      mapContainer, // Expose the map container reference
    };
  },
};
</script>

<style scoped>
/* Add styles for the map container if needed */
</style>
