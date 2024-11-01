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
        <h5 class="text-2xl font-bold mb-4">22 • 12 • 2024</h5>
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
    <Doa />
    
    <!-- Section 7: Ucapan Terima Kasih -->
    <ThankYou />
    
    <!-- Footer Section -->
    <Footer />

  </div>
</template>

<script>
import audioFile from "@/assets/audio/PurityJavaneseGamelan.mp3";
import About from '../components/Wedding/About.vue'; // Import the About component
import Address from '../components/Wedding/Address.vue'; // Import the Address component
import Date from '../components/Wedding/Date.vue'; // Import the Date component
import Gallery from '../components/Wedding/Gallery.vue'; // Import the Gallery component
import Doa from '../components/Wedding/Doa.vue'; // Import the Doa component
import ThankYou from '../components/Wedding/ThankYou.vue'; // Import the ThankYou component
import Footer from '../components/Wedding/Footer.vue'; // Import the Footer component

export default {
  components: {
    About,
    Address,
    Date,
    Gallery,
    Doa,
    ThankYou,
    Footer,
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
      // Allow scrolling by default on mobile
      if (!this.invitationOpened) {
        document.body.classList.add('no-scroll'); // Add class to prevent scrolling
      }
    }
  },

  methods: {
    openInvitation() {
      this.playMusic(); // Saat undangan dibuka, musik akan mulai diputar
      this.invitationOpened = true;
      
      // Ensure we're in a client environment
      if (process.client) {
        document.body.classList.remove('no-scroll'); // Remove class to allow scrolling

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

/* Prevent scrolling with class */
.no-scroll {
  overflow: hidden; /* Prevent scrolling */
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
