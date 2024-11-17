<template>
  <div class="overflow-x-auto">
    <!-- Background Gambar Jejak Sandal untuk Desktop (PC) -->
    <div class="hidden md:block fixed inset-0 -z-10 pointer-events-none">
      <img
        src="@/assets/ornamen/jejak-sandal.png"
        alt="Jejak Sandal"
        class="absolute object-cover w-full h-full opacity-100"
      />

      <!-- Background Image (Ornamen Jawa Klasik) -->
      <img
        src="@/assets/ornamen/jawa-klasik.png"
        alt="Jawa Klasik"
        class="absolute object-cover w-full h-full opacity-70 z-0"
      />

      <!-- Image Slider -->
      <div class="overflow-hidden relative w-full h-full">
        <div
          class="flex transition-transform duration-500 ease-in-out"
          :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
        >
          <!-- Loop over images -->
          <div
            v-for="(image, index) in images"
            :key="index"
            class="w-full flex-shrink-0"
          >
            <img
              :src="image"
              alt="Gallery Photo"
              class="absolute object-cover w-full h-full opacity-30 z-10"
              style="object-fit: cover; object-position: center; height: 100vh"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Background Gambar Jejak Sandal untuk Mobile (HP) -->
    <div class="block md:hidden fixed inset-0 -z-10 pointer-events-none bg-gray-200">
      <!-- Background Image (Ornamen Jawa Klasik) -->
      <img
        src="@/assets/ornamen/jawa-klasik.png"
        alt="Jawa Klasik"
        class="absolute object-cover w-full h-full opacity-70 z-0"
      />

      <!-- Image Slider -->
      <div class="overflow-hidden relative w-full h-full">
        <div
          class="flex transition-transform duration-500 ease-in-out"
          :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
        >
          <!-- Loop over images -->
          <div
            v-for="(image, index) in images"
            :key="index"
            class="w-full flex-shrink-0"
          >
            <img
              :src="image"
              alt="Gallery Photo"
              class="absolute object-cover w-full h-full opacity-30 z-10"
              style="object-fit: cover; object-position: center; height: 120vh"
              loading="lazy"
            />
          </div>
        </div>
      </div>
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
        <h1 class="text-3xl font-bold mb-4 font-great-vibes">
          Undangan Pernikahan
        </h1>
        <h3 class="text-2xl font-bold mb-4 font-dancing-script">
          Dinna & Fendy
        </h3>
        <h4 class="text-2xl font-bold mb-4 font-dancing-script">
          22 • 12 • 2024
        </h4>
        <Countdown />
        <p class="text-xl mb-6 font-dancing-script">
          Kepada Yth,
          <span class="font-bold font-dancing-script">{{ recipientName }}</span>
        </p>

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
      <button @click="togglePlay" class="flex items-center justify-center p-2">
        <Icon
          :name="
            isPlaying
              ? 'material-symbols:pause-circle-outline'
              : 'material-symbols:play-circle-outline'
          "
          class="text-4xl"
        />
      </button>
    </v-motion>

    <!-- Sections Content with Animasi -->
    <v-motion
      v-if="invitationOpened"
      :initial="{ opacity: 0 }"
      :enter="{ opacity: 1 }"
      transition="{ duration: 0.5 }"
    >
      <About id="about-us" />
      <AddressDate />
      <Gallery />
      <AccountNumber />
      <Wishes />
      <ThankYou />
      <Footer />
    </v-motion>
  </div>
</template>

<script>
import audioFile from "@/assets/audio/PurityJavaneseGamelan.mp3";
import About from "../components/Wedding/About.vue";
import AddressDate from "../components/Wedding/AddressDate.vue";
import Countdown from "../components/Wedding/Countdown.vue";
import Gallery from "../components/Wedding/Gallery.vue";
import Wishes from "../components/Wedding/Wishes.vue";
import AccountNumber from "../components/Wedding/AccountNumber.vue";
import ThankYou from "../components/Wedding/ThankYou.vue";
import Footer from "../components/Wedding/Footer.vue";

export default {
  components: {
    About,
    AddressDate,
    Countdown,
    Gallery,
    Wishes,
    AccountNumber,
    ThankYou,
    Footer,
  },
  data() {
    return {
      recipientName: "",
      audioSrc: audioFile,
      invitationOpened: false,
      isPlaying: false,
    };
  },
  mounted() {
    if (process.client) {
      this.recipientName = this.$route.query.name || "Guest";
      if (!this.invitationOpened) {
        document.body.classList.add("no-scroll");
      }
    }
  },
  methods: {
    openInvitation() {
      this.invitationOpened = true;
      this.playMusic();

      if (process.client) {
        document.body.classList.remove("no-scroll");

        // Gunakan Vue.nextTick untuk memastikan elemen dirender terlebih dahulu
        this.$nextTick(() => {
          const aboutSection = document.getElementById("about-us");
          if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: "smooth" });
          }
        });
      }
    },
    playMusic() {
      const audio = this.$refs.audio;
      audio
        .play()
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

<script setup>
import { ref, onMounted } from "vue";

// Import images statically to ensure paths are resolved correctly
import img1 from "@/assets/images/gallery/images (1).jpeg";
import img2 from "@/assets/images/gallery/images (2).jpeg";
import img3 from "@/assets/images/gallery/images (3).jpeg";
import img4 from "@/assets/images/gallery/images (4).jpeg";
import img5 from "@/assets/images/gallery/images (5).jpeg";
import img6 from "@/assets/images/gallery/images (6).jpeg";
import img7 from "@/assets/images/gallery/images (7).jpeg";
import img8 from "@/assets/images/gallery/images (8).jpeg";
import img9 from "@/assets/images/gallery/images (9).jpeg";

const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9];
const currentIndex = ref(0);

// Function to go to a specific slide
const goToSlide = (index) => {
  currentIndex.value = index;
};

// Automatically slide after 5 seconds
onMounted(() => {
  setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % images.length;
  }, 5000); // Change slide every 5 seconds
});
</script>

<style scoped>
.no-scroll {
  overflow: hidden;
}

.bubble-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 50px; /* Set width */
  height: 50px; /* Set height */
  background-color: #c7a07a;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 20px;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s ease;
  z-index: 9999;
  max-width: 50px; /* Ensure the width doesn't exceed the size */
  max-height: 50px; /* Ensure the height doesn't exceed the size */
  overflow: hidden; /* Prevent any content from spilling out */
}
.bubble-button:hover {
  background-color: #734128;
}

/* Styling for the custom gallery */
#gallery {
  position: relative;
  min-height: 100vh;
  /* display: flex; */
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

/* Pagination dots */
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}

.pagination span {
  width: 12px;
  height: 12px;
  margin: 0 5px;
  border-radius: 50%;
  background-color: white;
  opacity: 0.6;
}

.pagination span.active {
  background-color: #000;
  opacity: 1;
}

/* Terapkan font Dancing Script pada kelas font-dancing-script */
.font-dancing-script {
  font-family: "Dancing Script", cursive;
}

/* Terapkan font Great Vibes pada kelas font-great-vibes */
.font-great-vibes {
  font-family: "Great Vibes", cursive;
}
</style>
