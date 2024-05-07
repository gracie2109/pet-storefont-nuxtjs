<script setup lang="ts">
import {headingVariants, type HeadingVariants} from ".";

import type {Primitive, PrimitiveProps} from "radix-vue";
import type {HTMLAttributes} from "vue";
import {cn} from "~/lib/utils";

interface HeadingVariantsProps extends PrimitiveProps{
  class?: HTMLAttributes['class'],
  size?: HeadingVariants['size']
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
}



const props = withDefaults(defineProps<HeadingVariantsProps>(),{
  as: "h1"
})
const Comp = props['as']

const delegatedProps = computed(() => {
  const {class: _, ...delegated} = props
  return delegated
})

</script>


<template>
  <Comp
      v-bind="delegatedProps"
      :class="cn(headingVariants({ size}), props.class)"
  >
    <slot/>
  </Comp>
</template>