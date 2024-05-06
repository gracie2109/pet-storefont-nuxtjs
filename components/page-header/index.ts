import {cva, type VariantProps} from "class-variance-authority"


export {default as PageHeaderShell} from "./PageHeaderShell.vue";
export {default as PageHeader} from "./PageHeader.vue";
export {default as PageHeaderHeading} from "./PageHeaderHeading.vue";


export const pageHeaderShellVariants = cva("", {
    variants: {
        variant: {
            default: "",
            flex: "flex justify-between items-center",
        },
    },
    defaultVariants: {
        variant: "default",
    },
})

export const headingVariants = cva(
    "font-bold leading-tight tracking-tighter lg:leading-[1.1]",
    {
        variants: {
            size: {
                default: "text-3xl md:text-4xl",
                sm: "text-2xl md:text-3xl",
                lg: "text-4xl md:text-5xl",
            },
        },
        defaultVariants: {
            size: "default",
        },
    }
)

export type PageHeaderShellVariants = VariantProps<typeof pageHeaderShellVariants>;
export type HeadingVariants = VariantProps<typeof headingVariants>;













