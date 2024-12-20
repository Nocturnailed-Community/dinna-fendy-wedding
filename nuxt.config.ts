// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
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
