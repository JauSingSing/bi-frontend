<template>
  <el-sub-menu v-if="children.length && menu.meta" :index="menu.meta.title">
    <template #title>{{ menu.meta.title }}</template>
    <MenuItem v-for="child in children" :key="child.name || child.path" :menu="child" />
  </el-sub-menu>
  <el-menu-item v-else :index="menuItem.name" :route="{ name: menuItem.name }">{{
    menuItem.meta.title
  }}</el-menu-item>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps(['menu'])

const children = computed(() => props.menu.children?.filter((child) => !child.hidden) || [])

const menuItem = computed(() => {
  return children.value[0] || props.menu
})

console.log('>>>menuItem', menuItem.value)
</script>
