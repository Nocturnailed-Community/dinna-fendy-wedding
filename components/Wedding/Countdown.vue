<template>
    <div>
      <!-- <h5 class="text-1xl font-bold mb-4 font-dancing-script">22 • 12 • 2024</h5> -->
      <div class="countdown mb-3 font-dancing-script">
        <span>{{ days }} Hari</span>
        <span>{{ hours }} Jam</span>
        <span>{{ minutes }} Menit</span>
        <span>{{ seconds }} Detik</span>
      </div>
    </div>
</template>
  
<script setup>
  import { ref, onMounted, onUnmounted } from 'vue';
  
  const targetDate = new Date("December 22, 2024 00:00:00").getTime();
  const days = ref(0);
  const hours = ref(0);
  const minutes = ref(0);
  const seconds = ref(0);
  
  // Fungsi untuk menghitung waktu mundur
  const updateCountdown = () => {
    const now = new Date().getTime();
    const distance = targetDate - now;
  
    if (distance <= 0) {
      // Jika waktu telah berakhir
      days.value = hours.value = minutes.value = seconds.value = 0;
      return;
    }
  
    days.value = Math.floor(distance / (1000 * 60 * 60 * 24));
    hours.value = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    minutes.value = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    seconds.value = Math.floor((distance % (1000 * 60)) / 1000);
  };
  
  // Update countdown setiap detik
  let countdownInterval;
  
  onMounted(() => {
    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 1000);
  });
  
  onUnmounted(() => {
    clearInterval(countdownInterval);
  });
</script>
  
<style scoped>
  .countdown {
    font-size: 15px;
    font-weight: bold;
    color: #333;
  }
  
  .countdown span {
    margin: 0 5px;
  }

  /* Terapkan font Great Vibes pada kelas font-dancing-script */
 .font-dancing-script {
    font-family: 'Dancing Script', cursive;
 }
</style>  