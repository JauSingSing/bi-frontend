<template>
  <div ref="chartRef" style="height: 300px"></div>
</template>

<script setup>
import * as echarts from 'echarts'
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { throttle } from '../utils/index.js'

const props = defineProps(['option'])

const chartRef = ref()

let chartInstance = null

// 适应窗口大小
const resizeChart = throttle(() => {
  if (!chartInstance) return
  chartInstance.resize()
}, 300)

onMounted(() => {
  initChart()
  window.addEventListener('resize', resizeChart)
})

watch(() => props.option, initChart)

onBeforeUnmount(() => {
  disposeChart()
  window.removeEventListener('resize', resizeChart)
})

// 初始化图表
function initChart() {
  if (props.option) {
    chartInstance = echarts.init(chartRef.value)
    chartInstance.setOption(props.option)
  } else {
    disposeChart()
  }
}

// 卸载图表
function disposeChart() {
  if (!chartInstance.value) return
  chartInstance.value.dispose()
  chartInstance.value = null
}
</script>
