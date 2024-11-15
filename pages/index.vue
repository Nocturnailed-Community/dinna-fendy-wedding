<template>
  <div class="relative">
    <!-- Background Gambar Jejak Sandal untuk Desktop (PC) -->
    <div class="hidden md:block fixed inset-0 -z-10 pointer-events-none">
      <img 
        src="@/assets/ornamen/jejak-sandal.png" 
        alt="Jejak Sandal" 
        class="absolute object-cover w-full h-full opacity-50" 
      />
    </div>

    <!-- Background Gambar Jejak Sandal untuk Handphone (HP) -->
    <!-- <div class="block md:hidden fixed inset-0 -z-10 pointer-events-none">
      <img 
        src="@/assets/ornamen/jejak-sandal-hp.png" 
        alt="Jejak Sandal HP" 
        class="absolute object-cover w-full h-full opacity-50" 
      />
    </div> -->

    <div class="block md:hidden fixed inset-0 -z-10 pointer-events-none">
      <img 
        src="@/assets/ornamen/jawa-klasik.png" 
        alt="Jawa Klasik" 
        class="absolute object-cover w-full h-full opacity-50" 
      />
    </div>

    <!-- Section 1: Pembukaan dan Buka Undangan dengan Animasi -->
    <v-motion
      :initial="{ opacity: 0, scale: 0.8 }"
      :enter="{ opacity: 1, scale: 1 }"
      transition="spring"
      class="min-h-screen flex items-center justify-center bg-cover bg-center"
    >
      <div class="text-center p-10 rounded-lg z-10 max-w-3xl w-full">
        <v-motion 
          :initial="{ opacity: 0, y: -50 }"
          :enter="{ opacity: 1, y: 0 }"
          transition="{ delay: 0.2, duration: 0.5 }"
          class="mb-8 flex justify-center"
        >
          <img 
            src="@/assets/ornamen/gunungan.png" 
            alt="Gunungan" 
            class="w-2/3 h-auto rounded-lg" 
          />
        </v-motion>
        <h1 class="text-3xl font-bold mb-4 font-great-vibes">Undangan Pernikahan</h1>
        <h5 class="text-2xl font-bold mb-4 font-dancing-script">Dinna <Icon name="fxemoji:blackheartsuit" /> Fendy</h5>
        <h5 class="text-1xl font-bold mb-4 font-dancing-script">22 • 12 • 2024</h5>
        <p class="text-xl mb-6 font-dancing-script">Kepada Yth, <span class="font-bold font-dancing-script">{{ recipientName }}</span></p>
        
        <!-- Tombol Buka Undangan dengan Animasi -->
        <v-motion 
          :initial="{ opacity: 0, scale: 0.9 }"
          :enter="{ opacity: 1, scale: 1 }"
          transition="{ delay: 0.4, duration: 0.3 }"
        >
          <button 
            @click="openInvitation" 
            class="bg-[#C7A07A] text-white px-4 py-2 rounded-lg hover:bg-[#734128] font-bold"
          >
            Buka Undangan
          </button>
        </v-motion>
      </div>
    </v-motion>

    <!-- Audio Element -->
    <audio ref="audio" :src="audioSrc" preload="auto"></audio>

    <!-- Bubble Button for Play/Stop with Animasi -->
    <v-motion
      :initial="{ opacity: 0, scale: 0.8 }"
      :enter="{ opacity: 1, scale: 1 }"
      transition="{ delay: 0.5, duration: 0.3 }"
      class="bubble-button"
    >
      <button @click="togglePlay">
        {{ isPlaying ? "Stop" : "Play" }}
      </button>
    </v-motion>

    <!-- Sections Content with Animasi -->
    <v-motion v-if="invitationOpened" :initial="{ opacity: 0 }" :enter="{ opacity: 1 }" transition="{ duration: 0.5 }">
      <About id="about-us" />
      <AddressDate />
      <Gallery />
      <Wishes />
      <!-- <Doa /> -->
      <ThankYou />
      <Footer />
    </v-motion>
  </div>
</template>

<script>
import audioFile from "@/assets/audio/PurityJavaneseGamelan.mp3";
import About from '../components/Wedding/About.vue';
import AddressDate from '../components/Wedding/AddressDate.vue';
import Gallery from '../components/Wedding/Gallery.vue';
import Wishes from '../components/Wedding/Wishes.vue';
import Doa from '../components/Wedding/Doa.vue';
import ThankYou from '../components/Wedding/ThankYou.vue';
import Footer from '../components/Wedding/Footer.vue';

export default {
  components: {
    About,
    AddressDate,
    Gallery,
    Wishes,
    Doa,
    ThankYou,
    Footer,
  },
  data() {
    return {
      recipientName: '',
      audioSrc: audioFile,
      invitationOpened: false,
      isPlaying: false,
    };
  },
  mounted() {
    if (process.client) {
      this.recipientName = this.$route.query.name || 'Guest';
      if (!this.invitationOpened) {
        document.body.classList.add('no-scroll');
      }
    }
  },
  methods: {
    openInvitation() {
      this.invitationOpened = true;
      this.playMusic();
      if (process.client) {
        document.body.classList.remove('no-scroll');
        const aboutSection = document.getElementById('about-us');
        if (aboutSection) {
          aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    },
    playMusic() {
      const audio = this.$refs.audio;
      audio.play()
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
      this.isPlaying ? this.stopMusic() : this.playMusic();
    },
  },
};
</script>

<style scoped>
html, body {
  margin: 0;
  padding: 0;
  font-family: 'Arial', sans-serif;
}

.no-scroll {
  overflow: hidden;
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
  z-index: 9999;
}

.bubble-button:hover {
  background-color: #734128;
}

/* Terapkan font Dancing Script pada kelas font-dancing-script */
.font-dancing-script {
  font-family: 'Dancing Script', cursive;
}

/* Terapkan font Great Vibes pada kelas font-great-vibes */
.font-great-vibes {
  font-family: 'Great Vibes', cursive;
}
</style>
