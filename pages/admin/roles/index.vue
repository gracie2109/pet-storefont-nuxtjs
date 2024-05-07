<template>
  <Shell variant="sidebar">
    <PageHeaderShell separated>
      <PageHeader>
        <PageHeaderHeading size="sm">Roles</PageHeaderHeading>
        <p>Manage your roles</p>
      </PageHeader>

    </PageHeaderShell>
    <NuxtLink href="/admin/roles/create">Go detail</NuxtLink>
    <div>
      content
    </div>
  </Shell>
</template>

<script lang="ts" setup>



import {cn} from "~/lib/utils";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "~/components/ui/table";
import {Shell} from "~/components/shell";
import {Input} from "~/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from "~/components/ui/dropdown-menu";
import {PageHeader, PageHeaderHeading, PageHeaderShell} from "~/components/page-header";
import {Button} from "~/components/ui/button";
import {ChevronDown} from "lucide-vue-next";
import {FlexRender} from "@tanstack/vue-table";


const {data:roles,status} =await useFetch("http://localhost:5007/api/roles/get-roles");

console.log("data ==>", toRaw(roles.value))




</script>