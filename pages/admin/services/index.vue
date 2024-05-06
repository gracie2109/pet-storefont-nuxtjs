<template>
  <Shell variant="sidebar">
    <PageHeaderShell separated>
      <PageHeader>
        <PageHeaderHeading size="sm">Roles</PageHeaderHeading>
        <p>Manage your roles</p>
      </PageHeader>
      <h3>HSHHSH</h3>
    </PageHeaderShell>
    <div class="w-full">
      <div class="flex gap-2 items-center py-4">

        <Input
            class="max-w-sm"
            placeholder="Filter service name..."
            :model-value="table.getColumn('name')?.getFilterValue() as string"
            @update:model-value=" table.getColumn('name')?.setFilterValue($event)"
        />

        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button variant="outline" class="ml-auto">
              Columns
              <ChevronDown class="ml-2 h-4 w-4"/>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuCheckboxItem
                v-for="column in table.getAllColumns().filter((column) => column.getCanHide())"
                :key="column.id"
                class="capitalize"
                :checked="column.getIsVisible()"
                @update:checked="(value) => {
              column.toggleVisibility(!!value)
            }"
            >
              {{ column.id }}
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <p>{{ url.pathname }}</p>
<!--        <NuxtLink href="" to="newurl">Create Service</NuxtLink>-->
      </div>
      <div class="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
              <TableHead
                  v-for="header in headerGroup.headers" :key="header.id" :data-pinned="header.column.getIsPinned()"
                  :class="cn(
                { 'sticky bg-background/95': header.column.getIsPinned() },
                header.column.getIsPinned() === 'left' ? 'left-0' : 'right-0',
              )"
              >
                <FlexRender v-if="!header.isPlaceholder" :render="header.column.columnDef.header"
                            :props="header.getContext()"/>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <template v-if="table.getRowModel().rows?.length">
              <TableRow
                  v-for="row in table.getRowModel().rows"
                  :key="row.id"
                  :data-state="row.getIsSelected() && 'selected'"
              >
                <TableCell
                    v-for="cell in row.getVisibleCells()" :key="cell.id" :data-pinned="cell.column.getIsPinned()"
                    :class="cn(
                  { 'sticky bg-background/95': cell.column.getIsPinned() },
                  cell.column.getIsPinned() === 'left' ? 'left-0' : 'right-0',
                )"
                >
                  <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()"/>
                </TableCell>
              </TableRow>
            </template>

            <TableRow v-else>
              <TableCell
                  :colspan="columns.length"
                  class="h-24 text-center"
              >
                No results.
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <div class="flex items-center justify-end space-x-2 py-4">
        <div class="flex-1 text-sm text-muted-foreground">
          {{ table.getFilteredSelectedRowModel().rows.length }} of
          {{ table.getFilteredRowModel().rows.length }} row(s) selected.
        </div>
        <div class="space-x-2">
          <Button
              variant="outline"
              size="sm"
              :disabled="!table.getCanPreviousPage()"
              @click="table.previousPage()"
          >
            Previous
          </Button>
          <Button
              variant="outline"
              size="sm"
              :disabled="!table.getCanNextPage()"
              @click="table.nextPage()"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  </Shell>
</template>


<script lang="ts" setup>

import {Shell} from '@/components/shell'
import {PageHeaderShell, PageHeaderHeading, PageHeader} from "@/components/page-header";

const {data: service, pending, error} = await useFetch('http://localhost:5007/api/services/get-all')
const response = toRaw(service.value) as any

import type {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
} from '@tanstack/vue-table'
import {
  FlexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useVueTable,
} from '@tanstack/vue-table'
import {ArrowUpDown, ChevronDown} from 'lucide-vue-next'
import {h, ref} from 'vue'
import DropdownAction from '@/components/DataTableDropDown.vue'
import {Button} from '@/components/ui/button'
import {Checkbox} from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {Input} from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {cn, convertToVietnamTime, valueUpdater} from '@/lib/utils'
import {useNuxt} from "@nuxt/kit";

export interface Payment {

}

const data: Payment[] = response['data'] as any[]

const columns: ColumnDef<Payment>[] = [
  {
    id: 'select',
    header: ({table}) => h(Checkbox, {
      'checked': table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate'),
      'onUpdate:checked': value => table.toggleAllPageRowsSelected(!!value),
      'ariaLabel': 'Select all',
    }),
    cell: ({row}) => h(Checkbox, {
      'checked': row.getIsSelected(),
      'onUpdate:checked': value => row.toggleSelected(!!value),
      'ariaLabel': 'Select row',
    }),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: ({column}) => {
      return h(Button, {
        variant: 'ghost',
        onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
      }, () => ['name', h(ArrowUpDown, {class: 'ml-2 h-4 w-4'})])
    },
    cell: ({row}) => h('div', {class: 'lowercase'}, row.getValue('name')),
  },
  {
    accessorKey: 'desc',
    header: ({column}) => {
      return h(Button, {
        variant: 'ghost',
      }, () => ['Description'])
    },
    cell: ({row}) => h('div', {class: 'lowercase'}, row.getValue('desc')),
  },
  {
    accessorKey: 'minTimeToDo',
    header: ({column}) => {
      return h(Button, {
        variant: 'ghost',
        onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
      }, () => ['minTimeToDo', h(ArrowUpDown, {class: 'ml-2 h-4 w-4'})])
    },
    cell: ({row}) => {
      const newTime = convertToVietnamTime(row.getValue('minTimeToDo'), "string")
      return h('div', {class: 'lowercase'}, newTime)
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({row}) => {
      const payment = row.original as any

      return h('div', {class: 'relative'}, h(DropdownAction, {
        payment,
      }))
    },
  },
]

const sorting = ref<SortingState>([])
const columnFilters = ref<ColumnFiltersState>([])
const columnVisibility = ref<VisibilityState>({})
const rowSelection = ref({})

const table = useVueTable({
  data,
  columns,
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  onSortingChange: updaterOrValue => valueUpdater(updaterOrValue, sorting),
  onColumnFiltersChange: updaterOrValue => valueUpdater(updaterOrValue, columnFilters),
  onColumnVisibilityChange: updaterOrValue => valueUpdater(updaterOrValue, columnVisibility),
  onRowSelectionChange: updaterOrValue => valueUpdater(updaterOrValue, rowSelection),
  state: {
    get sorting() {
      return sorting.value
    },
    get columnFilters() {
      return columnFilters.value
    },
    get columnVisibility() {
      return columnVisibility.value
    },
    get rowSelection() {
      return rowSelection.value
    },
  },
})

const url = useRequestURL();


</script>
