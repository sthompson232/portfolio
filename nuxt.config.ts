import glsl from 'vite-plugin-glsl';

const TITLE = 'Netlio';
const URL = 'netlio-vue.netlify.app';
const DESCRIPTION = 'This is the description';
const THEME = '#ff0000';

const SITE_CODE = 'netlio';
const API_URL = 'https://api.netl.io'

const PAGES = [
  { name: 'Home', href: '/' },
  { name: 'Three', href: '/three' },
  { name: 'OGL', href: '/ogl' },
  { name: 'Images', href: '/images' },
];

const FACEBOOK = '#';
const INSTAGRAM = '#'
const TWITTER = '#';
const LINKEDIN = '#';
const YOUTUBE = '#';
const TIKTOK='#';
const THREADS='#';
const PINTEREST='#';
const WEBSITE='#';

export default defineNuxtConfig({
  app: {
    head: {
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'charset', content: 'utf-81' },
        { name: 'theme-color', content: THEME },
        { name: 'description', content: DESCRIPTION },

        { name: 'og:locale', content: 'en_GB' },
        { name: 'og:image', content: '/og.png' },
        { name: 'og:image:width', content: '1200' },
        { name: 'og:image:height', content: '630' },

        { hid: "twitter:title", name: "twitter:title", content: TITLE },
        { hid: "twitter:url", name: "twitter:url", content: `https://${URL}` },
        { hid: 'twitter:description', name: 'twitter:description', content: DESCRIPTION },
        { hid: "twitter:image", name: "twitter:image", content: '/og.png' },
      ],
      link: [
        { rel: 'apple-touch-icon', type: 'image/png', sizes: '180x180', href: '/icons/apple-touch-icon.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap' },
      ],
    },
  },

  runtimeConfig: {
    public: {
      title: TITLE,
      description: DESCRIPTION,
      url: URL,
      theme: THEME,
      pages: PAGES,
      site_code: SITE_CODE,
      api_url: API_URL,
      socials: {
        facebook: FACEBOOK,
        twitter: TWITTER,
        instagram: INSTAGRAM,
        linkedin: LINKEDIN,
        youtube: YOUTUBE,
        tiktok: TIKTOK,
        threads: THREADS,
        pinterest: PINTEREST,
        website: WEBSITE,
      }
    },
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/'],
    },
  },

  devtools: { enabled: true },

  build: {
    transpile: ['gsap'],
  },

  css: ['~/assets/css/main.css'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  devServer: {
    port: 3000,
    host: "127.0.0.1",
  },

  modules: [
    '@nuxt/eslint',
    '@nuxtjs/seo',
  ],

  vite: {
    plugins: [
      glsl(),
    ],
  },

  typescript: {
    strict: false,
  },

  compatibilityDate: '2024-07-31'
})