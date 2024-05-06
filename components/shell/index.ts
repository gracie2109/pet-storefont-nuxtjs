import { cva, type VariantProps } from "class-variance-authority"
export { default as Shell } from './Shell.vue'

export const shellVariants = cva("grid items-center gap-8 pb-8 pt-6 md:py-8", {
    variants: {
        variant: {
            default: "container",
            sidebar: "flex-1 space-y-4 p-8 pt-6",
            centered: "container flex h-[100dvh] max-w-2xl flex-col justify-center",
            markdown: "container max-w-3xl py-8 md:py-10 lg:py-10",
        },
    },
    defaultVariants: {
        variant: "default",
    },
})
export type ShellVariants = VariantProps<typeof shellVariants>
