<template>
  <!-- Wrapper utama untuk template root -->
  <div class="relative">
    <!-- Bagian Background Gambar Jejak Sandal untuk Desktop (PC) -->
    <div class="hidden md:block fixed inset-0 -z-10">
      <img 
        src="@/assets/ornamen/jejak-sandal.png" 
        alt="Jejak Sandal" 
        class="absolute object-cover w-full h-full opacity-20" 
      />
    </div>

    <!-- Bagian Background Gambar Jejak Sandal untuk Handphone (HP) -->
    <div class="block md:hidden fixed inset-0 -z-10">
      <img 
        src="@/assets/ornamen/jejak-sandal-hp.png" 
        alt="Jejak Sandal HP" 
        class="absolute object-cover w-full h-full opacity-20" 
      />
    </div>

    <!-- Section 1: Pembukaan dan Buka Undangan -->
    <div class="min-h-screen flex items-center justify-center bg-cover bg-center" :style="{ backgroundImage: `url('/wedding-background.jpg')` }">
      <!-- Konten Utama - Tombol Buka Undangan -->
      <div class="text-center p-10 bg-white bg-opacity-70 rounded-lg shadow-lg z-10">
        <h1 class="text-4xl font-bold mb-4">Undangan Pernikahan</h1>
        <p class="text-xl mb-6">Dear, <span class="font-bold">{{ recipientName }}</span></p>
        <button @click="openInvitation" class="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-700">
          Buka Undangan
        </button>
      </div>
      <audio ref="audio" :src="audioSrc"></audio>
    </div>

    <!-- Section 2: Tentang Pengantin -->
    <div id="about-us" class="min-h-screen flex items-center justify-center bg-gray-100 p-10 relative">
      <div class="text-center z-10 max-w-2xl">
        <h2 class="text-3xl font-bold mb-4">Tentang Pengantin</h2>
        <p class="text-xl mb-6">Dengan rasa syukur, kami mempersembahkan pernikahan kami yang dipersatukan oleh cinta:</p>
        
        <!-- Kontainer untuk nama pengantin -->
        <div class="flex items-center justify-center mb-6">
          <!-- Nama Pengantin Wanita -->
          <div class="text-center mr-4">
            <h3 class="text-2xl font-bold">Dinna Fuaziah</h3>
            <p class="text-lg">Putri dari Bapak Sardi dan Ibu Katiyem</p>
          </div>

          <!-- Ikon Love di tengah -->
          <Icon name="fxemoji:blackheartsuit" class="text-5xl" />
          
          <!-- Nama Pengantin Pria -->
          <div class="text-center ml-4">
            <h3 class="text-2xl font-bold">Syafei Dwiyoga Arifendy</h3>
            <p class="text-lg">Putra dari Bapak Agus Triyono dan Ibu Suminah</p>
          </div>
        </div>

        <p class="text-lg">Kami sangat menantikan kehadiran dan doa restu dari Anda pada hari bahagia kami.</p>
      </div>
    </div>


    <!-- Section 3: Tanggal Pernikahan -->
    <div id="wedding-date" class="min-h-screen flex items-center justify-center bg-white p-10 relative">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 z-10">
        <!-- Card Akad -->
        <div class="bg-gray-100 p-6 rounded-lg shadow-lg text-center">
          <h2 class="text-2xl font-bold mb-2">Akad Nikah</h2>
          <p class="text-xl mb-4">22 Desember 2024</p>
          <p class="text-lg font-bold">08.00 - 10.00 WIB</p>
        </div>

        <!-- Card Resepsi -->
        <div class="bg-gray-100 p-6 rounded-lg shadow-lg text-center">
          <h2 class="text-2xl font-bold mb-2">Resepsi Pernikahan</h2>
          <p class="text-xl mb-4">22 Desember 2024</p>
          <p class="text-lg font-bold">11.00 - 17.00 WIB</p>
        </div>
      </div>
    </div>


    <!-- Section 4: Lokasi Pernikahan -->
    <div id="location" class="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-10 relative">
      <div class="text-center z-10 mb-8">
        <h2 class="text-3xl font-bold mb-4">Lokasi Acara</h2>
        <p class="text-xl">Gedung Gelanggang Remaja Pulogadung</p>
        <p class="text-lg">Jl. Raya Pemuda No.17, Rawamangun, Kec. Pulogadung, Jakarta Timur, DKI Jakarta 13220</p>
      </div>

      <!-- Google Maps Embed -->
      <iframe 
        class="w-full h-64 md:w-3/4 md:h-96 rounded-lg shadow-lg z-10" 
        :src="googleMapsUrl" 
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade">
      </iframe>
    </div>

    <!-- Section 5: Ucapan Terima Kasih -->
    <div id="thank-you" class="min-h-screen flex items-center justify-center bg-white p-10 relative">
      <div class="text-center z-10">
        <h2 class="text-3xl font-bold mb-4">Terima Kasih</h2>
        <p class="text-xl">Kami sangat berterima kasih atas doa dan kehadiran Anda di hari bahagia kami.</p>
      </div>
    </div>

    <!-- Footer Section -->
    <footer class="bg-gray-800 text-white text-center py-4">
      <p class="text-sm">Created and Design by <a href="https://www.instagram.com/nocturnailed.team/" target="_blank" class="hover:text-gray-300">Nocturnailed</a></p>
    </footer>
  </div>
</template>

<script>
import audioFile from "@/assets/audio/pernikahan_impian.mp3";

export default {
  data() {
    return {
      recipientName: '',
      audioSrc: audioFile, // Path ke file audio
      googleMapsUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d991.7385220819967!2d106.87742173183104!3d-6.196892929221758!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f4bfae19c195%3A0x78be20a8eac2ec5f!2sGelanggang%20Remaja%20Pulogadung!5e0!3m2!1sen!2sid!4v1698384169637!5m2!1sen!2sid'
    }
  },
  mounted() {
    // Ambil parameter 'name' dari URL
    this.recipientName = this.$route.query.name || 'Guest';
  },
  methods: {
    openInvitation() {
      // Mainkan musik ketika undangan dibuka
      this.$refs.audio.play();

      // Scroll ke bagian pertama konten undangan
      const aboutSection = document.getElementById('about-us');
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' });
      }
    },
  },
}
</script>

<style scoped>
html, body {
  margin: 0;
  padding: 0;
  font-family: 'Arial', sans-serif;
}

#about-us, #wedding-date, #location, #thank-you {
  background-color: #f9fafb; /* Warna latar belakang section */
}
</style>
