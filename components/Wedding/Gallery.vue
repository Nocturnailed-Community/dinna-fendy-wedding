<template>
  <div id="gallery" class="min-h-screen flex flex-col items-center justify-center p-10 relative">
    <div class="z-10 w-full max-w-5xl">
      <!-- Judul Galeri -->
      <h2 class="text-3xl font-bold mb-8 text-center font-great-vibes">Capture Moments</h2>

      <!-- Custom Image Gallery -->
      <div class="relative">
        <!-- Image Slider -->
        <div class="overflow-hidden relative" style="max-width: 100%; width: 100%; height: 100%;">
          <!-- Display Images -->
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
                class="w-full h-auto object-cover rounded-full"
                loading="lazy"
              />
            </div>
          </div>

          <!-- Navigation Arrows -->
          <button
            @click="prevSlide"
            class="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
          >
            &#8592;
          </button>
          <button
            @click="nextSlide"
            class="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
          >
            &#8594;
          </button>
        </div>

        <!-- Pagination Dots -->
        <!-- <div class="absolute bottom-4 w-full text-center">
          <span
            v-for="(image, index) in images"
            :key="index"
            @click="goToSlide(index)"
            class="inline-block mx-1 cursor-pointer w-3 h-3 rounded-full bg-white opacity-50 hover:opacity-75"
            :class="{ 'bg-opacity-100': currentIndex === index }"
          ></span>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// Import images statically to ensure paths are resolved correctly
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
const currentIndex = ref(0);

// Function to go to the previous slide
const prevSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + images.length) % images.length;
};

// Function to go to the next slide
const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % images.length;
};

// Function to go to a specific slide
const goToSlide = (index) => {
  currentIndex.value = index;
};

// Automatically slide after 3 seconds
onMounted(() => {
  setInterval(() => {
    if (currentIndex.value === 0) {
      currentIndex.value = 1; // Start sliding after the first set of images
    } else {
      nextSlide(); // Move to the next slide
    }
  }, 3000); // Change slide every 3 seconds
});
</script>

<style scoped>
/* Styling for the custom gallery */
#gallery {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

/* Flex display for the images to make them responsive */
.flex {
  display: flex;
  flex-wrap: nowrap;
}

.flex img {
  width: 100%;
  height: auto;
  object-fit: cover;
}

/* Styling for navigation buttons */
button {
  font-size: 1.5rem;
  background: rgba(0, 0, 0, 0.6);
  border: none;
  color: white;
  cursor: pointer;
}

button:hover {
  background: rgba(0, 0, 0, 0.8);
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

/* Terapkan font Great Vibes pada kelas font-great-vibes */
.font-great-vibes {
  font-family: 'Great Vibes', cursive;
}

/* Terapkan font Dancing Script pada kelas font-dancing-script */
.font-dancing-script {
  font-family: 'Dancing Script', cursive;
}
</style>