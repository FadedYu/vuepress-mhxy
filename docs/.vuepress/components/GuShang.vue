<script setup lang="ts">
import { nextTick, ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'

let guShangCount = ref(1)

function onAddClick() {
  guShangCount.value += 1
}
</script>

<template>
  <div v-for="item in guShangCount" class="content-item">
    <GuShangCard />
  </div>

  <!-- <div class="add-content">
    <el-icon :size="30" class="icon"><Plus /></el-icon>
  </div> -->
  <el-button size="large" class="add-btn" @click="onAddClick">
    <el-icon :size="22"><Plus /></el-icon>
  </el-button>
</template>

<style lang="scss" scoped>
.content-item {
  margin-bottom: 20px;
}

.add-btn {
  width: 100%;
  background-color: var(--el-color-primary-light-9);
  border: 1px dashed var(--el-border-color);
  transition: 0.1s;

  &:hover {
    background-color: var(--el-color-primary-light-8);
  }

  &:active {
    background-color: var(--el-color-primary-light-7);
  }
}
</style>
