import request from '../../utils/request'

export function getChartList(data) {
  return request({
    url: '/chart/list/page',
    method: 'post',
    data
  })
}
