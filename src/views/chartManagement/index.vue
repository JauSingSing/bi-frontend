<template>
  <el-form :model="searchForm" inline @keyup.enter="getChartListData">
    <el-form-item>
      <el-input v-model="searchForm.searchValue"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="getChartListData">查询</el-button>
    </el-form-item>
  </el-form>
  <section class="chart-container">
    <div v-for="chart in chartList" :key="chart.id" class="chart-card-container">
      <el-card :header="chart.name" class="chart-card">
        <p>{{ chart.goal }}</p>
        <lazyLoad class="chart-content">
          <BaseChart v-if="chart.genChart" :option="chart.genChart"></BaseChart>
          <div v-else class="none-chart">
            <el-icon><PictureIcon /></el-icon>
          </div>
        </lazyLoad>
        <details v-if="chart.genResult">
          <summary>分析结果</summary>
          <pre class="chart-result">{{ chart.genResult }}</pre>
        </details>
      </el-card>
    </div>
  </section>
  <el-pagination
    v-model:current-page="searchForm.current"
    v-model:page-size="searchForm.pageSize"
    :page-sizes="[10, 20, 50]"
    layout="->, prev, page, pageSize, next"
    @size-change="getChartListData"
    @current-change="getChartListData"
  ></el-pagination>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { getChartList } from '../../api/chart/index'
import { Picture as PictureIcon } from '@element-plus/icons-vue'
import lazyLoad from '../../components/lazyLoad/index.vue'

const searchForm = reactive({
  searchValue: null,
  current: 1,
  pageSize: 10
})

const chartList = ref([])
const loading = ref(false)

function getChartListData() {
  loading.value = true
  getChartList(searchForm)
    .then((response) => {
      chartList.value = response.data.records.reduce((result, item) => {
        if (item.name) {
          result.push(item)
        }
        try {
          item.genChart = JSON.parse(item.genChart || null)
        } catch {
          item.genChart = null
        }
        item.genResult = item.genResult?.replace(/^\n/, '')
        return result
      }, [])
      searchForm.current = response.data.current
    })
    .finally(() => [(loading.value = false)])
}

getChartListData()
</script>

<style scoped>
.chart-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.chart-card-container {
  flex-basis: calc(50% - 4px);
}
.chart-result {
  font-family: inherit;
}
.none-chart {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: var(--el-fill-color-light);
  color: var(--el-text-color-secondary);
  font-size: 30px;
}
.chart-content {
  margin: 16px 0;
  height: 300px;
}

@media screen and (max-width: 900px) {
  .chart-card-container {
    flex-basis: 100%;
  }
}
</style>
