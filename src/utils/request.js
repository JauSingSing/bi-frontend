import axios from 'axios'

const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: import.meta.env.VITE_APP_BASE_API,
  // 超时
  timeout: 60 * 1000 // 1min
})

service.interceptors.response.use(response => {
  if (response.data.code !== 0) {
    ElMessage.error(response.data.message)
    return Promise.reject(response.data)
  }
  return Promise.resolve(response.data)
})

export default service