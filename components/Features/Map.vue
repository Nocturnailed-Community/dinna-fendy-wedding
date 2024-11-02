<template>
  <div v-if="isClient" ref="mapContainer" class="h-96"></div>
</template>

<script>
import { onMounted, ref, nextTick } from 'vue';
import { useNuxtApp } from '#app';
import 'leaflet/dist/leaflet.css'; // Pastikan mengimpor Leaflet CSS
import profileImage from '@/assets/images/profile/profile.jpeg';

export default {
  setup() {
    const mapContainer = ref(null);
    const isClient = ref(false);

    onMounted(async () => {
      // Pastikan ini hanya berjalan di client side
      isClient.value = typeof window !== 'undefined';
      
      if (isClient.value) {
        // Tunggu hingga DOM siap
        await nextTick();

        try {
          // Impor leaflet secara dinamis
          const { default: L } = await import('leaflet');
          
          if (mapContainer.value) {
            // Inisialisasi peta
            const map = L.map(mapContainer.value).setView([-6.1968929, 106.8774217], 15);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              maxZoom: 19,
            }).addTo(map);

            const customIcon = L.divIcon({
              className: 'circular-marker',
              iconSize: [40, 40],
              iconAnchor: [20, 40],
            });

            const marker = L.marker([-6.1968929, 106.8774217], { icon: customIcon }).addTo(map);

            marker.bindPopup(`
              <div style="display: flex; flex-direction: column; align-items: center; text-align: center;">
                <b>Gedung Gelanggang</b>
                <b>Remaja Pulogadung</b>
                <br>
                <img src="${profileImage}" style="width: 150px; height: 100px;" alt="Location Image" />
              </div>
            `).openPopup();
          } else {
            console.error("Map container not found.");
          }
        } catch (error) {
          console.error("Error loading Leaflet:", error);
        }
      }
    });

    return {
      mapContainer,
      isClient,
    };
  },
};
</script>

<style scoped>
.h-96 {
  height: 24rem;
}

.circular-marker {
  border-radius: 50%;
  overflow: hidden;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.marker-image {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  object-fit: cover;
}
</style>
