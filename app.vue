<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const baseUrl = ref("http://localhost:3000");

onMounted(() => {
  baseUrl.value = window.location.origin; // Ambil URL global saat mounted
});

useHead({
  title: "Dinna & Fendy's Wedding Invitation by Nocturnailed",
  meta: [
    {
      property: "og:title",
      content: "Dinna & Fendy's Wedding Invitation",
    },
    {
      property: "og:description",
      content: "Join us to celebrate the wedding of Dinna and Fendy on December 22th, 2024. Tap to view more details.",
    },
    {
      property: "og:image",
      content: `https://dinna-fendy.nocturnailed.com/og-image.jpeg`, // URL dinamis
      // content: `${baseUrl.value}/og-image.jpeg`, // URL dinamis
    },
    {
      property: "og:url",
      content: `https://dinna-fendy.nocturnailed.com/`, // URL dinamis
      // content: `${baseUrl.value}/`, // URL dinamis
    },
  ],
});
</script>