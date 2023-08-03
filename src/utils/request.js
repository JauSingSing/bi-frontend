import axios from 'axios'
import { RES_CODE } from './constant'
import router from '../router/index'
import { useUserStore } from '../stores/user'

const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: import.meta.env.VITE_APP_BASE_API,
  withCredentials: true,
  // 超时
  timeout: 60 * 1000 // 1min
})

service.interceptors.response.use((response) => {
  if (response.data.code !== 0) {
    ElMessage.error(response.data.message)
    if (response.data.code === RES_CODE.NOT_LOGIN_ERROR) {
      // 重置用户信息
      const { resetUserInfo } = useUserStore()
      resetUserInfo()
      // 跳转到登录
      router.push({ name: 'login' })
    }
    return Promise.reject(response.data)
  }
  return Promise.resolve(response.data)
})

export default service
