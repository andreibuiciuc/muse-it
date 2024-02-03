// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  runtimeConfig: {
    spotifyClientId: '',
    spotifyAuthUrl: '',
    spotifyRedirectUri: '',
    spotifyTokenUrl: '',
    spotifyClientSecret: '',
  },
  routeRules: {
    'dashboard': {
      ssr: false,
    },
    '/api/**': {
      cors: true,
    }
  },
  $production: {
    nitro: {
      storage: {
        users: {
          driver: 'redis'
        }
      }
    }
  },
  nitro: {
    storage: {
      users: {
        driver: 'fs',
        base: '.cache'
      }
    }
  }
})