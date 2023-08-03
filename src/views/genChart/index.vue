<template>
  <setion class="gen-chart">
    <chartForm @success="genSuccess"></chartForm>
    <chartResult :chart="chartInfo.genChart" :result="chartInfo.genResult"></chartResult>
  </setion>
</template>

<script setup>
import { reactive } from 'vue'
import chartForm from './components/chartForm.vue'
import chartResult from './components/chartResult.vue'

const chartInfo = reactive({
  genResult: null, // 分析结果
  genChart: null // echart option 配置
})

function genSuccess(chartRes) {
  chartInfo.genChart = JSON.parse(chartRes.genChart || {})
  chartInfo.genResult = chartRes.genResult
}
</script>

<style scoped>
.gen-chart {
  display: flex;
  gap: 16px;
}
</style>
