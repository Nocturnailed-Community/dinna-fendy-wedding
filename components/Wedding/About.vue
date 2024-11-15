<template>
  <div id="about-us" class="min-h-screen flex flex-col items-center justify-center p-10 relative">
    <div class="z-10 max-w-3xl w-full text-center">
      <h2 class="text-3xl font-bold mb-6">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم</h2>
      <p class="text-xl mb-8">Assalamualaikum Warahmatullahi Wabarakatuh</p>
      <p class="text-xl mb-8">
        Dengan memohon Rahmat dan Ridho Illahi, teriring niat menjalankan Sunnah Rasulullah ﷺ untuk membentuk rumah tangga yang 
        Sakinah, Mawaddah wa Rahmah, kami mohon do'a agar senantiasa diberikan kelancaran dan keberkahan.
      </p>
      <!-- Image Above Names -->
      <div class="mb-8 flex justify-center overflow-hidden relative w-full h-64">
          <img src="@/assets/images/profile/profile.jpeg" alt="Profile" class="zoom-image w-full h-full object-cover rounded-full" loading="lazy" />
        </div>
      <!-- Ayat Al-Quran -->
      <div class="text-center z-10 mb-8">
        <p class="text-lg italic">
          "Di antara tanda-tanda (kebesaran)-Nya ialah bahwa Dia menciptakan pasangan-pasangan untukmu dari (jenis) dirimu sendiri 
          agar kamu merasa tenteram kepadanya. Dia menjadikan di antaramu rasa cinta dan kasih sayang. Sesungguhnya pada yang demikian 
          itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir."
        </p>
        <strong class="text-lg block mt-2">Ar-Rum · Ayat 21</strong>
      </div>

      <!-- Foto Pengantin -->
      <div class="flex flex-col md:flex-row items-center justify-center gap-10 mb-8">
        <!-- Foto Pengantin Wanita -->
        <div class="relative w-48 h-48 overflow-hidden rounded-full">
          <img src="@/assets/images/profile/dinna.png" alt="Dinna Fauziah" class="zoom-image w-full h-full object-cover" loading="lazy" />
        </div>

        <div class="text-black">
          <h3 class="text-2xl font-bold mb-2">Dinna Fauziah</h3>
          <p class="text-lg mb-6">Putri dari Bapak Sardi dan Ibu Katiyem</p>
        </div>

        <!-- Ikon Love -->
        <div class="text-5xl text-black">
          <Icon name="fxemoji:blackheartsuit" />
        </div>

        <!-- Foto Pengantin Pria -->
        <div class="relative w-48 h-48 overflow-hidden rounded-full">
          <img src="@/assets/images/profile/fendy.png" alt="Syafei Dwiyoga Arifendy" class="zoom-image w-full h-full object-cover" loading="lazy" />
        </div>
      </div>

      <!-- Nama Pengantin -->
      <div class="text-black">
        <h3 class="text-2xl font-bold mb-2">Syafei Dwiyoga Arifendy</h3>
        <p class="text-lg">Putra dari Bapak Agus Triyono dan Ibu Suminah</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Zoom dan crop gambar */
.zoom-image {
  object-fit: cover;        /* Mengisi elemen tanpa merusak proporsi gambar */
  object-position: center;  /* Fokuskan pada bagian tengah gambar */
  transition: transform 0.5s ease; /* Transisi halus untuk zoom */
}

.zoom-image:hover {
  transform: scale(1.1); /* Zoom-in saat hover */
}
</style>
