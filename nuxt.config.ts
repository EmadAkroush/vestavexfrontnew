import * as path from "path";
// Wrong

export default defineNuxtConfig({
  modules: ["@primevue/nuxt-module"],
  css: [
    "@/assets/styles/tailwind.css",
    "@/assets/styles/base.css",
    "@mdi/font/css/materialdesignicons.min.css",
    'primevue/resources/primevue.min.css',
    'primevue/resources/themes/saga-blue/theme.css'
  ],

  build: {
  transpile: ['primevue'],
},

  
  primevue: {
    options: { theme: "none" },
  },
  site: {
    url: "http://localhost:3000",
    name: "VXBUSINESS",
  },

  app: {
    head: {
      title: "VXBUSINESS", // default fallback title
      htmlAttrs: {
        lang: "en",
      },
      link: [
        {
          rel: "icon",
          type: "image/x-icon",
          href: "./Photo_1747641514372-3.png",
        },
      ],
    },
  },

  runtimeConfig: {
    public: {
      apiBase: "http://localhost:3500",
    },
  },

  postcss: {
    plugins: {
      "postcss-import": {},
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
