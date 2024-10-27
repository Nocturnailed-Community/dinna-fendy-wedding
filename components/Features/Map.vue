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

        // Create a circular marker with a custom icon
        const customIcon = L.divIcon({
          className: 'circular-marker', // Custom CSS class
          html: `<img src="${profileImage}" class="marker-image" alt="Location"/>`, // Use the image for the circular marker
          iconSize: [40, 40], // Adjust the size of the icon
          iconAnchor: [20, 40], // Anchor the icon at the bottom
        });

        // Add the circular marker to the map
        const marker = L.marker([-6.1968929, 106.8774217], { icon: customIcon }).addTo(map);

        // Bind a popup with the location name
        marker.bindPopup("<b>Gelanggang Remaja Pulogadung</b>").openPopup();
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
.circular-marker {
  border-radius: 50%; /* Makes the marker circular */
  overflow: hidden; /* Ensures the image fits within the circle */
  width: 40px; /* Set a specific width */
  height: 40px; /* Set a specific height */
}

.marker-image {
  width: 100%; /* Fill the circle */
  height: auto; /* Maintain aspect ratio */
}
</style>
