<template>

  <Shell variant="sidebar">
    <PageHeaderShell separated>
      <PageHeader>
        <PageHeaderHeading size="sm">Service detail page</PageHeaderHeading>
        <p>Service detail page</p>
      </PageHeader>
      <Button @click="goBack">Back</Button>
    </PageHeaderShell>
    <div>

      <form class="w-2/3 space-y-6" @submit="onSubmit">
        <FormField v-slot="{ componentField }" name="name">
          <FormItem>
            <FormLabel>name</FormLabel>
            <FormControl>
              <Input type="text" placeholder="shadcn" v-bind="componentField"/>
            </FormControl>
            <FormMessage/>
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="desc">
          <FormItem>
            <FormLabel>desc</FormLabel>
            <FormControl>
              <Input type="text" placeholder="shadcn" v-bind="componentField"/>
            </FormControl>
            <FormMessage/>
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="minTimeToDo">
          <FormItem>
            <FormLabel>minTimeToDo</FormLabel>
            <FormControl>
              <Input type="text" placeholder="shadcn" v-bind="componentField"/>
            </FormControl>
            <FormMessage/>
          </FormItem>
        </FormField>
        <Button type="submit">
          Submit
        </Button>
      </form>


    </div>
  </Shell>


</template>


<script lang="ts" setup>
import {useForm} from 'vee-validate'
import {toTypedSchema} from '@vee-validate/zod'
import * as z from 'zod'
import {useRouter} from "vue-router";
import {PageHeader, PageHeaderHeading, PageHeaderShell} from "~/components/page-header";
import {Shell} from "~/components/shell";
import {Button} from '@/components/ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {Input} from '@/components/ui/input';
import {navigateTo} from "#app/composables/router";

const formSchema = toTypedSchema(z.object({
  name: z.string().min(2).max(50),
  desc:z.string().optional(),
  minTimeToDo:z.string()
}))

const {handleSubmit} = useForm({
  validationSchema: formSchema,
})

const onSubmit = handleSubmit((values) => {
  console.log("onSubmit", values)
})
const router = useRouter();

function goBack () {
  router.go(-1)
  navigateTo('/admin/services')
}

</script>