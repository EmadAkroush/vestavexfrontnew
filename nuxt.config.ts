// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from "@primevue/themes/aura";

export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ["@nuxtjs/tailwindcss", "@primevue/nuxt-module", "nuxt-swiper", "@pinia/nuxt",  'pinia-plugin-persistedstate/nuxt' , '@nuxtjs/sitemap', ],

  // routeRules: {
  //   "/some-url": {
  //     // Temporary redirect using a 307 status code
  //     redirect: "https://nuxt.com/docs/guide/concepts/rendering#route-rules",
  //   },
  // },
  site: { 
    url: 'https://parsautoparts.ir', 
    name: 'vestavex' ,
    }, 
  
    app: {
      head: {
        title: 'vestavex', // default fallback title
        htmlAttrs: {
          lang: 'en',
        },
        link: [
          { rel: 'icon', type: 'image/x-icon', href: './logo.svg.png' },
        ]
      },
    },
  

  runtimeConfig: {
      public: {
          apiBase: 'https://parseback.liara.run'
      }
      
  },

  css: [
      '@mdi/font/css/materialdesignicons.min.css',
    ],

  primevue: {
      options: {
          theme: {
              preset: Aura,
          },
          ripple: true,
      },
      autoImport: true,
  },

  compatibilityDate: "2025-01-25",
});