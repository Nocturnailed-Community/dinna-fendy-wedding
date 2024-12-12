<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script>
export default {
  data() {
    return {
      eventTitle: "Dinna & Fendy's Wedding Invitation by Nocturnailed",
      eventDescription: "Join us to celebrate the wedding of Dinna and Fendy on December 22th, 2024. Tap to view more details.",
      eventImage: "https://dinna-fendy.nocturnailed.com/og-image.jpeg",
      eventURL: "https://dinna-fendy.nocturnailed.com/",
    };
  },
  computed: {
    metaTags() {
      return [
        {
          hid: "og:title",
          property: "og:title",
          content: this.eventTitle,
        },
        {
          hid: "og:description",
          property: "og:description",
          content: this.eventDescription,
        },
        {
          hid: "og:image",
          property: "og:image",
          content: this.eventImage,
        },
        {
          hid: "og:image:width",
          property: "og:image:width",
          content: "1200",
        },
        {
          hid: "og:image:height",
          property: "og:image:height",
          content: "630",
        },
        {
          hid: "og:url",
          property: "og:url",
          content: this.eventURL,
        },
        {
          hid: "og:image:type",
          property: "og:image:type",
          content: "image/jpeg",
        },
        {
          hid: "twitter:card",
          name: "twitter:card",
          content: "summary_large_image",
        },
        {
          hid: "twitter:title",
          name: "twitter:title",
          content: this.eventTitle,
        },
        {
          hid: "twitter:description",
          name: "twitter:description",
          content: this.eventDescription,
        },
        {
          hid: "twitter:image",
          name: "twitter:image",
          content: this.eventImage,
        },
      ];
    },
  },
  head() {
    return {
      title: this.eventTitle,
      meta: this.metaTags,
    };
  },
};
</script>