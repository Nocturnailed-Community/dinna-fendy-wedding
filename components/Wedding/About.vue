<template>
  <div id="about-us" class="min-h-screen flex flex-col items-center justify-center p-10 relative">
    <div class="z-10 max-w-3xl w-full text-center">
      <Motion is="p" preset="slideVisibleTop">
        <h2 class="text-3xl font-bold mb-6">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم</h2>
        <p class="text-xl mb-8">Assalamualaikum Warahmatullahi Wabarakatuh</p>
        <p class="text-xl mb-8">
          Dengan memohon Rahmat dan Ridho Illahi, teriring niat menjalankan Sunnah Rasulullah ﷺ untuk membentuk rumah tangga yang 
          Sakinah, Mawaddah wa Rahmah, kami mohon do'a agar senantiasa diberikan kelancaran dan keberkahan.
        </p>
      </Motion>

      <!-- Image Above Names -->
      <Motion is="p" preset="slideVisibleTop">
        <div class="mb-8 flex justify-center overflow-hidden relative w-full h-64">
            <img src="@/assets/images/profile/profile.jpeg" alt="Profile" class="zoom-image w-full h-full object-cover rounded-full" loading="lazy" />
          </div>
      </Motion>

      <!-- Ayat Al-Quran -->
      <Motion is="p" preset="slideVisibleTop">
        <div class="text-center z-10 mb-8">
          <p class="text-lg italic">
            "Di antara tanda-tanda (kebesaran)-Nya ialah bahwa Dia menciptakan pasangan-pasangan untukmu dari (jenis) dirimu sendiri 
            agar kamu merasa tenteram kepadanya. Dia menjadikan di antaramu rasa cinta dan kasih sayang. Sesungguhnya pada yang demikian 
            itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir."
          </p>
          <strong class="text-lg block mt-2">Ar-Rum · Ayat 21</strong>
        </div>
      </Motion>

      <!-- Foto Pengantin -->
      <div class="flex flex-col md:flex-row items-center justify-center gap-10 mb-8">
        <!-- Foto Pengantin Wanita -->
        <Motion is="p" preset="slideVisibleLeft">
          <div class="relative w-50 h-50 overflow-hidden">
            <img src="@/assets/images/profile/dinna.png" alt="Dinna Fauziah" class="zoom-image w-full h-full object-cover" loading="lazy" />
            <div class="text-black">
              <h3 class="text-2xl font-bold mb-2 font-dancing-script">Dinna Fauziah</h3>
              <p class="text-lg mb-6">Putri dari Bapak Sardi dan Ibu Katiyem</p>
            </div>
          </div>
        </Motion>

        <!-- Ikon Love -->
        <Motion is="p" preset="slideVisibleTop">
          <div class="text-5xl text-black font-dancing-script">
            &amp;
          </div>
        </Motion>

        <!-- Foto Pengantin Pria -->
        <Motion is="p" preset="slideVisibleRight">
          <div class="relative w-50 h-50 overflow-hidden">
            <img src="@/assets/images/profile/fendy.png" alt="Syafei Dwiyoga Arifendy" class="zoom-image w-full h-full object-cover" loading="lazy" />
            <!-- Nama Pengantin -->
            <div class="text-black">
              <h3 class="text-2xl font-bold mb-2 font-dancing-script">Syafei Dwiyoga Arifendy</h3>
              <p class="text-lg">Putra dari Bapak Agus Triyono dan Ibu Suminah</p>
            </div>
          </div>
        </Motion>
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

/* Terapkan font Dancing Script pada kelas font-dancing-script */
.font-dancing-script {
  font-family: 'Dancing Script', cursive;
}

/* Styling untuk Motion */
.motion-container {
  display: inline-block; /* Agar elemen tidak mempengaruhi tata letak */
  transform-origin: center; /* Menjaga elemen tetap terpusat selama animasi */
}

/* Efek untuk motion-slideVisibleTop */
.motion-slideVisibleTop {
  animation: slideUp 0.5s ease-out forwards;
}

@keyframes slideUp {
  0% {
    transform: translateY(20px); /* Mulai dari bawah */
    opacity: 0; /* Mulai dengan transparansi */
  }
  100% {
    transform: translateY(0); /* Kembali ke posisi normal */
    opacity: 1; /* Menjadi sepenuhnya terlihat */
  }
}

/* Efek untuk motion-slideVisibleLeft */
.motion-slideVisibleLeft {
  animation: slideLeft 0.5s ease-out forwards;
}

@keyframes slideLeft {
  0% {
    transform: translateX(-20px); /* Mulai dari kiri */
    opacity: 0; /* Mulai dengan transparansi */
  }
  100% {
    transform: translateX(0); /* Kembali ke posisi normal */
    opacity: 1; /* Menjadi sepenuhnya terlihat */
  }
}

/* Efek untuk motion-slideVisibleRight */
.motion-slideVisibleRight {
  animation: slideRight 0.5s ease-out forwards;
}

@keyframes slideRight {
  0% {
    transform: translateX(20px); /* Mulai dari kanan */
    opacity: 0; /* Mulai dengan transparansi */
  }
  100% {
    transform: translateX(0); /* Kembali ke posisi normal */
    opacity: 1; /* Menjadi sepenuhnya terlihat */
  }
}
</style>
