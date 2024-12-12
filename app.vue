<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script setup>
import { useRuntimeConfig } from "#app";

// Mengambil runtime config
const config = useRuntimeConfig();

// Data event
const eventTitle = "Dinna & Fendy's Wedding Invitation by Nocturnailed";
const eventDescription =
  "Join us to celebrate the wedding of Dinna and Fendy on December 22th, 2024. Tap to view more details.";

// Menggunakan baseURL dari konfigurasi atau default ke localhost
const baseURL = config.public?.baseURL || "https://dinna-fendy.nocturnailed.com";

// Data dinamis
const eventImage = `${baseURL}/og-image.jpeg`;
const eventURL = baseURL;

// Meta tags dinamis
useHead({
  title: eventTitle,
  meta: [
    { hid: "og:title", property: "og:title", content: eventTitle },
    { hid: "og:description", property: "og:description", content: eventDescription },
    { hid: "og:image", property: "og:image", content: eventImage },
    { hid: "og:image:width", property: "og:image:width", content: "1200" },
    { hid: "og:image:height", property: "og:image:height", content: "630" },
    { hid: "og:url", property: "og:url", content: eventURL },
    { hid: "og:image:type", property: "og:image:type", content: "image/jpeg" },
    { hid: "twitter:card", name: "twitter:card", content: "summary_large_image" },
    { hid: "twitter:title", name: "twitter:title", content: eventTitle },
    { hid: "twitter:description", name: "twitter:description", content: eventDescription },
    { hid: "twitter:image", name: "twitter:image", content: eventImage },
  ],
});
</script>