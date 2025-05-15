// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: false },
  runtimeConfig: {
    public: {
      openweatherApiKey: process.env.OPENWEATHER_API_KEY,
    },
  },
  plugins: ["~/plugins/oh-vue-icons.ts"],
  build: {
    transpile: ["oh-vue-icons"],
  },
  vite: {
    optimizeDeps: {
      exclude: ["oh-vue-icons/icons"],
    },
    ssr: {
      noExternal: ["oh-vue-icons"],
    },
  },
  app: {
    head: {
      script: [
        {
          src: "https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js",
        },
        {
          src: "https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.clouds.min.js",
          defer: true,
        },
      ],
    },
  },
});
