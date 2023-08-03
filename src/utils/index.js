// 节流
export function throttle(fn, delay) {
  let prev = Date.now()
  return function () {
    const cur = Date.now()
    if (cur - prev > delay) {
      prev = cur
      fn.apply(null, arguments)
    }
  }
}
