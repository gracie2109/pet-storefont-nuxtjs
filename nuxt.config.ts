// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
    modules: ['@nuxtjs/tailwindcss', 'shadcn-nuxt'],
    // axios:{
    //     baseURL: process.env.NUXT_PUBLIC_API_BASE,
    // },
    // publicRuntimeConfig: {
    //     axios: {
    //         browserBaseURL: process.env.NUXT_PUBLIC_API_BASE
    //     }
    // },
    // privateRuntimeConfig: {
    //     axios: {
    //         baseURL: process.env.NUXT_PUBLIC_API_BASE
    //     }
    // },
})