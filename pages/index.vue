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
          <img 
            src="@/assets/ornamen/gunungan.png" 
            alt="Gunungan" 
            class="w-2/3 h-auto rounded-lg" 
          />
        </div>
        <h1 class="text-4xl font-bold mb-4">Undangan Pernikahan</h1>
        <h5 class="text-2xl font-bold mb-4">Dinna<Icon name="fxemoji:blackheartsuit" />Fendy</h5>
        <p class="text-xl mb-6">Kepada Yth, <span class="font-bold">{{ recipientName }}</span></p>
        <!-- Tombol Buka Undangan -->
        <button 
          @click="openInvitation" 
          class="bg-[#C7A07A] text-white px-4 py-2 rounded-lg hover:bg-[#734128]"
        >
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
    <About />

    <!-- Section 3: Tanggal Pernikahan -->
    <Date />

    <!-- Section 4: Lokasi Pernikahan -->
    <Address />    

    <!-- Section 5: Galeri Foto -->
    <Gallery />

    <!-- Section 6: Doa -->
    <div id="thank-you" class="min-h-screen flex items-center justify-center p-10 relative">
      <div class="bg-white shadow-lg rounded-lg p-8">
        <div class="text-center z-10">
          <p class="text-xl">"Di antara tanda-tanda (kebesaran)-Nya ialah bahwa Dia menciptakan pasangan-pasangan untukmu dari (jenis) dirimu sendiri agar kamu merasa tenteram kepadanya. Dia menjadikan di antaramu rasa cinta dan kasih sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir."</p>
          <strong class="text-xl">Ar-Rum · Ayat 21</strong>
        </div>
      </div>
    </div>

    <!-- Section 7: Ucapan Terima Kasih -->
    <div id="thank-you" class="min-h-screen flex items-center justify-center p-10 relative">
      <div class="bg-white shadow-lg rounded-lg p-8">
        <div class="text-center z-10">
          <h2 class="text-3xl font-bold mb-4">Terima Kasih</h2>
          <p class="text-xl">Atas segala do'a dan restu saudara/i, kami ucapkan terima kasih.</p>
          <p class="text-xl">Wassalamualaikum Warahmatullahi Wabarakatuh.</p>
        </div>
      </div>
    </div>

    <!-- Footer Section -->
    <footer class="bg-gray-800 text-white text-center py-4">
      <p class="text-sm">© 2024 | Dinna & Fendy Wedding. All rights reserved.</p>
      <!-- <p class="text-sm">Song by <a href="" target="_blank" class="hover:text-gray-300"><strong>Nocturnailed</strong></a></p> -->
      <p class="text-sm">Created and Design by <a href="https://www.instagram.com/nocturnailed.team/" target="_blank" class="hover:text-gray-300"><strong>Nocturnailed</strong></a></p>
    </footer>
  </div>
</template>

<script>
import audioFile from "@/assets/audio/pernikahan_impian.mp3";
import About from '../components/Wedding/About.vue'; // Import the About component
import Address from '../components/Wedding/Address.vue'; // Import the Address component
import Date from '../components/Wedding/Date.vue'; // Import the Date component
import Gallery from '../components/Wedding/Gallery.vue'; // Import the Gallery component

export default {
  components: {
    About,
    Address,
    Date,
    Gallery,
  },
  data() {
    return {
      recipientName: '',
      audioSrc: audioFile,
      googleMapsUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d991.7385220819967!2d106.87742173183104!3d-6.196892929221758!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f4bfae19c195%3A0x78be20a8eac2ec5f!2sGelanggang%20Remaja%20Pulogadung!5e0!3m2!1sen!2sid!4v1698384169637!5m2!1sen!2sid',
      invitationOpened: false,
      isPlaying: false // Status untuk memantau apakah audio sedang dimainkan
    }
  },
  
  mounted() {
    // Ensure we're in a client environment
    if (process.client) {
      this.recipientName = this.$route.query.name || 'Guest';
      if (!this.invitationOpened) {
        document.body.style.overflow = 'hidden'; // Kunci scroll
      }
    }
  },

  methods: {
    openInvitation() {
      this.playMusic(); // Saat undangan dibuka, musik akan mulai diputar
      this.invitationOpened = true;
      
      // Ensure we're in a client environment
      if (process.client) {
        document.body.style.overflow = 'auto'; // Buka scroll

        const aboutSection = document.getElementById('about-us');
        if (aboutSection) {
          aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
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
  background-color: #C7A07A;
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
  background-color: #734128;
}

</style>
