<template>
  <header class="nav-header">
    <router-link :to="{ name: 'index' }">
      <div class="header-logo">
        <img :src="logo" class="logo" />
        <span class="title">智能 BI 平台</span>
      </div>
    </router-link>
    <el-dropdown>
      <div class="user-info">
        <img :src="userAvatar" class="user-avatar" />
        <span class="user-name">{{ userStore.username }}</span>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item :icon="SwitchButton">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { useUserStore } from '../../stores/user'
import logo from '../../assets/logo.svg'
import { SwitchButton } from '@element-plus/icons-vue'

const userStore = useUserStore()

const userAvatar = computed(() => {
  return userStore.avatar || logo
})
</script>

<style scoped>
.nav-header {
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 200;
  height: var(--header-height);
  background-color: #001529;
}
.header-logo {
  display: flex;
  align-items: center;
}
.logo {
  width: 25px;
  margin-right: 10px;
}
.title {
  font-size: 20px;
  font-weight: bold;
  color: #fff;
}
.user-info {
  display: flex;
  align-items: center;
  outline: none;
  cursor: pointer;
}
.user-avatar {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  margin-right: 8px;
}
.user-name {
  color: #fff;
}
</style>
