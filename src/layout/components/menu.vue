<template>
  <el-menu
    :default-active="$route.name || $route.path"
    router
    class="menu-list"
    @open="handleOpen"
    @close="handleClose"
  >
    <MenuItem v-for="route in menuList" :key="route.name || route.path" :menu="route"></MenuItem>
  </el-menu>
</template>

<script setup>
import { computed } from 'vue'
import MenuItem from './menuItem.vue'

const props = defineProps(['routes'])

const menuList = computed(() => props.routes?.filter((item) => !item.hidden) || [])
</script>

<style scoped>
.menu-list {
  padding-top: 48px;
  height: 100%;
  border: none;
}
</style>
