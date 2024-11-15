<template>
  <div id="wedding-date" class="min-h-screen flex items-center justify-center p-10 bg-gray-50">
    <div class="bg-white p-8 rounded-lg shadow-lg text-center border border-gray-200 max-w-lg w-full">
      <h1 class="text-3xl font-bold text-gray-800 mb-6">Undangan Pernikahan</h1>
      
      <!-- Akad Section -->
      <div class="mb-8">
        <h2 class="text-2xl font-bold text-gray-800">Akad Nikah</h2>
        <p class="text-xl text-gray-600">Minggu, 22 Desember 2024</p>
        <p class="text-lg font-bold text-gray-700">08.00 - 10.00 WIB</p>
      </div>

      <hr class="border-t border-gray-300 my-6" />

      <!-- Resepsi Section -->
      <div class="mb-8">
        <h2 class="text-2xl font-bold text-gray-800">Resepsi Pernikahan</h2>
        <p class="text-xl text-gray-600">Minggu, 22 Desember 2024</p>
        <p class="text-lg font-bold text-gray-700">11.00 - 17.00 WIB</p>
      </div>

      <!-- Combined Google Calendar Button -->
      <a
        :href="generateCombinedGoogleCalendarLink()"
        target="_blank"
        class="inline-block mt-4 px-6 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Tambah ke Google Calendar
      </a>
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

<style scoped>
/* Tambahkan styling khusus jika diperlukan */
</style>
