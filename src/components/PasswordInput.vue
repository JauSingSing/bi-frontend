<template>
  <el-input v-model="inputValue" :type="inputType" :prefix-icon="Lock">
    <template #suffix>
      <el-icon class="view-icon">
        <component :is="inputIcon" @click="toggleInputType"></component>
      </el-icon>
    </template>
  </el-input>
</template>

<script setup>
import { computed, ref } from 'vue'
import { Hide, View, Lock } from '@element-plus/icons-vue'

const props = defineProps(['modelValue'])

const emit = defineEmits(['update:modelValue'])

const inputValue = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})

const INPUT_TYPE = {
  VIEW: 'text',
  HIDE: 'password'
}

const inputType = ref(INPUT_TYPE.HIDE)

const inputIcon = computed(() => {
  if (inputType.value === INPUT_TYPE.VIEW) {
    return Hide
  }
  return View
})

function toggleInputType() {
  if (inputType.value === INPUT_TYPE.VIEW) {
    inputType.value = INPUT_TYPE.HIDE
  } else {
    inputType.value = INPUT_TYPE.VIEW
  }
}
</script>

<style scoped>
.view-icon {
  cursor: pointer;
}
</style>