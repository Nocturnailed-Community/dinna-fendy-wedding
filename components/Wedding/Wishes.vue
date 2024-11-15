<template>
  <div class="min-h-screen flex flex-col items-center py-10 px-4">
    <h1 class="text-3xl font-semibold text-gray-800 mb-8 font-great-vibes">Ucapan</h1>

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

        <!-- Emoji Picker -->
        <div class="relative mt-4">
          <input
            v-model="emojiSearch"
            @input="fetchEmojis"
            type="text"
            placeholder="Cari emoji..."
            class="w-full p-2 mb-2 border border-gray-300 rounded"
          />
          <div class="flex flex-wrap">
            <button
              v-for="emoji in emojis"
              :key="emoji.slug"
              type="button"
              @click="addEmoji(emoji.character)"
              class="px-2 py-1 bg-gray-200 text-lg rounded hover:bg-gray-300 mb-2 mr-2"
            >
              {{ emoji.character }}
            </button>
          </div>
        </div>
      </div>

      <button type="submit" class="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Kirim
      </button>
    </form>

    <!-- Display List of Wishes -->
    <div v-if="wishes.length" class="w-full space-y-4 mb-10 max-w-4xl">
      <div
        v-for="wish in wishes"
        :key="wish.id"
        class="bg-white p-4 shadow rounded-lg"
      >
        <p class="text-gray-800 font-semibold">{{ wish.name }}</p>
        <p class="text-gray-600">{{ wish.wish }}</p>
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
import { useFetch } from '#app'
import { useRuntimeConfig } from '#app'

const name = ref('')
const wish = ref('')
const wishes = ref([])
const currentPage = ref(1)
const totalPages = ref(1)
const limit = 5 // Number of wishes per page
const emojis = ref([])
const emojiSearch = ref('')
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

// Function to fetch emojis based on the search query
const fetchEmojis = async () => {
  // Jika pencarian kosong atau hanya satu karakter, hentikan permintaan
  if (!emojiSearch.value || emojiSearch.value.length < 1) {
    emojis.value = []  // Kosongkan daftar emoji jika input kosong
    return
  }

  try {
    // Ambil API key dari runtimeConfig
    const config = useRuntimeConfig()
    const apiKey = config.public.EMOJIS_KEY

    // Kirim request API untuk mendapatkan emoji berdasarkan pencarian
    const response = await fetch(
      `https://emoji-api.com/emojis?search=${emojiSearch.value}&access_key=${apiKey}`
    )
    const result = await response.json()

    // Jika request berhasil, tampilkan hasil emoji
    if (response.ok) {
      emojis.value = result
    } else {
      emojis.value = []
      console.error('Failed to fetch emojis:', result)
    }
  } catch (error) {
    emojis.value = []
    console.error('Error fetching emojis:', error)
  }
}

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
    emojiSearch.value = ''
    emojis.value = []
    fetchWishes(currentPage.value)
  } else {
    alert(result.error || 'Failed to submit the wish')
  }
}

// Add emoji to the wish at the cursor position
const addEmoji = (emoji) => {
  const textarea = wishTextarea.value
  const start = textarea.selectionStart
  const end = textarea.selectionEnd
  const text = wish.value

  // Insert the emoji at the cursor position
  wish.value = text.slice(0, start) + emoji + text.slice(end)
  
  // Move the cursor after the inserted emoji
  textarea.setSelectionRange(start + emoji.length, start + emoji.length)
  textarea.focus()
}
</script>

<style scoped>
button {
  cursor: pointer;
}
button:hover {
  transform: scale(1.05);
}

/* Terapkan font Great Vibes pada kelas font-great-vibes */
.font-great-vibes {
  font-family: 'Great Vibes', cursive;
}

/* Style untuk emoji wrapper */
.flex-wrap {
  flex-wrap: wrap;
}
.mb-2 {
  margin-bottom: 8px;
}
.mr-2 {
  margin-right: 8px;
}
</style>
