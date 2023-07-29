import { ref } from 'vue'
import { defineStore } from 'pinia'
import { userLogin, getLoginInfo, userLoginOut } from '../api/user/index'

export const useUserStore = defineStore('user', () => {
  const id = ref()
  const username = ref()
  const avatar = ref()
  const role = ref()
  const token = ref(null)

  // 登录
  async function login(loginForm) {
    const response = await userLogin(loginForm)
    token.value = response.token
    id.value = response.id
    username.value = response.username
    avatar.value = response.avatar
    role.value = response.role
    return response
  }

  // 获取用户登录信息
  async function getUserInfo() {
    const response = await getLoginInfo()
    id.value = response.id
    username.value = response.username
    avatar.value = response.avatar
    role.value = response.role
    return response
  }

  // 退出登录
  async function loginOut() {
    await userLoginOut()
    resetUserInfo()
  }

  // 重置用户信息
  function resetUserInfo() {
    id.value = null
    token.value = null
    username.value = null
    avatar.value = null
    role.value = null
  }

  return {
    id,
    username,
    avatar,
    role,

    login,
    getUserInfo,
    loginOut,
    resetUserInfo
  }
})
