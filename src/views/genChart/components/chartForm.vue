<template>
  <el-form
    ref="chartFormRef"
    :model="chartForm"
    :rules="chartFormRules"
    label-width="100px"
  >
    <el-form-item label="分析目标" prop="goal">
      <el-input v-model="chartForm.goal"></el-input>
    </el-form-item>
    <el-form-item label="图表名称" prop="name">
      <el-input v-model="chartForm.name"></el-input>
    </el-form-item>
    <el-form-item label="图表类型">
      <el-select v-model="chartForm.chartType">
        <el-option
          v-for="chartType in chartTypeList"
          :key="chartType"
          :label="chartType"
          :value="chartType"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="图表数据">
      <el-upload
        ref="uploadRef"
        v-model:file-list="fileList"
        :auto-upload="false"
        :on-exceed="handleExceed"
        :limit="1"
      >
        <el-button type="primary" :icon="UploadFilled">请选择要分析的 Excel 文件</el-button>
      </el-upload>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" :loading="loading" @click="genChart">生成图表</el-button>
      <el-button @click="resetForm">重置表单</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ElMessage } from "element-plus"
import { reactive, ref } from "vue"
import { getChartData } from '../../../api/chart/index'
import { genFileId } from "element-plus"
import { UploadFilled } from '@element-plus/icons-vue'

const emit = defineEmits(['success'])

const chartForm = reactive({
  name: null,
  chartType: null,
  goal: null,
  file: null
})

const chartTypeList = reactive([
  '折线图',
  '柱状图',
  '饼图',
  '雷达图'
])

const fileList = ref([])

const chartFormRef = ref()

const chartFormRules = {
  goal: { required: true, message: '请输入分析目标' },
  name: { required: true, message: '请输入图表名称' }
}

const uploadRef = ref()

function handleExceed(files) {
  uploadRef.value.clearFiles()
  const file = files[0]
  file.uid = genFileId()
  uploadRef.value.handleStart(file)
}


const loading = ref(false)

async function genChart() {
  const valiResult = await chartFormRef.value.validate()
  if (!valiResult) return
  if (!fileList.value.length) {
    ElMessage.warning('请上传分析数据')
    return
  }
  const params = {
    ...chartForm,
    file: fileList.value[fileList.value.length - 1]?.raw
  }
  loading.value = true
  try {
    const res = await getChartData(params)
    ElMessage.success('生成图表成功')
    emit('success', res.data)
  } catch (e) {
    ElMessage.error('生成图表失败，' + e.message)
  } finally {
    loading.value = false
  }
}

function resetForm() {
  chartFormRef.value.resetFields()
}
</script>