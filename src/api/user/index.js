import request from '../../utils/request'

// 用户注册
export function userRegister(data) {
  return request({
    url: '/user/register',
    method: 'post',
    data
  })
}

// 用户登录
export function userLogin(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

// 获取用户信息
export function getLoginInfo() {
  return request({
    url: '/user/get/login',
    method: 'get'
  })
}

// 退出登录
export function userLoginOut() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
