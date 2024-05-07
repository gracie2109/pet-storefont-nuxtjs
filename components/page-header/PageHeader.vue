<template>
  <div
      v-bind="delegatedProps"
      :class="cn('grid gap-1', props.class)"
  >

    <slot/>
    <Separator class="absolute top-20" v-show="props.separated"/>
  </div>
</template>

<script lang="ts" setup>
interface Props extends PrimitiveProps {
  class?: HTMLAttributes['class'],
  separated?: boolean
}
const props =withDefaults(defineProps<Props>(),{})

const delegatedProps = computed(() => {
  const {class: _, ...delegated} = props

  return delegated
})
import type {Primitive, PrimitiveProps, SeparatorProps} from "radix-vue";
import type {HTMLAttributes} from "vue";
import {cn} from "~/lib/utils";

</script>