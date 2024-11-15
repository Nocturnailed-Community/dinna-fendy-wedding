<template>
  <div id="about-us" class="min-h-screen flex items-center justify-center p-10 relative">
    <div class="z-10 max-w-3xl w-full">
      <!-- Card Container -->
      <div class="rounded-lg p-8">
        <h2 class="text-3xl font-bold mb-6 text-center">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم</h2>
        <p class="text-xl mb-8 text-center">Assalamualaikum Warahmatullahi Wabarakatuh</p>
        <p class="text-xl mb-8 text-center">Dengan memohon Rahmat dan Ridho Illahi, teriring niat menjalankan Sunnah Rasulullah ﷺ untuk membentuk rumah tangga yang Sakinah, Mawaddah wa Rahmah, kami mohon do'a agar senantiasa diberikan kelancaran dan keberkahan.</p>
        
        <!-- Image Above Names -->
        <div class="mb-8 flex justify-center overflow-hidden relative w-full h-64">
          <img src="@/assets/images/profile/profile.jpeg" alt="Profile" class="zoom-image w-full h-full object-cover rounded-full" loading="lazy" />
        </div>
        <div class="text-center z-10 mb-5">
            <p class="text-lg">"Di antara tanda-tanda (kebesaran)-Nya ialah bahwa Dia menciptakan pasangan-pasangan untukmu dari (jenis) dirimu sendiri agar kamu merasa tenteram kepadanya. Dia menjadikan di antaramu rasa cinta dan kasih sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir."</p>
            <strong class="text-lg">Ar-Rum · Ayat 21</strong>
          </div>

        <!-- Kontainer untuk nama pengantin dengan card -->
        <div class="flex flex-col md:flex-row items-center justify-center mb-8 space-y-4 md:space-y-0 md:space-x-4">
          <!-- Nama Pengantin Wanita -->
          <div class="bg-brown-800 p-6 rounded-lg text-center shadow-md flex flex-col items-center justify-center w-full md:w-64 h-64">
            <div>
              <h3 class="text-2xl font-bold mb-2 text-white font-dancing-script">Dinna Fauziah</h3>
              <p class="text-white">Putri dari Bapak Sardi dan Ibu Katiyem</p>
            </div>
          </div>

          <!-- Ikon Love di tengah -->
          <div class="mx-4 flex items-center justify-center">
            <Icon name="fxemoji:blackheartsuit" class="text-5xl" />
          </div>

          <!-- Nama Pengantin Pria -->
          <div class="bg-brown-800 p-6 rounded-lg text-center shadow-md flex flex-col items-center justify-center w-full md:w-64 h-64">
            <div>
              <h3 class="text-2xl font-bold mb-2 text-white font-dancing-script">Syafei Dwiyoga Arifendy</h3>
              <p class="text-white">Putra dari Bapak Agus Triyono dan Ibu Suminah</p>
            </div>
          </div>
        </div>

        <!-- <p class="text-lg text-center text-brown-800">Kami sangat menantikan kehadiran dan doa restu dari Anda pada hari bahagia kami.</p> -->
      </div>
    </div>
  </div>
</template>

<style scoped>
  /* Tailwind class untuk warna cokelat */
.bg-brown-800 {
  background-color: #6B4F3A; /* Cokelat Tua */
}
.text-brown-800 {
  color: #6B4F3A; /* Cokelat Tua */
}

/* Terapkan font Dancing Script pada kelas font-dancing-script */
.font-dancing-script {
  font-family: 'Dancing Script', cursive;
}

/* CSS untuk zoom dan crop gambar */
.zoom-image {
  object-fit: cover;        /* Mengisi elemen tanpa merusak proporsi gambar */
  object-position: center;  /* Fokuskan pada bagian tengah gambar */
  transition: transform 0.5s ease; /* Menambahkan transisi halus saat zoom */
}

.zoom-image:hover {
  transform: scale(1.1); /* Zoom gambar saat hover */
}
</style>