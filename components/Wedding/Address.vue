<template>
    <div id="location" class="min-h-screen flex flex-col items-center justify-center p-10 relative">
    <div class="z-10 w-full max-w-4xl">
      <!-- Card Container -->
      <div class="bg-white shadow-lg rounded-lg p-8">
        <div class="text-center mb-8">
          <h2 class="text-3xl font-bold mb-4">Lokasi Acara</h2>
          <p class="text-xl">Gedung Gelanggang Remaja Pulogadung</p>
          <p class="text-lg">Jl. Raya Pemuda No.17, Rawamangun, Kec. Pulogadung, Jakarta Timur, DKI Jakarta 13220</p>
        </div>

        <!-- Leaflet Map Component -->
        <Map />

        <!-- Tombol Lihat Rute -->
        <div class="flex justify-center mt-6">
          <a 
            href="https://www.google.com/maps/dir/?api=1&destination=Gedung+Gelanggang+Remaja+Pulogadung,+Jl.+Raya+Pemuda+No.17,+Jakarta+Timur" 
            target="_blank" 
            class="inline-block bg-blue-500 text-white font-bold py-2 px-6 rounded-lg shadow-md hover:bg-blue-600 transition">
            Lihat Lokasi
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Map from '../Features/Map.vue'; // Import the Map component
export default {
  components: {
    Map,
  },
  }
</script>