<template>
  <!-- Wrapper utama untuk template root -->
  <div class="relative">
    <!-- Bagian Background Gambar Jejak Sandal untuk Desktop (PC) -->
    <div class="hidden md:block fixed inset-0 -z-10 pointer-events-none">
      <img 
        src="@/assets/ornamen/jejak-sandal.png" 
        alt="Jejak Sandal" 
        class="absolute object-cover w-full h-full opacity-50" 
      />
    </div>

    <!-- Bagian Background Gambar Jejak Sandal untuk Handphone (HP) -->
    <div class="block md:hidden fixed inset-0 -z-10 pointer-events-none">
      <img 
        src="@/assets/ornamen/jejak-sandal-hp.png" 
        alt="Jejak Sandal HP" 
        class="absolute object-cover w-full h-full opacity-50" 
      />
    </div>

    <!-- Section 1: Pembukaan dan Buka Undangan -->
    <div class="min-h-screen flex items-center justify-center bg-cover bg-center">
      <!-- Konten Utama - Tombol Buka Undangan -->
      <div class="text-center p-10 bg-white bg-opacity-70 rounded-lg shadow-lg z-10">
        <div class="mb-8 flex justify-center">
          <img src="@/assets/images/ornamen/gunungan.png" alt="Gunungan" class="w-full h-auto rounded-lg" />
        </div>
        <h1 class="text-4xl font-bold mb-4">Undangan Pernikahan</h1>
        <h5 class="text-2xl font-bold mb-4">Dinna<Icon name="fxemoji:blackheartsuit" />Fendy</h5>
        <p class="text-xl mb-6">Dear, <span class="font-bold">{{ recipientName }}</span></p>
        <!-- Tombol Buka Undangan -->
        <button @click="openInvitation" class="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-700">
          Buka Undangan
        </button>
      </div>
      <!-- Bubble Button for Play/Stop -->
      <button @click="togglePlay" class="bubble-button">
        {{ isPlaying ? "Stop" : "Play" }}
      </button>
      <audio ref="audio" :src="audioSrc"></audio>
    </div>

    <!-- Section 2: Tentang Pengantin -->
    <div id="about-us" class="min-h-screen flex items-center justify-center p-10 relative">
  <div class="z-10 max-w-3xl w-full">
    <!-- Card Container -->
    <div class="bg-white shadow-lg rounded-lg p-8">
      <h2 class="text-3xl font-bold mb-6 text-center">Tentang Pengantin</h2>
      <p class="text-xl mb-8 text-center">Dengan rasa syukur, kami mempersembahkan pernikahan kami yang dipersatukan oleh cinta:</p>
      
      <!-- Image Above Names -->
      <div class="mb-8 flex justify-center">
        <img src="@/assets/images/profile/profile.jpeg" alt="Banner" class="w-full h-auto rounded-lg" />
      </div>

      <!-- Kontainer untuk nama pengantin dengan card -->
      <div class="flex flex-col md:flex-row items-center justify-center mb-8 space-y-4 md:space-y-0 md:space-x-4">
        <!-- Nama Pengantin Wanita -->
        <div class="bg-gray-100 p-6 rounded-lg text-center shadow-md flex flex-col items-center justify-center w-full md:w-64 h-64">
          <div>
            <h3 class="text-2xl font-bold mb-2">Dinna Fauziah</h3>
            <p class="text-lg">Putri dari Bapak Sardi dan Ibu Katiyem</p>
          </div>
        </div>

        <!-- Ikon Love di tengah -->
        <div class="mx-4 flex items-center justify-center">
          <Icon name="fxemoji:blackheartsuit" class="text-5xl" />
        </div>

        <!-- Nama Pengantin Pria -->
        <div class="bg-gray-100 p-6 rounded-lg text-center shadow-md flex flex-col items-center justify-center w-full md:w-64 h-64">
          <div>
            <h3 class="text-2xl font-bold mb-2">Syafei Dwiyoga Arifendy</h3>
            <p class="text-lg">Putra dari Bapak Agus Triyono dan Ibu Suminah</p>
          </div>
        </div>
      </div>

      <p class="text-lg text-center">Kami sangat menantikan kehadiran dan doa restu dari Anda pada hari bahagia kami.</p>
    </div>
  </div>
</div>


    <!-- Section 3: Tanggal Pernikahan -->
    <div id="wedding-date" class="min-h-screen flex items-center justify-center p-10 relative">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 z-10">
        <!-- Card Akad -->
        <div class="bg-gray-100 p-6 rounded-lg shadow-lg text-center">
          <h2 class="text-2xl font-bold mb-2">Akad Nikah</h2>
          <p class="text-xl mb-4">Minggu, 22 Desember 2024</p>
          <p class="text-lg font-bold">08.00 - 10.00 WIB</p>
        </div>

        <!-- Card Resepsi -->
        <div class="bg-gray-100 p-6 rounded-lg shadow-lg text-center">
          <h2 class="text-2xl font-bold mb-2">Resepsi Pernikahan</h2>
          <p class="text-xl mb-4">Minggu, 22 Desember 2024</p>
          <p class="text-lg font-bold">11.00 - 17.00 WIB</p>
        </div>
      </div>
    </div>


    <!-- Section 4: Lokasi Pernikahan -->
    <div id="location" class="min-h-screen flex flex-col items-center justify-center p-10 relative">
      <div class="z-10 w-full max-w-4xl">
        <!-- Card Container -->
        <div class="bg-white shadow-lg rounded-lg p-8">
          <div class="text-center mb-8">
            <h2 class="text-3xl font-bold mb-4">Lokasi Acara</h2>
            <p class="text-xl">Gedung Gelanggang Remaja Pulogadung</p>
            <p class="text-lg">Jl. Raya Pemuda No.17, Rawamangun, Kec. Pulogadung, Jakarta Timur, DKI Jakarta 13220</p>
          </div>

          <!-- Google Maps Embed -->
          <div class="w-full flex justify-center mb-6">
            <iframe 
              class="w-full h-64 md:w-3/4 md:h-96 rounded-lg shadow-lg" 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1983.606968987313!2d106.87974461612943!3d-6.191348462459264!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f4d11f38c6df%3A0x1c259ec5e1584b7b!2sGelanggang%20Remaja%20Pulogadung!5e0!3m2!1sen!2sid!4v1634835703406!5m2!1sen!2sid" 
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade">
            </iframe>
          </div>

          <!-- Tombol Lihat Rute -->
          <div class="flex justify-center">
            <a 
              href="https://www.google.com/maps/dir/?api=1&destination=Gedung+Gelanggang+Remaja+Pulogadung,+Jl.+Raya+Pemuda+No.17,+Jakarta+Timur" 
              target="_blank" 
              class="inline-block bg-blue-500 text-white font-bold py-2 px-6 rounded-lg shadow-md hover:bg-blue-600 transition">
              Lihat Lokasi
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Section 5: Galeri Foto -->
    <div id="gallery" class="min-h-screen flex flex-col items-center justify-center p-10 relative">
      <div class="z-10 w-full max-w-5xl">
        <!-- Card Container for the Gallery -->
        <h2 class="text-3xl font-bold mb-8 text-center">Pre Wedding</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
          <!-- Card for each photo -->
          <div class="bg-white shadow-lg rounded-lg overflow-hidden">
            <img src="@/assets/images/gallery/images (1).jpeg" alt="Gallery Photo 1" class="w-full h-auto" />
          </div>
          <div class="bg-white shadow-lg rounded-lg overflow-hidden">
            <img src="@/assets/images/gallery/images (2).jpeg" alt="Gallery Photo 2" class="w-full h-auto" />
          </div>
          <div class="bg-white shadow-lg rounded-lg overflow-hidden">
            <img src="@/assets/images/gallery/images (3).jpeg" alt="Gallery Photo 3" class="w-full h-auto" />
          </div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
          <!-- Card for each photo -->
          <div class="bg-white shadow-lg rounded-lg overflow-hidden">
            <img src="@/assets/images/gallery/images (4).jpeg" alt="Gallery Photo 4" class="w-full h-auto" />
          </div>
          <div class="bg-white shadow-lg rounded-lg overflow-hidden">
            <img src="@/assets/images/gallery/images (5).jpeg" alt="Gallery Photo 5" class="w-full h-auto" />
          </div>
          <div class="bg-white shadow-lg rounded-lg overflow-hidden">
            <img src="@/assets/images/gallery/images (6).jpeg" alt="Gallery Photo 6" class="w-full h-auto" />
          </div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <!-- Card for each photo -->
          <div class="bg-white shadow-lg rounded-lg overflow-hidden">
            <img src="@/assets/images/gallery/images (7).jpeg" alt="Gallery Photo 7" class="w-full h-auto" />
          </div>
          <div class="bg-white shadow-lg rounded-lg overflow-hidden">
            <img src="@/assets/images/gallery/images (8).jpeg" alt="Gallery Photo 8" class="w-full h-auto" />
          </div>
          <div class="bg-white shadow-lg rounded-lg overflow-hidden">
            <img src="@/assets/images/gallery/images (9).jpeg" alt="Gallery Photo 9" class="w-full h-auto" />
          </div>
        </div>
      </div>
    </div>

    <!-- Section 6: Ucapan Terima Kasih -->
    <div id="thank-you" class="min-h-screen flex items-center justify-center p-10 relative">
      <div class="bg-white shadow-lg rounded-lg p-8">
        <div class="text-center z-10">
          <h2 class="text-3xl font-bold mb-4">Terima Kasih</h2>
          <p class="text-xl">Kami sangat berterima kasih atas doa dan kehadiran Anda di hari bahagia kami.</p>
        </div>
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
      audioSrc: audioFile,
      googleMapsUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d991.7385220819967!2d106.87742173183104!3d-6.196892929221758!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f4bfae19c195%3A0x78be20a8eac2ec5f!2sGelanggang%20Remaja%20Pulogadung!5e0!3m2!1sen!2sid!4v1698384169637!5m2!1sen!2sid',
      invitationOpened: false,
      isPlaying: false // Tambahkan status untuk memantau apakah audio sedang dimainkan
    }
  },
  
  mounted() {
    this.recipientName = this.$route.query.name || 'Guest';
    if (!this.invitationOpened) {
      document.body.style.overflow = 'hidden'; // Kunci scroll
    }
  },

  methods: {
    openInvitation() {
      this.playMusic(); // Saat undangan dibuka, musik akan mulai diputar
      this.invitationOpened = true;
      document.body.style.overflow = 'auto'; // Buka scroll

      const aboutSection = document.getElementById('about-us');
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' });
      }
    },
    
    playMusic() {
      this.$refs.audio.play()
        .then(() => {
          this.isPlaying = true;
        })
        .catch((error) => {
          console.error("Failed to play audio:", error);
        });
    },

    stopMusic() {
      this.$refs.audio.pause();
      this.isPlaying = false;
    },

    togglePlay() {
      if (this.isPlaying) {
        this.stopMusic();
      } else {
        this.playMusic();
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

 /* Media Queries for Responsive Text and Spacing */
 @media (max-width: 768px) {
    #about-us h2 {
      font-size: 2.5rem; /* Adjust heading size for smaller screens */
    }
    #about-us p {
      font-size: 1.25rem; /* Adjust paragraph size for smaller screens */
    }
}

.bubble-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  background-color: #ff4081;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s ease;
  z-index: 9999; /* Pastikan ini memiliki nilai lebih tinggi */
}

.bubble-button:hover {
  background-color: #e91e63;
}

</style>
