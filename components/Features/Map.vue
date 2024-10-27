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
          iconSize: [40, 40], // Adjust the size of the icon
          iconAnchor: [20, 40], // Anchor the icon at the bottom
        });

        // Add the circular marker to the map
        const marker = L.marker([-6.1968929, 106.8774217], { icon: customIcon }).addTo(map);

        // Bind a popup with the location name and image
        marker.bindPopup(`
        <div style="display: flex; flex-direction: column; align-items: center; text-align: center;">
            <b>Gedung Gelanggang</b>
            <br>
            <b>Remaja Pulogadung</b>
            <br>
            <img src="${profileImage}" style="width: 150px; height: 100px;" alt="Location Image" />
          </div>
        `).openPopup();
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
  width: 40px; /* Set a specific width for the marker */
  height: 40px; /* Set a specific height for the marker */
  display: flex; /* Use flexbox for centering */
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
}

.marker-image {
  width: 30px; /* Set the image width to fit inside the marker */
  height: 30px; /* Set the image height to maintain aspect ratio */
  border-radius: 50%; /* Make the image circular */
  object-fit: cover; /* Ensure the image covers the area */
}
</style>
