<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { Plus, Minus } from '@element-plus/icons-vue'

let personSpeedCount = ref(2)
let bbSpeedCount = ref(1)
let personProperty = reactive(['p1', 'p2', 'p3', 'p4', 'p5'])
let bbProperty = reactive(['b1', 'b2', 'b3', 'b4', 'b5'])
let person = reactive({
  p1: 1000,
  p2: 530,
  p3: 0,
  p4: 0,
  p5: 0
})
let bb = reactive({
  b1: 431,
  b2: 0,
  b3: 0,
  b4: 0,
  b5: 0
})
let zuoqi = ref(28)

function onPersonAdd() {
  personSpeedCount.value++
  handlePersonChange(
    person[personProperty[personSpeedCount.value - 2]],
    '',
    personSpeedCount.value - 2
  )
}

function onPersonMinus() {
  personSpeedCount.value--
  handlePersonChange(person[personProperty[personSpeedCount.value - 1]], '', personSpeedCount.value)
}

function onBBAdd() {
  bbSpeedCount.value++
  handleBBChange(bb.b1, '', 0)
}

function onBBMinus() {
  bbSpeedCount.value--
}

function handlePersonChange(value: number, name: string, index: number) {
  if (value < 1) {
    value = 1
    person[name] = 1
  }
  value = Math.trunc(value)
  person[name] = value
  let nowValue = value
  for (let i = index; i < personSpeedCount.value - 1; i++) {
    nowValue = downgrade(nowValue)
    person[personProperty[i + 1]] = nowValue
  }

  for (let j = 0; j < bbProperty.length; j++) {
    if (j == 0) {
      nowValue = spanDowngrade(nowValue)
      bb[bbProperty[j]] = nowValue
      continue
    }
    nowValue = downgrade(nowValue)
    bb[bbProperty[j]] = nowValue
  }
}

function handelPersonUpgrade(name: string, index: number) {
  if (index - 1 < 0) {
    return
  }

  let nowValue = person[name]
  for (let i = index - 1; i >= 0; i--) {
    nowValue = upgrade(nowValue)
    person[personProperty[i]] = nowValue
  }
}

function handleBBChange(value: number, name: string, index: number) {
  if (value < 1) {
    value = 1
    bb[name] = 1
  }
  value = Math.trunc(value)
  bb[name] = value
  let nowValue = value
  for (let i = index; i < bbSpeedCount.value - 1; i++) {
    nowValue = downgrade(nowValue)
    bb[bbProperty[i + 1]] = nowValue
  }
}

function handelBBUpgrade(name: string, index: number) {
  let nowValue = bb[name]
  for (let i = index - 1; i >= 0; i--) {
    nowValue = upgrade(nowValue)
    bb[bbProperty[i]] = nowValue
  }

  for (let j = personSpeedCount.value - 1; j >= 0; j--) {
    nowValue = spanUpgrade(nowValue)
    person[personProperty[j]] = nowValue
  }
}

function upgrade(value: number) {
  return Math.ceil(value * (1.05 / 0.95))
}

function downgrade(value: number) {
  return Math.floor(value * (0.95 / 1.05))
}

function spanUpgrade(value: number) {
  return Math.ceil((value / 0.95 / 0.9) * 1.05)
}

function spanDowngrade(value: number) {
  return Math.floor((value * 0.95 * 0.9) / 1.05)
}
</script>

<template>
  <h2 class="flex-align-center label">
    人物速度档位：
    <el-button-group size="small">
      <el-button :icon="Plus" :disabled="personSpeedCount >= 5" @click="onPersonAdd"></el-button>
      <el-button :icon="Minus" :disabled="personSpeedCount <= 1" @click="onPersonMinus"></el-button>
    </el-button-group>
  </h2>
  <div class="flex-wrap">
    <div
      class="flex-align-center"
      :key="count"
      v-for="count in personSpeedCount"
      style="margin: 0 20px 20px 0"
    >
      <span>{{ count }} 挡：</span>
      <el-input
        v-model="person[personProperty[count - 1]]"
        type="number"
        :min="1"
        class="input-with-append"
        style="width: 180px"
        @change="(value: number) => handlePersonChange(value, personProperty[count - 1], count -1)"
      >
        <template #append>
          <el-button @click="handelPersonUpgrade(personProperty[count - 1], count - 1)">
            逆推
          </el-button>
        </template>
      </el-input>
    </div>
  </div>

  <h2 class="flex-align-center label">
    宝宝速度档位：
    <el-button-group size="small">
      <el-button :icon="Plus" :disabled="bbSpeedCount >= 5" @click="onBBAdd"></el-button>
      <el-button :icon="Minus" :disabled="bbSpeedCount <= 1" @click="onBBMinus"></el-button>
    </el-button-group>
  </h2>

  <div style="margin-bottom: 10px; display: flex; align-items: center">
    <span>坐骑速度：</span>
    <el-input-number
      :min="0"
      v-model="zuoqi"
      :precision="0"
      value-on-clear="min"
      :controls="false"
      style="width: 80px"
    />
  </div>

  <div class="flex-wrap">
    <div
      :key="count"
      v-for="count in bbSpeedCount"
      class="flex-column"
      style="margin: 0 20px 20px 0"
    >
      <div class="flex-align-center bb-input">
        <span>{{ count }} 挡：</span>
        <el-input
          v-model="bb[bbProperty[count - 1]]"
          type="number"
          :min="1"
          class="input-with-append"
          style="width: 180px"
          @change="(value: number) => handleBBChange(value, bbProperty[count - 1], count -1)"
        >
          <template #append>
            <el-button @click="handelBBUpgrade(bbProperty[count - 1], count - 1)">逆推</el-button>
          </template>
        </el-input>
      </div>
      <div class="extra">
        <div>
          <span class="extra-title">高敏：</span>
          <span>{{ Math.floor(bb[bbProperty[count - 1]] / 1.2) }}</span>
        </div>
        <div>
          <span class="extra-title">坐骑：</span>
          <span>{{ bb[bbProperty[count - 1]] - zuoqi }}</span>
        </div>
        <div>
          <span class="extra-title">高敏+坐骑：</span>
          <span>{{ Math.floor((bb[bbProperty[count - 1]] - zuoqi) / 1.2) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.input-with-append {
  .el-input-group__prepend {
    background-color: var(--el-fill-color-blank);
  }
  .el-input-group__append {
    &:hover {
      color: var(--c-brand);
    }
    &:active {
      background-color: #eeeeee;
    }
  }
}
.bb-input {
  .el-input-group--append > .el-input__wrapper {
    border-bottom-left-radius: 0;
  }

  .el-input-group__append {
    border-bottom-right-radius: 0;
  }
}
</style>
<style lang="scss" scoped>
.label {
  font-size: 18px;
  margin-bottom: 20px;
}
.flex-wrap {
  display: flex;
  flex-wrap: wrap;
}
.flex-align-center {
  display: flex;
  align-items: center;
}
.flex-column {
  display: flex;
  flex-direction: column;
  justify-content: start;
}
.extra {
  margin: 0 0 20px 45px;
  padding: 5px;
  border: 1px solid var(--el-border-color);
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  border-top: 0;
  font-size: 12px;
  color: #909399;

  &-title {
    display: inline-flex;
    width: 75px;
  }
}
</style>
