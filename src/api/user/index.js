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
