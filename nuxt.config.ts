// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "Dinna & Fendy's Wedding Invitation by Nocturnailed",
      meta: [
        {
          hid: "og:title",
          property: "og:title",
          content: "Dinna & Fendy's Wedding Invitation by Nocturnailed",
        },
        {
          hid: "og:description",
          property: "og:description",
          content:
            "Join us to celebrate the wedding of Dinna and Fendy on December 22th, 2024. Tap to view more details.",
        },
        {
          hid: "og:image",
          property: "og:image",
          content: "https://dinna-fendy.nocturnailed.com/og-image.jpg",
        },
        {
          hid: "og:url",
          property: "og:url",
          content: process.env.NODE_ENV === "https://dinna-fendy.nocturnailed.com/",
        },
        {
          hid: "twitter:card",
          name: "twitter:card",
          content: "summary_large_image",
        },
      ],
    },
  },
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  postcss: {
    plugins: {
      tailwindcss: {
        darkMode: 'class',
      },
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000',
    public: {
      EMOJIS_KEY: process.env.EMOJIS_KEY, // Pastikan variabel tersedia untuk client-side
      motion: {
        directives: {
          'pop-bottom': {
            initial: {
              scale: 0,
              opacity: 0,
              y: 100,
            },
            visible: {
              scale: 1,
              opacity: 1,
              y: 0,
            }
          }
        }
      }
    }
  },
  googleFonts: {
    families: {
      'Great+Vibes': true,
      'Playfair+Display': true,
    },
  },
  css: [
    '@/assets/css/tailwind.css', // Import Tailwind CSS globally
    'leaflet/dist/leaflet.css', // Import Leaflet CSS globally
  ],
  modules: ['@nuxtjs/tailwindcss', 'nuxt-icon', '@vueuse/motion/nuxt', '@nuxtjs/google-fonts'],
})
