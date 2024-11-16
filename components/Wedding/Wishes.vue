<template>
  <div class="min-h-screen flex flex-col items-center py-10 px-4">
    <Motion is="p" preset="slideVisibleTop">
      <h1 class="text-3xl font-semibold text-gray-800 mb-8 font-great-vibes">Ucapan</h1>
    </Motion>
    <Motion is="p" preset="slideVisibleTop">
      <p class="text mb-8">Berikan Ucapan kepada mempelai.</p>
    </Motion>

    <!-- Form to Add New Wish -->
    <form @submit.prevent="submitWish" class="w-full p-6 shadow rounded-lg space-y-4 mb-10 max-w-4xl">
      <input
        v-model="name"
        type="text"
        placeholder="Masukkan Nama"
        class="w-full p-2 border border-gray-300 rounded"
        required
      />

      <div class="relative">
        <textarea
          v-model="wish"
          ref="wishTextarea"
          placeholder="Kirim Ucapan untuk Pengantin"
          class="w-full p-2 border border-gray-300 rounded h-32"
          required
        ></textarea>
      </div>

      <button type="submit" class="w-full py-2 bg-brown-800 text-white rounded hover:bg-brown-700">
        Kirim
      </button>
    </form>
  

    <!-- Display List of Wishes -->
    <div v-if="wishes.length" class="w-full space-y-4 mb-10 max-w-4xl">
      <div
        v-for="wish in wishes"
        :key="wish.id"
        class="p-4 shadow rounded-lg"
      >
        <p class="text-gray-800 font-bold">{{ wish.name }}</p>
        <p class="text-gray-600 font-semibold">{{ wish.wish }}</p>
      </div>
    </div>
    <p v-else class="text-gray-500 mb-10">No wishes yet. Be the first to leave one!</p>

    <!-- Pagination Controls -->
    <div class="flex items-center space-x-2">
      <button
        @click="currentPage > 1 && fetchWishes(currentPage - 1)"
        :disabled="currentPage === 1"
        class="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 disabled:opacity-50"
      >
        Sebelumnya
      </button>
      <span>Halaman {{ currentPage }} dari {{ totalPages }}</span>
      <button
        @click="currentPage < totalPages && fetchWishes(currentPage + 1)"
        :disabled="currentPage === totalPages"
        class="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 disabled:opacity-50"
      >
        Selanjutnya
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const name = ref('')
const wish = ref('')
const wishes = ref([])
const currentPage = ref(1)
const totalPages = ref(1)
const limit = 5 // Number of wishes per page
const wishTextarea = ref(null)

// Fetch existing wishes with pagination
const fetchWishes = async (page = 1) => {
  currentPage.value = page
  const { data, error } = await useFetch(`/api/wishes/get-wishes?page=${page}&limit=${limit}`)
  
  if (!error.value) {
    wishes.value = data.value.wishes
    totalPages.value = data.value.totalPages
  }
}

onMounted(() => fetchWishes(currentPage.value))

// Function to submit a new wish
const submitWish = async () => {
  const response = await fetch('/api/wishes/post-wish', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: name.value, wish: wish.value })
  })
  
  const result = await response.json()

  if (result.success) {
    // Add the new wish to the list and reset the form
    wishes.value.unshift({ id: result.id, name: name.value, wish: wish.value, timestamp: new Date().toISOString() })
    name.value = ''
    wish.value = ''
    fetchWishes(currentPage.value)
  } else {
    alert(result.error || 'Failed to submit the wish')
  }
}
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
  background-color: #8B6A46; /* Lighter Brown */
}

/* Terapkan font Great Vibes pada kelas font-great-vibes */
.font-great-vibes {
  font-family: 'Great Vibes', cursive;
}
</style>