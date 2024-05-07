<template>
  <div>
    <form @submit="onSubmit">
      <div>
        <Checkbox
            name="check-all"
            id="'checkbox'"
            @update:checked="handleCheckAll"


        />
        <label for="'checkbox'">Choose all</label>
      </div>
      <div>
        <Table>
          <TableHeader>
            <TableHead></TableHead>
            <TableHead v-for="item in methods">
              {{ item }}
            </TableHead>
          </TableHeader>

          <TableBody>
            <template v-for="(p, pp ) in permissions">
              <TableRow>
                <TableCell className="font-bold">
                  {{ group[pp] }}
                </TableCell>
                <template v-for="(i, ii) in group as any">
                  <template v-for="(j, jj) in p[i] as any">

                    <TableCell className="font-bold">
                      <template v-if="j && true" class="border border-red-600">
                        <FormField name="permissions"
                                   v-slot="{ value:newVal, handleChange }"
                                   type="checkbox"

                        >
                          <FormItem :key="j._id">
                            <FormControl >
                              <Checkbox
                                  :id="j.name"
                                  :data-indenity="j.pername"
                                  :data-id="j._id"
                                  :data-indentity="j.name.split('.')[1]"
                                  :checked="toRaw(newVal).includes(j._id)"
                                  @update:checked="(checked) => {
                                    const dataRaw = toRaw(newVal);
                                    const mapVal = dataRaw.flatMap()
                                    console.log('dataRaw', dataRaw);
                                    return checked ? handleChange( [...dataRaw, j._id]) : handleChange(dataRaw.filter((id:string) => id !== j._id))
                                }"
                              />
                              <!--                              <Checkbox-->


                              <!--                              />-->
                            </FormControl>
                          </FormItem>
                        </FormField>
                      </template>
                      <template v-else>
                        <Checkbox disabled/>
                      </template>
                    </TableCell>

                  </template>
                </template>
              </TableRow>
            </template>
          </TableBody>


        </Table>
      </div>
      <div class="flex justify-start mt-4">
        <Button type="submit">
          Submit
        </Button>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import {useForm} from 'vee-validate'
import {toTypedSchema} from '@vee-validate/zod'
import * as z from 'zod'

import {Button} from '@/components/ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import {Table, TableBody, TableCell, TableHeader, TableHead, TableRow} from "@/components/ui/table"
import {Checkbox} from '@/components/ui/checkbox';
import {groupByPermissions} from "~/lib/utils";

const props = defineProps(['name', 'data']);

const permissions = groupByPermissions(props.data.data.data);

const methods = props.data.data.methods;

const group = toRaw((permissions).flatMap((i, j) => {
  return Object.keys(i)
}));

const formSchema = toTypedSchema(z.object({
  permissions: z.array(z.string()).refine(value => value.some(item => item), {
    message: 'You have to select at least one item.',
  }),
}));

const {handleSubmit, errors, values} = useForm({
  // validationSchema: formSchema,
  initialValues: {
    permissions: []
  },
})
const handleCheckAll = () => {

}
const onSubmit = handleSubmit((values) => {
  console.log("onSubmit")
})

const handleCheckSingle = () => {

}

</script>