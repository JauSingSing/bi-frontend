<template>
  <setion class="chart-result">
    <BaseChart :option="chart"></BaseChart>
    <label>分析结论：</label>
    <p class="result-text">{{ result }}</p>
  </setion>
</template>

<script setup>
import BaseChart from '@/components/BaseChart.vue'

defineProps(['chart', 'result'])
</script>

<style scoped>
.chart-result {
  flex: auto;
  overflow: hidden;
}
.result-text {
  text-indent: 2em;
}
</style>
