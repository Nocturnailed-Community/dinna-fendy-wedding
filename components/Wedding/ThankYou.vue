<template>
  <div id="thank-you" class="min-h-screen flex items-center justify-center bg-cover bg-center p-10 relative">
    
    <!-- Main Content -->
    <Motion is="p" preset="slideVisibleTop">
      <div class="shadow-lg rounded-lg p-8 z-20 w-full max-w-3xl text-center">
        <p class="text-xl mb-3">Menjadi sebuah kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dalam hari bahagia ini. Terima kasih atas segala ucapan, doa, dan perhatian yang diberikan.</p>
        <h5 class="text-2xl font-bold mb-4 font-dancing-script">Dinna & Fendy</h5>
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
  display: flex;
  align-items: center;
  justify-content: center;
}

/* To ensure content is always centered */
#thank-you .shadow-lg {
  max-width: 100%; /* Prevent it from expanding too much */
  width: 100%;
  padding: 2rem;
}

/* Font family applied */
.font-dancing-script {
  font-family: 'Dancing Script', cursive;
}

/* Customizing button and other UI elements (if any) */
button {
  cursor: pointer;
}

button:hover {
  transform: scale(1.05);
}
</style>
