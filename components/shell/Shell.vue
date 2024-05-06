<script setup lang="ts">
import {cn} from '@/lib/utils';
import type {HTMLAttributes} from 'vue'
import {type ShellVariants, shellVariants} from '.';
import type {PrimitiveProps, Primitive} from "radix-vue";


interface Props extends PrimitiveProps {
  variant?: ShellVariants['variant'];
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  as: 'section',
})
const delegatedProps = computed(() => {
  const {class: _, ...delegated} = props

  return delegated
})
</script>


<template>
  <Primitive
      v-bind="delegatedProps"
      :as="as"
      :class="cn(shellVariants({ variant }), props.class)"
  >
    <slot/>
  </Primitive>
</template>