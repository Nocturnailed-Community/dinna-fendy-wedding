<template>
  <div id="thank-you" class="min-h-screen flex items-center justify-center p-10 relative">

    <!-- Main Content -->
    <Motion is="p" preset="slideVisibleTop">
    <div class="shadow-lg rounded-lg p-8 z-20">
      <div class="text-center">
        <!-- <h2 class="text-3xl font-bold mb-4">Terima Kasih</h2> -->
        <p class="text-xl mb-3">Menjadi sebuah kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dalam hari bahagia ini. Terima kasih atas segala ucapan, doa, dan perhatian yang diberikan.</p>
        <h5 class="text-2xl font-bold mb-4 font-dancing-script">Dinna <Icon name="fxemoji:blackheartsuit" /> Fendy</h5>
        <!-- <p class="text-xl">Wassalamualaikum Warahmatullahi Wabarakatuh.</p> -->
      </div>
    </div>
    </Motion>
  </div>
</template>

<script setup>
// You can import components or handle logic here if needed
</script>

<style scoped>
/* Additional custom styles for the background image */
#thank-you {
  position: relative;
  min-height: 100vh;
}

/* To make sure content is always on top */
#thank-you .bg-white {
  position: relative;
  z-index: 10;
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
