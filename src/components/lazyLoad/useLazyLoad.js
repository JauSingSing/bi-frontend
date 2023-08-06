import { onMounted, onUnmounted } from 'vue'

let observer = null // intersectionObserver 实例

let vnodeList = []

function initObserver() {
  if (!observer) {
    observer = new IntersectionObserver(observerHandler)
  }
}

function observerHandler(entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      vnodeList.forEach((vnode) => {
        if (vnode.$el === entry.target) {
          if (vnode.show) return unobserveTarget(vnode.$el)
          vnode.load()
        }
      })
    }
  })
}

// 开始监听
function observeTarget(vnode) {
  if (!observer) {
    initObserver()
  }
  vnodeList.push(vnode)
  console.log('>>>observer', observer)
  observer.observe(vnode.$el)
}

// 停止监听
function unobserveTarget(vnode) {
  if (!observer) return
  observer.unobserve(vnode?.el || vnode)
}

/**
 * 懒加载
 * @param {Vnode} vnode 需要监听的元素的 vnode
 */
export default function useLazyLoad(vnode) {
  console.log('>>>vnode', vnode)
  onMounted(() => {
    console.log('>>>>mounted')
    observeTarget(vnode)
  })

  onUnmounted(() => {
    unobserveTarget(vnode)
  })
}
