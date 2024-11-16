<template>
  <div id="gallery" class="min-h-screen flex flex-col items-center justify-center p-10">
    <div class="w-full max-w-5xl">
      <!-- Judul Galeri -->
      <Motion is="p" preset="slideVisibleTop">
        <h2 class="text-3xl font-bold mb-8 text-center font-great-vibes">Capture Moments</h2>
      </Motion>
      <!-- Display All Images in a Grid Layout -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <!-- Loop over images and display each one -->
        <div
          v-for="(image, index) in images"
          :key="index"
          :class="['w-full', `v-motion-roll-top-${index}`]"
          @click="openPreview(image)"
          class="cursor-pointer"
        >
        <Motion is="p" preset="slideVisibleTop">
          <img
            :src="image"
            alt="Gallery Photo"
            class="w-full h-auto object-cover rounded-lg"
            loading="lazy"
          />
        </Motion>
        </div>
      </div>
    </div>

    <!-- Modal Preview -->
    <div 
      v-if="previewImage" 
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
      @click="closePreview"  
    >
      <!-- Prevent clicking on the image from closing the modal -->
      <div 
        class="relative w-11/12 max-w-4xl" 
        @click.stop
      >
        <button
          @click="closePreview"
          class="absolute top-3 right-3 bg-white text-black rounded-full p-2 hover:bg-gray-300"
        >
          ✕
        </button>
        <img :src="previewImage" alt="Preview" class="w-full h-auto rounded-lg" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Import Images
import img1 from "@/assets/images/gallery/images (1).jpeg";
import img2 from "@/assets/images/gallery/images (2).jpeg";
import img3 from "@/assets/images/gallery/images (3).jpeg";
import img4 from "@/assets/images/gallery/images (4).jpeg";
import img5 from "@/assets/images/gallery/images (5).jpeg";
import img6 from "@/assets/images/gallery/images (6).jpeg";
import img7 from "@/assets/images/gallery/images (7).jpeg";
import img8 from "@/assets/images/gallery/images (8).jpeg";
import img9 from "@/assets/images/gallery/images (9).jpeg";

// Daftar gambar
const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9];

// State untuk preview image
const previewImage = ref(null);

// Function untuk membuka preview
const openPreview = (image) => {
  previewImage.value = image;
};

// Function untuk menutup preview
const closePreview = () => {
  previewImage.value = null;
};
</script>

<style scoped>
/* CSS untuk animasi */
@keyframes rollTop {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Tambahkan kelas untuk setiap gambar */
.v-motion-roll-top-0 {
  animation: rollTop 0.5s ease-out forwards;
  animation-delay: 0.2s;
}
.v-motion-roll-top-1 {
  animation: rollTop 0.5s ease-out forwards;
  animation-delay: 0.4s;
}
.v-motion-roll-top-2 {
  animation: rollTop 0.5s ease-out forwards;
  animation-delay: 0.6s;
}
.v-motion-roll-top-3 {
  animation: rollTop 0.5s ease-out forwards;
  animation-delay: 0.8s;
}
.v-motion-roll-top-4 {
  animation: rollTop 0.5s ease-out forwards;
  animation-delay: 1s;
}
.v-motion-roll-top-5 {
  animation: rollTop 0.5s ease-out forwards;
  animation-delay: 1.2s;
}
.v-motion-roll-top-6 {
  animation: rollTop 0.5s ease-out forwards;
  animation-delay: 1.4s;
}
.v-motion-roll-top-7 {
  animation: rollTop 0.5s ease-out forwards;
  animation-delay: 1.6s;
}
.v-motion-roll-top-8 {
  animation: rollTop 0.5s ease-out forwards;
  animation-delay: 1.8s;
}

/* Style Modal */
.fixed {
  background: rgba(0, 0, 0, 0.75);
}
.cursor-pointer {
  cursor: pointer;
}

/* Prevent closing modal when clicking the image */
.relative {
  cursor: pointer;
}

/* Terapkan font Great Vibes pada kelas font-great-vibes */
.font-great-vibes {
  font-family: 'Great Vibes', cursive;
}
</style>
