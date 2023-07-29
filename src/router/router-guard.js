import router from './index'
import { useUserStore } from '../stores/user'

router.beforeEach(async (to, from, next) => {
  if (to.name !== 'register' && to.name !== 'login') {
    const { id, getUserInfo } = useUserStore()
    // 没有用户信息，则请求用户信息
    if (!id) {
      await getUserInfo()
    }
  }
  next()
})
