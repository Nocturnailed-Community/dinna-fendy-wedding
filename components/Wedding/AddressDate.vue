<template>
    <div id="wedding" class="min-h-screen flex items-center justify-center p-10">
      <div class="p-8 rounded-lg text-center border border-gray-200 max-w-4xl w-full">
        <Motion is="p" preset="slideVisibleTop">
          <h1 class="text-3xl font-bold text-gray-800 mb-6 font-great-vibes">Undangan Pernikahan</h1>
        </Motion>

          <!-- Akad Section -->
        <Motion is="p" preset="slideVisibleLeft">
          <div class="mb-6">
            <h2 class="text-2xl font-bold text-gray-800 font-dancing-script">Akad Nikah</h2>
            <p class="text-xl font-bold">Minggu, 22 Desember 2024</p>
            <p class="text-lg font-bold text-gray-700">08.00 - 10.00 WIB</p>
          </div>
        </Motion>
        <hr class="border-t border-gray-300 my-6" />
  
        <!-- Resepsi Section -->
        <Motion is="p" preset="slideVisibleRight">
          <div class="mb-6">
            <h2 class="text-2xl font-bold text-gray-800 font-dancing-script">Resepsi Pernikahan</h2>
            <p class="text-xl font-bold">Minggu, 22 Desember 2024</p>
            <p class="text-lg font-bold text-gray-700">11.00 - 17.00 WIB</p>
          </div>
        </Motion>

        <!-- Combined Google Calendar Button -->
        <Motion is="p" preset="slideVisibleTop">
          <a
            :href="generateCombinedGoogleCalendarLink()"
            target="_blank"
            class="inline-block text-white font-bold py-2 px-6 rounded-lg shadow-md transition"
            style="background-color: #6B4F2E; hover:bg-color: #5A3E25;">
            Simpan Tanggal
          </a>
        </Motion>

        <hr class="border-t border-gray-300 my-6" />
  
        <!-- Location Section with Map -->
        <Motion is="p" preset="slideVisibleTop">
          <div class="mb-8">
            <h2 class="text-2xl font-bold text-gray-800 font-dancing-script">Lokasi Acara</h2>
            <p class="text-xl text-gray-600">Gedung Gelanggang Remaja Pulogadung</p>
            <p class="text-lg">Jl. Raya Pemuda No.17, Rawamangun, Kec. Pulogadung, Jakarta Timur, DKI Jakarta 13220</p>
          </div>
        </Motion>
  
        <!-- Leaflet Map Component -->
        <Motion is="p" preset="slideVisibleTop">
          <Map />
        </Motion>

  
        <!-- Button to View Location on Google Maps -->
        <Motion is="p" preset="slideVisibleTop">
          <div class="flex justify-center mt-6">
            <a 
              href="https://www.google.com/maps/dir/?api=1&destination=Gedung+Gelanggang+Remaja+Pulogadung,+Jl.+Raya+Pemuda+No.17,+Jakarta+Timur" 
              target="_blank" 
              class="inline-block text-white font-bold py-2 px-6 rounded-lg shadow-md transition"
              style="background-color: #6B4F2E; hover:bg-color: #5A3E25;">
              Lihat Lokasi
            </a>
          </div>
        </Motion>
      </div>
    </div>
</template>
  
<script setup>
  // Function to generate a single Google Calendar link for both events
  const generateCombinedGoogleCalendarLink = () => {
    const baseUrl = 'https://www.google.com/calendar/render?action=TEMPLATE';
    const akadDetails = {
      title: 'Akad Nikah Dinna & Fendy',
      start: '2024-12-22T08:00:00',
      end: '2024-12-22T10:00:00',
      location: 'Lokasi Akad Nikah',
    };
    const resepsiDetails = {
      title: 'Resepsi Pernikahan Dinna & Fendy',
      start: '2024-12-22T11:00:00',
      end: '2024-12-22T17:00:00',
      location: 'Lokasi Resepsi Pernikahan',
    };
  
    // Merge both events into details and description for one calendar link
    const title = 'Akad Nikah & Resepsi Pernikahan Dinna & Fendy';
    const dates = `${akadDetails.start.replace(/-|:/g, '')}/${resepsiDetails.end.replace(/-|:/g, '')}`;
    const location = `${akadDetails.location} & ${resepsiDetails.location}`;
    const details = 'Acara Pernikahan: \nAkad Nikah: 08.00 - 10.00 WIB\nResepsi: 11.00 - 17.00 WIB\nLokasi: ' + location;
  
    return `${baseUrl}&text=${encodeURIComponent(title)}&dates=${dates}&location=${encodeURIComponent(location)}&details=${encodeURIComponent(details)}`;
  };
</script>
  
<script>
  import Map from '../Features/Map.vue'; // Import the Map component
  export default {
    components: {
      Map,
    },
  }
</script>
  
<style scoped>
  /* General Styling */
  #location, #wedding {
    padding: 3rem;
  }
  
  .bg-white {
    background-color: white;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
  }
  
  /* Wedding Details Section */
  h2 {
    font-size: 1.75rem;
    font-weight: bold;
    color: #333;
  }
  
  p {
    font-size: 1.125rem;
  }
  
  /* Google Calendar Button */
  a:hover {
    background-color: #3182ce;
  }

  /* Terapkan font Great Vibes pada kelas font-great-vibes */
  .font-great-vibes {
    font-family: 'Great Vibes', cursive;
  }

  /* Terapkan font Dancing Script pada kelas font-dancing-script */
  .font-dancing-script {
    font-family: 'Dancing Script', cursive;
  }
</style>
  