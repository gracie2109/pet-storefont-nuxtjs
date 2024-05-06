<script lang="ts" setup>
import {Separator} from '@/components/ui/separator';
import {type PageHeaderShellVariants, pageHeaderShellVariants} from ".";
import type {Primitive, PrimitiveProps} from "radix-vue";
import type {HTMLAttributes} from "vue";
import {cn} from "@/lib/utils";

interface PageHeaderShellProps extends PrimitiveProps {
  class?: HTMLAttributes['class'],
  variant?: PageHeaderShellVariants['variant']
  separated?:boolean
}

const headerShellProps = withDefaults(defineProps<PageHeaderShellProps>(), {
  as: 'section',
  separated: true
})
const delegatedProps = computed(() => {
  const {class: _, ...delegated} = headerShellProps

  return delegated
})
</script>


<template>
  <div class="w-full relative">
    <Primitive
        v-bind="delegatedProps"
        :class="cn(pageHeaderShellVariants({ variant }), headerShellProps.class,'flex justify-between items-center relative')"
    >
      <slot/>
      <Separator class="absolute top-20" v-show="headerShellProps.separated"/>
    </Primitive>
  </div>
</template>