<script setup>
import { ElMessage } from 'element-plus'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { User } from '@element-plus/icons-vue'
import { useUserStore } from '../stores/user'

const loginForm = reactive({
  userAccount: null,
  userPassword: null
})

const loginFormRef = ref(null)

const loading = ref(false)

const router = useRouter()

const formRules = reactive({
  userAccount: [
    { required: true, message: '请输入账号', trigger: 'blur' },
    { min: 4, message: '账号错误，至少 4 个字符', trigger: 'blur' }
  ],
  userPassword: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 8, message: '密码错误，至少 8 个字符', trigger: 'blur' }
  ]
})

function loginHandler() {
  loginFormRef.value.validate((result) => {
    if (!result) return
    loading.value = true
    const { login } = useUserStore()
    login(loginForm)
      .then(() => {
        ElMessage.success('登录成功')
        router.push({ name: 'index' })
      })
      .finally(() => {
        loading.value = false
      })
  })
}
</script>

<template>
  <div class="container">
    <h1 class="title">用户登录</h1>
    <el-form ref="loginFormRef" :model="loginForm" :rules="formRules" @keyup.enter="loginHandler">
      <el-form-item prop="userAccount">
        <el-input v-model="loginForm.userAccount" :prefix-icon="User" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item prop="userPassword">
        <PasswordInput v-model="loginForm.userPassword" placeholder="密码"></PasswordInput>
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" type="primary" class="login-btn" @click="loginHandler"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
    <router-link :to="{ name: 'register' }">没有账号？去注册</router-link>
  </div>
</template>

<style scoped>
.container {
  min-width: 328px;
  max-width: 500px;
  box-shadow: 0px 0px 20px -3px rgba(0, 0, 0, 0.5);
  padding: 20px;
  border-radius: 4px;
}
.title {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
}
.login-btn {
  width: 100%;
}
</style>
