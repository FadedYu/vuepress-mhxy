<script setup lang="ts">
import { reactive, ref } from 'vue'
import { InfoFilled } from '@element-plus/icons-vue'

const form = reactive({
  menPai: 'nver',
  level: 129, // 等级
  jiNeng: 150, // 技能
  minJie: 0, // 敏捷
  faXiu: 0, // 法修
  // 伤害
  wuQi: 0, // 武器伤害
  tou: 0, // 头饰伤害
  lingShiShang: 0, // 灵饰伤害
  // 固伤
  lingShiGu: 0, // 灵饰固伤
  zhongGu: 0, // 钟灵石固伤
  yaoXieGu: 0, // 腰鞋固伤
  // 符石
  fuShiZuHe: 1, // 符石组合
  fuShiGu: 0, // 固伤符石数量
  // 其它
  faBao: 0, // 法宝
  zhenFa: 'tian', // 阵法
  miBao: 0.2, // 帮派秘宝
  shangHaiFu: 0, // 伤害符
  shenMuFu: 0, // 神木符
  anQi: 0, // 暗器技能
  anQiMing: 0 // 暗器命中
})

const resultTitle1 = () => {
  let title = ''
  switch (form.menPai) {
    case 'nver':
    case 'putuo':
      title = '技能'
      break
    case 'difu':
      title = '白天'
      break
    case 'wudi':
      title = '秒脉'
      break
  }
  return title
}

const resultTitle2 = () => {
  let title = ''
  switch (form.menPai) {
    case 'nver':
      title = '暗器'
      break
    case 'difu':
      title = '黑夜'
      break
    case 'wudi':
      title = '奶脉'
      break
    case 'putuo':
      title = '无'
      break
  }
  return title
}

const resultInitialValue = {
  miao1: 7,
  miao2: 7,
  result1: {
    zhuMiao: 0,
    fuMiao: 0,
    total: 0
  },
  result2: {
    zhuMiao: 0,
    fuMiao: 0,
    total: 0
  }
}

const result = reactive({ ...resultInitialValue })

const menPaiOptions = [
  { label: '女儿村', value: 'nver' },
  { label: '地府', value: 'difu' },
  { label: '无底洞', value: 'wudi' },
  { label: '普陀', value: 'putuo' }
]

const faBaoOptions = [
  { label: '无', value: 0 },
  { label: '试剑石', value: 40 },
  { label: '双试剑石', value: 80 },
  { label: '落星飞鸿', value: 70 },
  { label: '落星+试剑石', value: 110 }
]

const fuShiZuHeOptions = [
  { label: '无', value: 0 },
  { label: '双4', value: 1 },
  { label: '双3', value: 2 },
  { label: '双2', value: 3 },
  { label: '单3单4', value: 4 },
  { label: '单2单4', value: 5 },
  { label: '单2单3', value: 6 },
  { label: '单4', value: 7 },
  { label: '单3', value: 8 },
  { label: '单2', value: 9 }
]

const resultMiaoOptions = ref([
  { label: '秒1', value: 1, disabled: false },
  { label: '秒2', value: 2, disabled: false },
  { label: '秒3', value: 3, disabled: false },
  { label: '秒4', value: 4, disabled: false },
  { label: '秒5', value: 5, disabled: false },
  { label: '秒6', value: 6, disabled: false },
  { label: '秒7', value: 7, disabled: false }
])

const fuShiZuHeMap = new Map<string, number[]>([
  ['nver', [102, 76, 50, 89, 76, 63, 51, 38, 25]],
  ['difu', [64, 40, 30, 52, 47, 35, 32, 20, 15]],
  ['wudi', [128, 84, 64, 106, 96, 74, 64, 42, 32]],
  ['putuo', [128, 84, 64, 106, 96, 74, 64, 42, 32]]
])

/**
 * 重置值
 */
function reset() {
  Object.assign(result, resultInitialValue)
}

function onMenPaiSelectChange(value: string) {
  reset()
  if (value === 'wudi' || value === 'putuo') {
    resultMiaoOptions.value[5].disabled = true
    resultMiaoOptions.value[6].disabled = true
    result.miao1 = 5
    result.miao2 = 5
  } else {
    resultMiaoOptions.value[5].disabled = false
    resultMiaoOptions.value[6].disabled = false
    result.miao1 = 7
    result.miao2 = 7
  }
}

/**
 * 计算结果按钮事件
 */
function onResultClick() {}

/**
 * 根据门派，符石组合结果计算
 * @param menPai 门派
 * @param zuHe 组合下标
 */
function getFuShiZuHeValue(menPai: string, zuHe: number) {
  if (zuHe === 0) {
    return 0
  }
  return fuShiZuHeMap.get(menPai)![zuHe - 1]
}

/**
 * 女儿伤害结果计算
 * @param type 1: 技能，2：暗器
 */
function resultNvEr(type: number) {
  let jiNeng = form.jiNeng * form.jiNeng
}
</script>

<template>
  <el-card shadow="hover">
    <el-form :model="form" label-width="auto">
      <el-row :gutter="20">
        <el-col :xs="24" :sm="24" :md="12" :lg="6">
          <el-form-item label="门派" required>
            <el-select
              @change="onMenPaiSelectChange"
              v-model="form.menPai"
              placeholder="请选择门派"
            >
              <el-option
                v-for="item in menPaiOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :xs="12" :sm="12" :md="12" :lg="6">
          <el-form-item label="等级">
            <el-input-number :controls="false" :min="0" :precision="0" v-model="form.level" />
          </el-form-item>
          <el-form-item label="技能">
            <el-input-number :controls="false" :min="0" v-model="form.jiNeng" />
          </el-form-item>
          <el-form-item label="敏捷">
            <el-input-number :controls="false" :min="0" :precision="0" v-model="form.minJie" />
          </el-form-item>
          <el-form-item label="法修">
            <el-input-number :controls="false" :min="0" v-model="form.faXiu" />
          </el-form-item>
          <el-form-item label="阵法" required>
            <el-select v-model="form.zhenFa">
              <el-option label="天覆阵" value="tian" />
              <el-option label="普通阵" value="pu" />
            </el-select>
          </el-form-item>
          <el-form-item label="帮派秘宝">
            <el-input-number
              :controls="false"
              :min="0"
              :max="1"
              :precision="2"
              :step="0.1"
              v-model="form.miBao"
            />
          </el-form-item>
        </el-col>

        <el-col :xs="12" :sm="12" :md="12" :lg="6">
          <el-form-item label="武器伤害">
            <el-input-number :controls="false" :min="0" :precision="0" v-model="form.wuQi" />
          </el-form-item>
          <el-form-item label="头饰伤害">
            <el-input-number :controls="false" :min="0" v-model="form.tou" />
          </el-form-item>
          <el-form-item label="灵饰伤害">
            <el-input-number
              :controls="false"
              :min="0"
              :precision="0"
              v-model="form.lingShiShang"
            />
          </el-form-item>
          <el-form-item label="灵饰固伤">
            <el-input-number :controls="false" :min="0" v-model="form.lingShiGu" />
          </el-form-item>
          <el-form-item label="锐不固伤">
            <el-input-number :controls="false" :min="0" :precision="0" v-model="form.zhongGu" />
          </el-form-item>
          <el-form-item label="腰鞋固伤">
            <el-input-number :controls="false" :min="0" v-model="form.yaoXieGu" />
          </el-form-item>
        </el-col>

        <el-col :xs="12" :sm="12" :md="12" :lg="6">
          <el-form-item label="符石组合" required>
            <el-select v-model="form.fuShiZuHe">
              <el-option
                v-for="item in fuShiZuHeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="固伤符石">
            <el-input-number
              class="my-el-input-number"
              :controls="false"
              :min="0"
              v-model="form.fuShiGu"
            >
              <template #suffix> 颗 </template>
            </el-input-number>
          </el-form-item>
          <el-form-item required>
            <template #label>
              <div style="display: flex; align-items: center">
                <span>法宝</span>
                <el-tooltip
                  placement="top"
                  content="试剑石伤害存在波动，这里取个大概平均值。落星飞鸿满级固定70伤害，无波动。"
                >
                  <el-icon color="#E6A23C" style="cursor: pointer; margin-left: 5px">
                    <InfoFilled />
                  </el-icon>
                </el-tooltip>
              </div>
            </template>
            <el-select v-model="form.faBao">
              <el-option
                v-for="item in faBaoOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :xs="12" :sm="12" :md="12" :lg="6">
          <el-form-item label="伤害符">
            <el-input-number :controls="false" :min="0" v-model="form.shangHaiFu" />
          </el-form-item>
          <el-form-item label="神木符">
            <el-input-number :controls="false" :min="0" :precision="0" v-model="form.shenMuFu" />
          </el-form-item>
          <template v-if="form.menPai === 'nver'">
            <el-form-item label="暗器技能">
              <el-input-number :controls="false" :min="0" v-model="form.anQi" />
            </el-form-item>
            <el-form-item label="暗器命中">
              <el-input-number :controls="false" :min="0" v-model="form.anQiMing" />
            </el-form-item>
          </template>
        </el-col>
      </el-row>
    </el-form>

    <el-row :gutter="20" class="result">
      <el-col :xs="24" :sm="24" :md="6" :lg="4">
        <el-button class="result-button" type="primary" @click="onResultClick">计算结果</el-button>
      </el-col>
      <el-col :xs="24" :sm="24" :md="18" :lg="20">
        <div class="result-content">
          <div class="grid-content border-right">
            <div class="text-row title">
              <span>{{ resultTitle1() }}</span>
              <el-select size="small" v-model="result.miao1" style="width: 60px">
                <el-option
                  v-for="item in resultMiaoOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled"
                />
              </el-select>
            </div>
            <div class="text-row">
              <span>主秒：</span>
              <span>0</span>
            </div>
            <div class="text-row">
              <span>副秒：</span>
              <span>0</span>
            </div>
            <div class="text-row">
              <span>总输出：</span>
              <span>0</span>
            </div>
          </div>

          <div class="grid-content" v-show="form.menPai !== 'putuo'">
            <div class="text-row title">
              <span>{{ resultTitle2() }}</span>
              <el-select size="small" v-model="result.miao2" style="width: 60px">
                <el-option
                  v-for="item in resultMiaoOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled"
                />
              </el-select>
            </div>
            <div class="text-row">
              <span>主秒：</span>
              <span>0</span>
            </div>
            <div class="text-row">
              <span>副秒：</span>
              <span>0</span>
            </div>
            <div class="text-row">
              <span>总输出：</span>
              <span>0</span>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </el-card>
</template>

<style lang="scss" scoped>
:deep(.el-input-number .el-input__inner) {
  text-align: left;
}
.el-input-number {
  width: 100%;
}

.my-el-input-number {
  position: relative;
}
.my-el-input-number::after {
  content: '颗';
  color: var(--el-text-color-secondary);
  display: inline-block;
  text-align: right;
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
}
.result {
  padding-top: 10px;
  border-top: 1px solid var(--el-border-color);

  .result-button {
    margin-bottom: 10px;
  }

  .result-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    max-width: 300px;
    border: 1px solid var(--el-border-color);

    .grid-content {
      padding: 10px;
    }

    .border-right {
      border-right: 1px solid var(--el-border-color);
    }

    .title {
      color: #529b2e;
      font-weight: bold;
      font-size: 18px;
      margin-bottom: 5px;
    }
    .text-row {
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
