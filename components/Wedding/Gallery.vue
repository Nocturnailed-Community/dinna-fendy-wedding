<template>
  <div id="gallery" class="min-h-screen flex flex-col items-center justify-center p-10">
    <div class="w-full max-w-5xl">
      <!-- Judul Galeri -->
      <h2 class="text-3xl font-bold mb-8 text-center font-great-vibes">Capture Moments</h2>

      <!-- Display All Images in a Grid Layout -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <!-- Loop over images and display each one -->
        <div
          v-for="(image, index) in images"
          :key="index"
          class="w-full"
        >
          <img
            :src="image"
            alt="Gallery Photo"
            class="w-full h-auto object-cover rounded-lg"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import img1 from '@/assets/images/gallery/images (1).jpeg';
import img2 from '@/assets/images/gallery/images (2).jpeg';
import img3 from '@/assets/images/gallery/images (3).jpeg';
import img4 from '@/assets/images/gallery/images (4).jpeg';
import img5 from '@/assets/images/gallery/images (5).jpeg';
import img6 from '@/assets/images/gallery/images (6).jpeg';
import img7 from '@/assets/images/gallery/images (7).jpeg';
import img8 from '@/assets/images/gallery/images (8).jpeg';
import img9 from '@/assets/images/gallery/images (9).jpeg';

const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9];
</script>

<style scoped>
#gallery {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.grid {
  display: grid;
  gap: 1.5rem;
}

.font-great-vibes {
  font-family: 'Great Vibes', cursive;
}
</style>
