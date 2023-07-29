<template>
  <setion class="layout-setion">
    <div style="width: var(--menu-width)"></div>
    <aside class="menu-aside">
      <Menu :routes="routes"></Menu>
    </aside>
    <div class="layout-container">
      <header style="height: var(--header-height)"></header>
      <Header />
      <main class="main-container">
        <router-view />
      </main>
    </div>
  </setion>
</template>

<script setup>
import Menu from './components/menu.vue'
import Header from './components/header.vue'
import routes from '../router/routes'
</script>

<style scoped>
.layout-setion {
  display: flex;
  --menu-width: 200px;
  --header-height: 48px;
}
.menu-aside {
  position: fixed;
  top: 0;
  left: 0;
  width: var(--menu-width);
  height: 100%;
  z-index: 100;
  flex: 0 0 var(--menu-width);
  overflow: hidden;
  box-shadow: 2px 0 8px 0 rgba(29,35,41,.05);
}
.layout-container {
  position: relative;
  display: flex;
  flex-direction: column;
  flex: auto;
  min-height: 100vh;
  background-color: #f0f2f5;
}
.main-container {
  flex: auto;
  padding: 20px;
}
</style>