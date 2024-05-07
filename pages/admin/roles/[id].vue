<template>
  <Shell variant="sidebar">
    <PageHeaderShell separated>
      <PageHeader>
        <PageHeaderHeading size="sm">Roles create</PageHeaderHeading>
        <p>Manage your roles create</p>
      </PageHeader>
      <NuxtLink href="/admin/roles">Back</NuxtLink>
    </PageHeaderShell>

    <div>
      <PermissionsTable :data="pers" v-if="pers.data.data "/>
    </div>
  </Shell>
</template>


<script setup lang="ts">


import {defineComponent} from "vue";
import {PageHeader, PageHeaderHeading, PageHeaderShell} from "~/components/page-header/index.js";
import {Shell} from "~/components/shell/index.js";

const {data, status} = await useFetch("http://localhost:5007/api/permissions/get-permissions");
const pers = toRaw(data.value) as any;
</script>