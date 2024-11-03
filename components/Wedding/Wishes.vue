<template>
    <div class="min-h-screen flex flex-col items-center py-10">
      <h1 class="text-3xl font-semibold text-gray-800 mb-8">Ucapan</h1>
      
      <!-- Form to Add New Wish -->
      <form @submit.prevent="submitWish" class="w-full max-w-md bg-white p-6 shadow rounded-lg space-y-4 mb-10">
        <input
          v-model="name"
          type="text"
          placeholder="Masukkan Nama"
          class="w-full p-2 border border-gray-300 rounded"
          required
        />
        <textarea
          v-model="wish"
          placeholder="Kirim Ucapan untuk Pengantin"
          class="w-full p-2 border border-gray-300 rounded"
          required
        ></textarea>
        <button type="submit" class="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Kirim
        </button>
      </form>
  
      <!-- Display List of Wishes -->
      <div v-if="wishes.length" class="w-full max-w-md space-y-4 mb-10">
        <div
          v-for="wish in wishes"
          :key="wish.id"
          class="bg-white p-4 shadow rounded-lg"
        >
          <p class="text-gray-800 font-semibold">{{ wish.name }}</p>
          <p class="text-gray-600">{{ wish.wish }}</p>
          <!-- <p class="text-xs text-gray-500 mt-2">{{ new Date(wish.timestamp).toLocaleString() }}</p> -->
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
          Previous
        </button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button
          @click="currentPage < totalPages && fetchWishes(currentPage + 1)"
          :disabled="currentPage === totalPages"
          class="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
</template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useFetch } from '#app'
  
  const name = ref('')
  const wish = ref('')
  const wishes = ref([])
  const currentPage = ref(1)
  const totalPages = ref(1)
  const limit = 5 // Number of wishes per page
  
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
      // Refetch the wishes to update the list
      fetchWishes(currentPage.value)
    } else {
      alert(result.error || 'Failed to submit the wish')
    }
  }
  </script>
  
  <style scoped>
    /* Add any custom styling if needed */
  </style>
  