<script setup>
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { userRegister } from '../api/user/index'
import { User } from '@element-plus/icons-vue'

const registerFormRef = ref(null)

const registerForm = reactive({
  userAccount: null,
  userPassword: null,
  checkPassword: null
})

const loading = ref(false)

const router = useRouter()

// 表单验证规则
const validateRules = reactive({
  userAccount: [
    { required: true, message: '请输入账号', trigger: 'blur' },
    { min: 4, message: '用户账号至少 4 个字符', trigger: 'blur' }
  ],
  userPassword: [
    { required: true, message: '请输入用户密码', trigger: 'blur' },
    { min: 8, message: '用户密码至少 8 个字符', trigger: 'blur' }
  ],
  checkPassword: { validator: checkPasswordValidator, trigger: 'blur' }
})

// 验证两次密码的输入
function checkPasswordValidator(rule, value, callback) {
  if (!registerForm.userPassword) {
    return callback()
  }
  if (registerForm.userPassword === registerForm.checkPassword) {
    return callback()
  }
  callback(new Error('两次输入的密码不一致'))
}

// 注册处理函数
function registerHandler() {
  registerFormRef.value.validate((result) => {
    if (!result) return
    loading.value = true
    userRegister(registerForm)
      .then(() => {
        ElMessage.success('注册成功')
        router.push('/login')
      })
      .finally(() => {
        loading.value = false
      })
  })
}
</script>

<template>
  <el-form
    ref="registerFormRef"
    :model="registerForm"
    :rules="validateRules"
    @keyup.enter="registerHandler"
  >
    <el-form-item prop="userAccount">
      <el-input
        v-model="registerForm.userAccount"
        :prefix-icon="User"
        placeholder="账号"
      ></el-input>
    </el-form-item>

    <el-form-item prop="userPassword">
      <PasswordInput v-model="registerForm.userPassword" placeholder="密码"></PasswordInput>
    </el-form-item>

    <el-form-item prop="checkPassword">
      <PasswordInput v-model="registerForm.checkPassword" placeholder="确认密码"></PasswordInput>
    </el-form-item>

    <el-form-item>
      <el-button :loading="loading" type="primary" class="register-btn" @click="registerHandler"
        >注册</el-button
      >
    </el-form-item>
    <router-link :to="{ name: 'login' }">已有账号？去登录</router-link>
  </el-form>
</template>

<style scoped>
.register-btn {
  width: 100%;
}
</style>
