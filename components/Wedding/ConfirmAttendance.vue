<template>
  <div class="min-h-screen flex flex-col items-center py-10 px-4">
    <!-- Heading -->
    <Motion is="p" preset="slideVisibleTop">
      <h1 class="text-3xl font-semibold text-gray-800 mb-8 font-great-vibes">Konfirmasi Kehadiran</h1>
    </Motion>
    <Motion is="p" preset="slideVisibleTop">
      <p class="text mb-8">Konfirmasi kehadiran Anda untuk acara ini.</p>
    </Motion>

    <!-- Form for Attendance Confirmation -->
    <form @submit.prevent="submitAttendance" class="w-full p-6 shadow rounded-lg space-y-4 mb-10 max-w-4xl">
      <!-- Nama -->
      <input
        v-model="name"
        type="text"
        class="w-full p-2 border border-gray-300 rounded bg-gray-100"
        readonly
      />

      <!-- Jumlah Tamu -->
      <input
        v-model.number="number_of_guest"
        type="number"
        placeholder="Jumlah Tamu yang Hadir"
        class="w-full p-2 border border-gray-300 rounded"
        min="1"
        required
      />

      <!-- Konfirmasi Kehadiran -->
      <select
        v-model.number="confirmation_of_attendance"
        class="w-full p-2 border border-gray-300 rounded"
        required
      >
        <option value="" disabled selected>Pilih Status Kehadiran</option>
        <option value="1">Hadir</option>
        <option value="0">Tidak Hadir</option>
      </select>

      <!-- Submit Button -->
      <button
        type="submit"
        class="w-full py-2 bg-brown-800 text-white rounded hover:bg-brown-700"
      >
        Konfirmasi Kehadiran
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router'; // Import useRoute for accessing route parameters

// Props untuk menerima nama dari komponen induk
defineProps({
  recipientName: {
    type: String,
    required: true,
  },
});

const name = ref('');
const number_of_guest = ref(1);
const confirmation_of_attendance = ref(null);

// Use the useRoute hook to get access to route params
const route = useRoute();

// Set the name field when the component is mounted
onMounted(() => {
  // Get the name from the route query or use the recipientName prop if available
  name.value = route.query.name || 'Guest'; // Fallback to 'Guest' if name is not in query
});

// Function untuk mengirim data kehadiran
const submitAttendance = async () => {
  try {
    const response = await fetch('/api/attendances/post-attendance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name.value,
        number_of_guest: number_of_guest.value,
        confirmation_of_attendance: confirmation_of_attendance.value,
      }),
    });

    const result = await response.json();

    if (response.ok) {
      alert('Konfirmasi Kehadiran berhasil dikirim!');
      // Reset form (kecuali nama)
      number_of_guest.value = 1;
      confirmation_of_attendance.value = null;
    } else {
      throw new Error(result.statusMessage || 'Terjadi kesalahan');
    }
  } catch (error) {
    alert(`Gagal mengirim konfirmasi: ${error.message}`);
  }
};
</script>

<style scoped>
button {
  cursor: pointer;
}
button:hover {
  transform: scale(1.05);
}

/* Tailwind class for brown color */
.bg-brown-800 {
  background-color: #6B4F3A; /* Cokelat Tua */
}

.bg-brown-700 {
  background-color: #8B6A46; /* Cokelat Lebih Terang */
}

/* Terapkan font Great Vibes pada kelas font-great-vibes */
.font-great-vibes {
  font-family: 'Great Vibes', cursive;
}
</style>
