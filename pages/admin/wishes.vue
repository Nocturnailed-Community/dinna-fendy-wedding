<template>
  <div class="flex flex-col min-h-screen p-4">
    <Navbar />
    <!-- Search and Settings -->
    <div class="flex flex-wrap justify-between items-center mb-4 mt-4">
      <select v-model="limit" @change="fetchWishes" class="border rounded px-3 py-1">
        <option :value="5">5</option>
        <option :value="10">10</option>
        <option :value="20">20</option>
      </select>
      <input
        v-model="search"
        @input="fetchWishes"
        type="text"
        placeholder="Cari nama..."
        class="border rounded px-3 py-1 w-full sm:w-1/3 mt-2 sm:mt-0"
      />
    </div>

    <!-- Responsive Table -->
    <div class="overflow-x-auto">
      <table class="table-auto w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th class="border px-4 py-2">Nama</th>
            <th class="border px-4 py-2">Ucapan</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="wish in wishes" :key="wish.id">
            <td class="border px-4 py-2">{{ wish.name }}</td>
            <td class="border px-4 py-2">{{ wish.wish }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="mt-4 flex justify-between items-center">
      <button
        @click="prevPage"
        :disabled="page === 1"
        class="bg-gray-300 px-2 py-1 rounded disabled:opacity-50"
      >
        Previous
      </button>
      <span>Page {{ page }} of {{ pagination.totalPages }}</span>
      <button
        @click="nextPage"
        :disabled="page === pagination.totalPages"
        class="bg-gray-300 px-2 py-1 rounded disabled:opacity-50"
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

  const wishes = ref([]);
  const page = ref(1);
  const limit = ref(10);
  const search = ref("");
  const pagination = ref({ totalPages: 1 });

  const fetchWishes = async () => {  

    const { data, pagination: pag } = await $fetch("/api/wishes/get-admin-wishes", {
      params: { page: page.value, limit: limit.value, search: search.value },
    });
    wishes.value = data;
    pagination.value = pag;
  };

  const prevPage = () => {
    if (page.value > 1) {
      page.value--;
      fetchWishes();
    }
  };
  
  const nextPage = () => {
    if (page.value < pagination.value.totalPages) {
      page.value++;
      fetchWishes();
    }
  };

  // Panggil fetch template saat aplikasi dimuat
  onMounted(() => {
    fetchWishes();
  });
</script>