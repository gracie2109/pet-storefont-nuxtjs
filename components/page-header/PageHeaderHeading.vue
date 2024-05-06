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



const props = withDefaults(defineProps<HeadingVariantsProps>(),{})


const delegatedProps = computed(() => {
  const {class: _, ...delegated} = props
  return delegated
})

</script>


<template>
  <Primitive
      v-bind="delegatedProps"
      :class="cn(headingVariants({ size}), props.class)"
  >
    <slot/>
  </Primitive>
</template>