<template>
    <div class="flex flex-col min-h-screen p-4">
      <Navbar />
      <!-- Search and Settings -->
      <div class="flex justify-between items-center mb-4 mt-4">
        <select v-model="limit" @change="fetchAttendances" class="border rounded px-3 py-1">
          <option :value="5">5</option>
          <option :value="10">10</option>
          <option :value="20">20</option>
        </select>
        <input
          v-model="search"
          @input="fetchAttendances"
          type="text"
          placeholder="Cari nama..."
          class="border rounded px-3 py-1 w-1/3"
        />    
      </div>

      <!-- Table -->
      <table class="table-auto w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th class="border px-4 py-2">Nama</th>
            <th class="border px-4 py-2">No. WhatsApp</th>
            <th class="border px-4 py-2">Jumlah Tamu</th>
            <th class="border px-4 py-2">Konfirmasi</th>
            <th class="border px-4 py-2">Hadir</th>
            <th class="border px-4 py-2">Link</th>
            <th class="border px-4 py-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="attendance in attendances" :key="attendance.id">
            <td class="border px-4 py-2">{{ attendance.name }}</td>
            <td class="border px-4 py-2">{{ attendance.number }}</td>
            <td class="border px-4 py-2">{{ attendance.number_of_guest }}</td>
            <td class="border px-4 py-2">
              <span
                :class="[ 
                  'px-2 py-1 rounded text-white', 
                  attendance.confirmation_of_attendance === 1 ? 'bg-green-500' : 'bg-gray-500' 
                ]"
              >
                {{ attendance.confirmation_of_attendance === 1 ? 'Ya' : 'Tidak' }}
              </span>
            </td>
            <td class="border px-4 py-2">
              <span
                :class="[ 
                  'px-2 py-1 rounded text-white', 
                  attendance.attendance_status === 1 ? 'bg-green-500' : 'bg-gray-500' 
                ]"
              >
                {{ attendance.attendance_status === 1 ? 'Ya' : 'Tidak' }}
              </span>
            </td>
            <td class="border px-4 py-2">
              <a
                :href="attendance.link"
                target="_blank"
                class="text-blue-500 underline"
              >
                Open attendance
              </a>
            </td>
            <td class="border px-4 py-2">
              <button
              @click="checkAttendance(attendance)"
                :disabled="attendance.attendance_status === 'sent'"
                class="bg-gray-500 text-white px-3 py-1 rounded disabled:opacity-50 m-3"
              >
                Ubah Status Hadir
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Pagination -->
      <div class="mt-4 flex justify-between items-center">
        <button
          @click="prevPage"
          :disabled="page === 1"
          class="bg-gray-300 px-2 py-1 rounded"
        >
          Previous
        </button>
        <span>Page {{ page }} of {{ pagination.totalPages }}</span>
        <button
          @click="nextPage"
          :disabled="page === pagination.totalPages"
          class="bg-gray-300 px-2 py-1 rounded"
        >
          Next
        </button>
      </div>
      <Footer />
      </div>
</template>
<script setup>
  import Navbar from '~/components/Admin/Navbar/Navbar.vue';
  import Footer from '~/components/Admin/Footer/Footer.vue';

  const attendances = ref([]);
  const page = ref(1);
  const limit = ref(10);
  const search = ref("");
  const pagination = ref({ totalPages: 1 });

  const fetchAttendances = async () => {
    const { data, pagination: pag } = await $fetch("/api/attendances/get-attendances", {
      params: { page: page.value, limit: limit.value, search: search.value },
    });
    attendances.value = data;
    pagination.value = pag;
  };

  const prevPage = () => {
    if (page.value > 1) {
      page.value--;
      fetchAttendances();
    }
  };
  
  const nextPage = () => {
    if (page.value < pagination.value.totalPages) {
      page.value++;
      fetchAttendances();
    }
  };

  const checkAttendance = async (attendance) => {
    // Tampilkan konfirmasi sebelum mengirim
    const confirmation = confirm(
      `Apakah Anda yakin ingin ubah status undangan kepada ${attendance.name}?`
    );
    if (!confirmation) {
      return; // Batalkan proses jika pengguna memilih "Tidak"
    }

    try {
      // Ubah status undangan menjadi 1 (terkirim)
      await $fetch(`/api/attendances/put-attendance?id=${attendance.id}`, {
        method: "PUT",
        body: {
          invitation_id: attendance.invitation_id,
          number_of_guest: attendance.number_of_guest,
          confirmation_of_attendance: attendance.confirmation_of_attendance,
          status: 1,
        },
      });

      alert(`Undangan untuk ${attendance.name} berhasil ubah status!`);
      fetchAttendances(); // Memperbarui data undangan di UI
    } catch (error) {
      console.error(error);
      alert("Gagal mengirim undangan. Silakan coba lagi.");
    }
  };

  // Panggil fetch template saat aplikasi dimuat
  onMounted(() => {
    fetchAttendances();
  });
</script>