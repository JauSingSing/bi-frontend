<template>
  <div class="container">
    <div class="login-header">
      <h1 class="title"><img src="../assets/logo.svg" class="logo" />智能 BI 平台</h1>
      <p class="tips">通过 AI 智能分析数据，生成可视化报表</p>
    </div>
    <div class="form-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>
.container {
  height: 100vh;
  padding: 32px 20px;
  background-image: url('../assets/login-bg.svg');
  background-repeat: no-repeat;
  background-position: center 110px;
  background-size: 100%;
  border-radius: 4px;
}
.login-header {
  padding-top: 32px;
  padding-bottom: 24px;
}
.title {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 8px;
}

.logo {
  width: 44px;
}
.tips {
  text-align: center;
}
.form-container {
  min-width: 328px;
  max-width: 500px;
  margin: 0 auto;
}
</style>
