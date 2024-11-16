<template>
  <div id="number-date" class="min-h-screen flex items-center justify-center p-10">
    <div class="p-8 rounded-lg text-center max-w-lg w-full">
      <Motion is="p" preset="slideVisibleTop">
        <h1 class="text-3xl font-semibold text-gray-800 mb-8 font-great-vibes">Wedding Gift</h1>
        <p class="text mb-8">Terima kasih atas hadiah dan doa terbaik Anda!</p>
      </Motion>

      <div class="flex flex-col items-center gap-4 py-10">
        <!-- Button to reveal the account information -->
        <button
          v-if="!isCardVisible"
          @click="revealAccountInfo"
          class="w-full py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all"
        >
          Buka Kado Pernikahan
        </button>

        <!-- Card for Account Information (hidden initially) -->
        <div
          v-if="isCardVisible"
          class="w-full bg-brown-800 shadow-lg rounded-lg p-6 text-white opacity-70 transition-opacity duration-1000"
        >
          <!-- Card Header with Mandiri Logo -->
          <div class="flex items-center justify-end mb-6">
            <img
              src="@/assets/ornamen/logo-bank-mandiri-putih.png"
              alt="Mandiri Logo"
              class="h-10 w-auto"
            />
          </div>

          <!-- Account Information -->
          <div class="flex flex-col mb-6">
            <div class="flex justify-between mb-4">
              <span class="text-sm">NOMOR REKENING</span>
            </div>
            <div class="flex justify-between mb-4">
              <span class="text-lg font-semibold">{{ accountNumber }}</span>
            </div>
            <div class="flex justify-between mb-4">
              <span class="text-sm">NAMA REKENING</span>
            </div>
            <div class="flex justify-between mb-4">
              <span class="text-lg font-semibold">{{ accountHolder }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm">Bank Mandiri</span>
            </div>
          </div>
        </div>

        <!-- Copy Button (hidden initially) -->
        <button
          v-if="isCardVisible"
          @click="copyToClipboard"
          class="w-full py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all"
        >
          SALIN NO REKENING
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Account data
const accountNumber = ref('60010693954')
const accountHolder = ref('Dinna Fauziah')

// State to control visibility of account information
const isCardVisible = ref(false)

// Function to reveal account information and copy button
const revealAccountInfo = () => {
  isCardVisible.value = true
}

// Function to copy the account number to clipboard
const copyToClipboard = () => {
  navigator.clipboard.writeText(accountNumber.value).then(() => {
    alert('Nomor rekening berhasil disalin!')
  }).catch((error) => {
    console.error('Gagal menyalin nomor rekening:', error)
  })
}
</script>

<style scoped>
/* Tailwind background color for brown */
.bg-brown-800 {
  background-color: #4E3B31; /* Dark brown color */
}

button {
  cursor: pointer;
}

button:hover {
  transform: scale(1.05);
  transition: transform 0.2s ease-in-out; /* Smooth transition */
}

/* Text color adjustments for better visibility */
.text-white {
  color: white;
}

.text-sm {
  color: #d1d1d1; /* Light gray for text */
}

.text-lg {
  color: white; /* White text for larger numbers */
}

/* Adjusting spacing for a cleaner layout */
.mb-6 {
  margin-bottom: 24px;
}

.mb-4 {
  margin-bottom: 16px;
}

/* Terapkan font Great Vibes pada kelas font-great-vibes */
.font-great-vibes {
  font-family: 'Great Vibes', cursive;
}

/* Ensuring the container does not shift */
#number-date {
  display: flex;
  justify-content: center;
  align-items: center;
}

.max-w-lg {
  max-width: 100%;
}

.w-full {
  width: 100%;
}

/* Animation for fading in */
.transition-opacity {
  transition: opacity 1s ease-in-out;
}

/* Optional: Fading effect */
.opacity-70 {
  opacity: 0.7;
}
</style>
