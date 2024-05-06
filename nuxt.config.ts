// https://nuxt.com/docs/api/configuration/nuxt-config

import {resolve} from "path";

export default defineNuxtConfig({
    modules: ['@nuxtjs/tailwindcss', 'shadcn-nuxt'],
    runtimeConfig: {
        public: {
            apiBase: process.env.NUXT_PUBLIC_API_BASE || ''
        }
    },
    app: {
        pageTransition: {name: 'page', mode: 'out-in'}
    },
    experimental: {
        viewTransition: true
    },
    ssr:true
})