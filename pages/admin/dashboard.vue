<template>
  <div class="flex flex-col min-h-screen p-4">
    <!-- Navbar Component -->
    <Navbar />

    <!-- Dashboard Cards for Count Data -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">

      <!-- Total Guests Card -->
      <div class="bg-white shadow-lg rounded-lg p-4">
        <h3 class="text-xl font-semibold text-gray-700">Total Tamu</h3>
        <p class="text-3xl font-bold text-purple-500">{{ countData?.totalGuests || 0 }}</p>
      </div>

      <!-- Total Attended Card -->
      <div class="bg-white shadow-lg rounded-lg p-4">
        <h3 class="text-xl font-semibold text-gray-700">Total Konfirmasi Hadir</h3>
        <p class="text-3xl font-bold text-green-500">{{ countData?.totalConfirmedAttended || 0 }}</p>
      </div>

      <!-- Total Confirmed Absent Card -->
      <div class="bg-white shadow-lg rounded-lg p-4">
        <h3 class="text-xl font-semibold text-gray-700">Total Konfirmasi Tidak Hadir</h3>
        <p class="text-3xl font-bold text-orange-500">{{ countData?.totalConfirmedAbsent || 0 }}</p>
      </div>

      </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mt-4">
      <!-- Total Wishes Card -->
      <div class="bg-white shadow-lg rounded-lg p-4">
        <h3 class="text-xl font-semibold text-gray-700">Total Ucapan</h3>
        <p class="text-3xl font-bold text-blue-500">{{ countData?.totalWishes || 0 }}</p>
      </div>

      <!-- Total Invitations Card -->
      <div class="bg-white shadow-lg rounded-lg p-4">
        <h3 class="text-xl font-semibold text-gray-700">Total Undangan</h3>
        <p class="text-3xl font-bold text-green-500">{{ countData?.totalInvitations || 0 }}</p>
      </div>

      <!-- Total Invitations Sent Card -->
      <div class="bg-white shadow-lg rounded-lg p-4">
        <h3 class="text-xl font-semibold text-gray-700">Total Undangan Terkirim</h3>
        <p class="text-3xl font-bold text-yellow-500">{{ countData?.totalInvitationsSent || 0 }}</p>
      </div>

      <!-- Total Invitations Pending Card -->
      <div class="bg-white shadow-lg rounded-lg p-4">
        <h3 class="text-xl font-semibold text-gray-700">Total Undangan Tertunda</h3>
        <p class="text-3xl font-bold text-yellow-500">{{ countData?.totalInvitationsPending || 0 }}</p>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup>
// Import the Navbar component
import Navbar from '~/components/Admin/Navbar/Navbar.vue';
import Footer from '~/components/Admin/Footer/Footer.vue';

// Fetch data from the count-data API
const { data: countData, error } = await useFetch('/api/dashboard/count-data');

// Handle loading state or errors if needed
if (error.value) {
  console.error("Gagal mengambil data:", error.value);
}
</script>

<style scoped>
/* You can add custom styles if necessary */
</style>