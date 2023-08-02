import request from '../../utils/request'

export function getChartList(data) {
  return request({
    url: '/chart/list/page',
    method: 'post',
    data
  })
}

// 生成报表
export function getChartData(data) {
  const formData = new FormData()
  for (const key in data) {
    formData.append(key, data[key])
  }
  return request({
    url: '/chart/genChart',
    method: 'post',
    data: formData
  })
}
