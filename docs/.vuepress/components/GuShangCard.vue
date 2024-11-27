<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import { reactive, ref, toRaw, watch } from 'vue'
import { InfoFilled, ArrowUp, ArrowDown } from '@element-plus/icons-vue'

const fuShiGuTips = '看到符石属性为（固定伤害+2）的，每颗加2。不用管符石的敏捷属性，已经加到人物面板上了。'
const fuShiShangTips = '看到符石属性为（伤害+1.5）的，每颗加1.5。'
const faBaoTips = '落星飞鸿满级最优五行固定70伤害，无波动。试剑石在32-50之间波动会影响结果，这里取40伤害，介意可不选。'
const wuQiTips = '武器基础伤害（不含命中） + 太阳石的伤害总和。'
const touTips = '头盔（发钗）太阳石的伤害。'
const lingShiShangTips = '灵饰主属性伤害 + 副属性伤害的总和。'
const lingShiGuTips = '灵饰副属性的固伤总和。'
const zhongGuTips = '锐不可当固伤总和（记得加上套装生效词条的固伤）。'
const yaoXieGuTips = '活动腰带 + 活动鞋子的固伤总和。'
const anQiMingTips = '暗器命中 + 暗器追加伤害总和。'

let formRef = ref<FormInstance>()

const initialForm = {
  menPai: 'wudi',
  level: 129, // 等级
  jiNeng: 150, // 技能
  minJie: 1119, // 敏捷
  faXiu: 21, // 法修
  // 伤害
  wuQi: 474, // 武器伤害
  tou: 40, // 头饰伤害
  lingShiShang: 51, // 灵饰伤害
  // 固伤
  lingShiGu: 57, // 灵饰固伤
  zhongGu: 40, // 钟灵石固伤
  yaoXieGu: 63, // 腰鞋固伤
  // 符石
  fuShiZuHe: 1, // 符石组合
  fuShiGu: 8, // 固伤符石数量
  fuShiShang: 0, // 伤害符石
  // 其它
  faBao: 0, // 法宝
  zhenFa: 1, // 阵法
  miBao: 0.02, // 帮派秘宝
  shangHaiFu: 0, // 伤害符
  shenMuFu: 0, // 神木符
  anQi: 160, // 暗器技能
  anQiMing: 100 // 暗器命中
}
let form = reactive({ ...initialForm })

// 保存提交后的表单值，没有响应式。防止计算结果数据，与表单数据污染。确保点击计算按钮后，才从新计算表单数据
let submittedFormValue: typeof initialForm = JSON.parse(JSON.stringify(initialForm))
submittedFormValue.level = 0

let rules = reactive<FormRules<typeof form>>({
  jiNeng: [{ required: true, message: '值不能为空', trigger: 'blur' }],
  minJie: [{ required: true, message: '值不能为空', trigger: 'blur' }],
  faXiu: [{ required: true, message: '值不能为空', trigger: 'blur' }],
  wuQi: [{ required: true, message: '值不能为空', trigger: 'blur' }],
  tou: [{ required: true, message: '值不能为空', trigger: 'blur' }],
  lingShiShang: [{ required: true, message: '值不能为空', trigger: 'blur' }],
  lingShiGu: [{ required: true, message: '值不能为空', trigger: 'blur' }],
  zhongGu: [{ required: true, message: '值不能为空', trigger: 'blur' }],
  yaoXieGu: [{ required: true, message: '值不能为空', trigger: 'blur' }],
  fuShiGu: [{ required: true, message: '值不能为空', trigger: 'blur' }],
  fuShiShang: [{ required: true, message: '值不能为空', trigger: 'blur' }],
  miBao: [{ required: true, message: '值不能为空', trigger: 'blur' }],
  shangHaiFu: [{ required: true, message: '值不能为空', trigger: 'blur' }],
  shenMuFu: [{ required: true, message: '值不能为空', trigger: 'blur' }],
  anQi: [{ required: true, message: '值不能为空', trigger: 'blur' }],
  anQiMing: [{ required: true, message: '值不能为空', trigger: 'blur' }]
})

/**
 * 结果数据默认值
 */
let guShangResultInitialValue = {
  menPai: '女儿村',
  kangXing: 0,
  title1: '技能',
  title2: '暗器',
  miao1: 7,
  miao2: 7,
  maxMiao: 7,
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

/**
 * 结果数据
 */
let guShangResult = reactive({ ...guShangResultInitialValue })

const menPaiOptions = [
  { label: '女儿村', value: 'nver' },
  { label: '地府', value: 'difu' },
  { label: '无底洞', value: 'wudi' },
  { label: '普陀山', value: 'putuo' }
]

const zhenFaOptions = [
  { label: '天覆阵', value: 1.15 },
  { label: '雷绝阵', value: 1.2 },
  { label: '无', value: 1 }
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

const resultMiaoOptions = reactive([
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
 * 重置结果值
 */
function reset() {
  Object.assign(guShangResult, guShangResultInitialValue)
}

/**
 * 计算技能等级所对应最大秒系数
 * @param jiNeng 技能等级
 * @param menPai 门派
 */
function getMaxMiao(jiNeng?: number, menPai?: string): number {
  if (!jiNeng) {
    jiNeng = form.jiNeng || 0
  }
  if (!menPai) {
    menPai = form.menPai || 'nver'
  }
  // 默认最多能秒的数量
  let maxMiao = 7
  switch (menPai) {
    case 'nver':
    case 'difu':
      maxMiao = jiNeng >= 150 ? 7 : jiNeng >= 125 ? 6 : jiNeng >= 100 ? 5 : jiNeng >= 75 ? 4 : jiNeng >= 50 ? 3 : 2
      break
    case 'wudi':
      maxMiao = jiNeng >= 140 ? 5 : jiNeng >= 105 ? 4 : jiNeng >= 70 ? 3 : 2
      break
    case 'putuo':
      maxMiao = jiNeng >= 180 ? 6 : jiNeng >= 135 ? 5 : jiNeng >= 90 ? 4 : jiNeng >= 45 ? 3 : 2
      break
  }
  return maxMiao
}

/**
 * 根据秒数，修改miaoOption
 * @param value 最多能秒的数量
 */
function miaoOptionChange(value: number) {
  guShangResult.miao1 = value
  guShangResult.miao2 = value
  for (let i = 0; i < resultMiaoOptions.length; i++) {
    resultMiaoOptions[i].disabled = false
    if (i > value - 1) {
      resultMiaoOptions[i].disabled = true
    }
  }
}

/**
 * 分灵系数
 * @param miao 当前秒数
 */
function getFenLing(miao: number): number {
  let { menPai } = form
  let { maxMiao } = guShangResult
  let xiShu = 1

  switch (menPai) {
    case 'nver':
      xiShu = 1.1 - Math.floor(0.1 * miao * 10) / 10
      if (xiShu < 0.6) {
        xiShu = 0.6
      }
      break
    case 'difu':
      xiShu = (maxMiao - miao) / 10 + 1
      break
    case 'wudi':
      xiShu = 1.1 - Math.floor(0.1 * miao * 10) / 10
      break
    case 'putuo':
      xiShu = 1.1 - Math.floor(0.1 * miao * 10) / 10
      if (xiShu < 0.55) {
        xiShu = 0.55
      }
      break
  }
  return xiShu
}

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
 * 结果门派标题
 */
function changeResultTitle() {
  switch (form.menPai) {
    case 'nver':
      guShangResult.menPai = '女儿村'
      guShangResult.title1 = '技能'
      guShangResult.title2 = '暗器'
      break
    case 'difu':
      guShangResult.menPai = '地府'
      guShangResult.title1 = '白天'
      guShangResult.title2 = '黑夜'
      break
    case 'wudi':
      guShangResult.menPai = '无底洞'
      guShangResult.title1 = '秒脉'
      guShangResult.title2 = '奶脉'
      break
    case 'putuo':
      guShangResult.menPai = '普陀山'
      guShangResult.title1 = '技能'
      guShangResult.title2 = '无'
      break
    default:
      guShangResult.menPai = '女儿村'
      guShangResult.title1 = '技能'
      guShangResult.title2 = '暗器'
      break
  }
}

/** 是否收缩 */
let isCollapse = ref(true)
/**
 * slide 点击事件，展开或收缩表单
 */
function onClickSlide() {
  isCollapse.value = !isCollapse.value
}

/**
 * 计算结果按钮事件
 * @param formEl 表单Ref
 */
function onSumitClick(formEl: FormInstance | undefined) {
  if (!formEl) return
  formEl.validate(valid => {
    if (valid) {
      submittedFormValue = JSON.parse(JSON.stringify(toRaw(form)))
      changeResultView()
      handlerResult()
    }
  })
}

/**
 * 怪物抗性改变触发事件
 */
function onKangXingChange() {
  handlerResult()
}

/**
 * 改变结果项视图
 */
function changeResultView() {
  changeResultTitle()
  let maxMiao = getMaxMiao()
  guShangResult.maxMiao = maxMiao
  miaoOptionChange(maxMiao)
}

/**
 * 选择秒几事件
 */
function onMiaoChange() {
  handlerResult()
}

/**
 * 计算结果值
 */
function handlerResult() {
  if (submittedFormValue.level === 0) {
    return
  }
  switch (form.menPai) {
    case 'nver':
      guShangResult.result1 = resultNvEr(guShangResult.miao1)
      guShangResult.result2 = resultNvEr(guShangResult.miao2, true)
      break
    case 'difu':
      guShangResult.result1 = resultDiFu(guShangResult.miao1)
      guShangResult.result2 = resultDiFu(guShangResult.miao2, true)
      break
    case 'wudi':
      guShangResult.result1 = resultWuDi(guShangResult.miao1)
      guShangResult.result2 = resultWuDi(guShangResult.miao2, true)
      break
    case 'putuo':
      break
    default:
      break
  }
}

/**
 * 女儿伤害结果计算
 *
 * @param miao 当前秒数
 * @param isAnQi true: 暗器，false：技能
 */
function resultNvEr(miao: number, isAnQi?: boolean) {
  let { anQiMing, zhenFa, fuShiGu, shenMuFu, ...formValue } = submittedFormValue

  // 暗器技巧
  let anQiC = Math.floor((formValue.anQi * formValue.anQi) / 150) + formValue.anQi
  // 伤害总和：武器 + 头饰 + 灵饰伤害 + 符石伤害 + 伤害符
  let shangHaiSum =
    formValue.wuQi +
    formValue.tou +
    formValue.lingShiShang +
    formValue.fuShiShang +
    formValue.shangHaiFu +
    formValue.faBao

  let zongShangC = 0
  let jiNengC = 0
  if (isAnQi) {
    // 技能/2
    jiNengC = Math.floor(formValue.jiNeng / 2)
    // 暗器命中 + 追加伤害 + 50
    let anqiMingC = anQiMing + 50
    let minJieC = Math.floor(formValue.minJie * 0.3)
    let guShangC = Math.floor((formValue.lingShiGu + formValue.zhongGu + formValue.yaoXieGu) * 0.8)
    zongShangC = anqiMingC + minJieC + guShangC
  } else {
    // 技能*技能/400 + 技能/2
    jiNengC = Math.floor((formValue.jiNeng * formValue.jiNeng) / 400) + Math.floor(formValue.jiNeng / 2)
    // (武器 + 头饰 + 灵饰伤害 + 符石伤害 + 伤害符) * 0.18
    let shangHaiC = Math.floor(shangHaiSum * 0.18)
    let minJieC = Math.floor(formValue.minJie * 0.5)
    let guShangC = Math.floor((formValue.lingShiGu + formValue.zhongGu + formValue.yaoXieGu) * 0.83)
    zongShangC = shangHaiC + minJieC + guShangC
  }

  // 天阵1.25，雷阵1.14
  let zhenFaC = zhenFa === 1.15 ? 1.25 : zhenFa === 1.2 ? 1.14 : 1
  let fenLingC = getFenLing(miao)
  // 阵法 × 分灵系数
  let xiShuC = Math.floor(zhenFaC * fenLingC * 100) / 100
  let xiuLianPercentC = getXiuLianPercent(formValue.faXiu, guShangResult.kangXing)
  let xiuLianGuC = getXiuLianGu(formValue.faXiu, guShangResult.kangXing)
  let fuShiZuHeC = getFuShiZuHeValue(formValue.menPai, formValue.fuShiZuHe)
  // 点选目标项
  let dianXuanC = Math.floor(shangHaiSum / 2)
  let miBaoC = formValue.miBao + 1

  // (技能 + 暗器技巧 + 伤害（暗器命中） + 敏捷 + 固伤) × 阵法分灵系数 + 符石固伤
  let zhenFaValue = Math.floor((jiNengC + anQiC + zongShangC) * xiShuC) + fuShiGu
  // zhenFaValue × 修炼差百分比 + 修炼固定结果 + 符石组合 + 神木符
  let xiuLianValue = Math.floor(zhenFaValue * xiuLianPercentC) + xiuLianGuC + fuShiZuHeC + shenMuFu
  // 主秒：(xiuLianValue + 点选目标项) × 帮派秘宝
  let primaryValue = Math.floor((xiuLianValue + dianXuanC) * miBaoC)
  // 副秒：xiuLianValue × 帮派秘宝
  let secondaryValue = Math.floor(xiuLianValue * miBaoC)
  // 总伤
  let totalValue = primaryValue + secondaryValue * (miao - 1)
  return {
    zhuMiao: primaryValue,
    fuMiao: miao < 2 ? 0 : secondaryValue,
    total: totalValue
  }
}

/**
 * 地府伤害结果计算
 * @param miao 当前秒数
 * @param dark true：黑夜，false：白天
 */
function resultDiFu(miao: number, isDark?: boolean) {
  let { fuShiGu, zhenFa, shenMuFu, ...formValue } = submittedFormValue
  // 技能
  let jiNengC = isDark
    ? Math.floor((Math.floor(formValue.jiNeng * 1.5) + 30) * 1.3)
    : Math.floor(formValue.jiNeng * 1.5) + 30
  // 伤害总和：武器 + 头饰 + 灵饰伤害 + 符石伤害 + 伤害符
  let shangHaiSum =
    formValue.wuQi +
    formValue.tou +
    formValue.lingShiShang +
    formValue.fuShiShang +
    formValue.shangHaiFu +
    formValue.faBao
  let shangHaiC = Math.floor(shangHaiSum * 0.15)
  let minJieC = Math.floor(formValue.minJie * 0.35)
  // let guXiShu = 1 - (1 * guShangResult.maxMiao) / 10 < 0.5 ? 0.5 : 1 - (1 * guShangResult.maxMiao) / 10
  let guShangC = Math.floor((formValue.lingShiGu + formValue.zhongGu + formValue.yaoXieGu) * 0.5)
  let fuShiZuHeC = getFuShiZuHeValue(formValue.menPai, formValue.fuShiZuHe)
  // 点选目标聚伤系数
  let juShangXiShu = getFenLing(miao)
  let xiuLianPercentC = getXiuLianPercent(formValue.faXiu, guShangResult.kangXing)
  let xiuLianGuC = getXiuLianGu(formValue.faXiu, guShangResult.kangXing)
  // 点选目标项
  let dianXuanC = Math.floor(shangHaiSum / 2)
  let miBaoC = formValue.miBao + 1

  // (技能 + 伤害 + 敏捷 + 灵饰固伤 + 符石组合) × 阵法
  let zhenFaValue = Math.floor((jiNengC + shangHaiC + minJieC + guShangC + fuShiZuHeC) * zhenFa)
  // 点选聚伤
  let juShangValue = Math.floor(zhenFaValue * juShangXiShu)
  // 主秒：((juShangValue + 固伤符石) × 修炼百分比 + 修炼固定结果 + 神木符 + 点选目标项) × 帮派秘宝
  let primaryValue = Math.floor(
    (Math.floor((juShangValue + fuShiGu) * xiuLianPercentC) + xiuLianGuC + shenMuFu + dianXuanC) * miBaoC
  )
  // 副秒：((zhenFaValue + 固伤符石) × 修炼百分比 + 修炼固定结果 + 神木符) × 帮派秘宝
  let secondaryValue = Math.floor(
    (Math.floor((zhenFaValue + fuShiGu) * xiuLianPercentC) + xiuLianGuC + shenMuFu) * miBaoC
  )
  // 总伤
  let totalValue = primaryValue + secondaryValue * (miao - 1)
  return {
    zhuMiao: primaryValue,
    fuMiao: miao < 2 ? 0 : secondaryValue,
    total: totalValue
  }
}

/**
 * 无底洞伤害结果计算
 * @param miao 当前秒数
 * @param isNai true：奶脉，false：秒脉
 */
function resultWuDi(miao: number, isNai?: boolean) {
  let { fuShiGu, zhenFa, shenMuFu, ...formValue } = submittedFormValue
  // 技能
  let jiNengC = Math.floor(formValue.jiNeng * 1.5) + 20
  // 伤害总和：武器 + 头饰 + 灵饰伤害 + 符石伤害 + 伤害符
  let shangHaiSum =
    formValue.wuQi +
    formValue.tou +
    formValue.lingShiShang +
    formValue.fuShiShang +
    formValue.shangHaiFu +
    formValue.faBao
  // 伤害
  let shangHaiC = Math.floor(shangHaiSum * 0.125)
  let minJieC = Math.floor(formValue.minJie * 0.7)
  let guShangC = formValue.lingShiGu + formValue.zhongGu + formValue.yaoXieGu
  let fuShiZuHeC = getFuShiZuHeValue(formValue.menPai, formValue.fuShiZuHe)
  // 分灵
  let fenLingC = getFenLing(miao)
  let xiuLianPercentC = getXiuLianPercent(formValue.faXiu, guShangResult.kangXing)
  let xiuLianGuC = getXiuLianGu(formValue.faXiu, guShangResult.kangXing)
  // 点选目标项
  let dianXuanC = Math.floor(shangHaiSum / 2)
  let miBaoC = formValue.miBao + 1

  // 奶脉装备系数
  let xiShu1 = isNai ? 1 : 2
  // 奶脉经脉系数
  let xiShu2 = isNai ? 0.7 : 1

  // ((技能 + 伤害) × 经脉第一丹系数 + 敏捷 + 灵饰固伤 + 符石组合) × 阵法
  let zhenFaValue = Math.floor(((jiNengC + shangHaiC) * xiShu1 + minJieC + guShangC + fuShiZuHeC) * zhenFa)
  // (zhenFaValue × 分灵 + 固伤符石) × 修炼百分比 + 修炼固定结果
  let xiuLianValue = Math.floor((Math.floor(zhenFaValue * fenLingC) + fuShiGu) * xiuLianPercentC) + xiuLianGuC
  // 主秒：((zhenFaValue × (金莲/无)) + 神木符 + 点选目标项) × 帮派秘宝
  let primaryValue = Math.floor((Math.floor(xiuLianValue * xiShu2) + shenMuFu + dianXuanC) * miBaoC)
  // 副秒 ((zhenFaValue × (金莲/无)) + 神木符) × 帮派秘宝
  let secondaryValue = Math.floor((Math.floor(xiuLianValue * xiShu2) + shenMuFu) * miBaoC)
  // 总伤
  let totalValue = primaryValue + secondaryValue * (miao - 1)
  return {
    zhuMiao: primaryValue,
    fuMiao: miao < 2 ? 0 : secondaryValue,
    total: totalValue
  }
}

/**
 * 普陀山伤害结果计算
 * @param miao 当前秒数
 */
function resultPuTuo(miao: number) {
  let { fuShiGu, zhenFa, shenMuFu, ...formValue } = submittedFormValue
  // 技能
  let jiNengC = formValue.jiNeng * 3 + 50
  // 伤害总和：武器 + 头饰 + 灵饰伤害 + 符石伤害 + 伤害符
  let shangHaiSum =
    formValue.wuQi +
    formValue.tou +
    formValue.lingShiShang +
    formValue.fuShiShang +
    formValue.shangHaiFu +
    formValue.faBao
  // 伤害
  let shangHaiC = Math.floor((formValue.wuQi + formValue.shangHaiFu) * 0.24)
  let minJieC = Math.floor(formValue.minJie * 0.7)
  let guShangC = formValue.lingShiGu + formValue.zhongGu + formValue.yaoXieGu
  let fuShiZuHeC = getFuShiZuHeValue(formValue.menPai, formValue.fuShiZuHe)
  // 金刚杵
  let jinGangChuC = 0

  let fenLingC = getFenLing(miao)
  let xiuLianPercentC = getXiuLianPercent(formValue.faXiu, guShangResult.kangXing)
  let xiuLianGuC = getXiuLianGu(formValue.faXiu, guShangResult.kangXing)
  // 点选目标项
  let dianXuanC = Math.floor(shangHaiSum / 2)
  let miBaoC = formValue.miBao + 1

  // (技能 + 伤害 + 敏捷 + 灵饰固伤 + 符石组合 + 金刚杵)× 阵法
  let zhenFaValue = Math.floor((jiNengC + shangHaiC + minJieC + guShangC + fuShiZuHeC + jinGangChuC) * zhenFa)
  // (zhenFaValue × 分灵 + 固伤符石) × 修炼百分比 + 修炼固定结果
  let xiuLianValue = Math.floor((Math.floor(zhenFaValue * fenLingC) + fuShiGu) * xiuLianPercentC) + xiuLianGuC
  // 主秒： (xiuLianValue + 神木符 + 点选目标项) × 帮派秘宝
  let primaryValue = Math.floor((xiuLianValue + shenMuFu + dianXuanC) * miBaoC)
  // 副秒: (xiuLianValue + 神木符) × 帮派秘宝
  let secondaryValue = Math.floor((xiuLianValue + shenMuFu) * miBaoC)
  // 总伤
  let totalValue = primaryValue + secondaryValue * (miao - 1)
  return {
    zhuMiao: primaryValue,
    fuMiao: miao < 2 ? 0 : secondaryValue,
    total: totalValue
  }
}

/**
 * 修炼百分比
 * @param faXiu 人物法修
 * @param kangXing 怪物抗性
 */
function getXiuLianPercent(faXiu: number, kangXing: number) {
  return Math.floor((faXiu - kangXing) * 0.02 * 100) / 100 + 1
}

/**
 * 修炼固定结果
 * @param faXiu 人物法修
 * @param kangXing 怪物抗性
 */
function getXiuLianGu(faXiu: number, kangXing: number) {
  return (faXiu - kangXing) * 5
}
</script>

<template>
  <el-card shadow="hover" class="card">
    <div class="collapse-container" :class="{ 'collapse-hidden': !isCollapse }">
      <el-form label-width="auto" ref="formRef" :model="form" :rules="rules" class="collapse-content">
        <el-row :gutter="20">
          <el-col :xs="24" :sm="24" :md="12" :lg="6">
            <el-form-item label="门派" prop="menPai">
              <el-select v-model="form.menPai" placeholder="请选择门派">
                <el-option v-for="item in menPaiOptions" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :xs="24" :sm="12" :md="12" :lg="6">
            <el-form-item label="等级" prop="level">
              <el-input-number readonly :controls="false" :min="1" :max="175" :precision="0" v-model="form.level" />
            </el-form-item>
            <el-form-item label="技能" prop="jiNeng">
              <el-input-number :controls="false" :min="0" :max="180" v-model="form.jiNeng" />
            </el-form-item>
            <el-form-item label="敏捷" prop="minJie">
              <el-input-number :controls="false" :min="0" :precision="0" v-model="form.minJie" />
            </el-form-item>
            <el-form-item label="法修" prop="faXiu">
              <el-input-number :controls="false" :min="0" :max="25" v-model="form.faXiu" />
            </el-form-item>
            <el-form-item label="阵法" prop="zhenFa">
              <el-select v-model="form.zhenFa">
                <el-option v-for="item in zhenFaOptions" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item prop="faBao">
              <template #label>
                <div style="display: flex; align-items: center">
                  <span>法宝</span>
                  <el-tooltip placement="top" :content="faBaoTips">
                    <el-icon class="form-icon">
                      <InfoFilled />
                    </el-icon>
                  </el-tooltip>
                </div>
              </template>
              <el-select v-model="form.faBao">
                <el-option v-for="item in faBaoOptions" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :xs="24" :sm="12" :md="12" :lg="6">
            <el-form-item prop="wuQi">
              <template #label>
                <div style="display: flex; align-items: center">
                  <span>武器伤害</span>
                  <el-tooltip placement="top" :content="wuQiTips">
                    <el-icon class="form-icon">
                      <InfoFilled />
                    </el-icon>
                  </el-tooltip>
                </div>
              </template>
              <el-input-number :controls="false" :min="0" :precision="0" v-model="form.wuQi" />
            </el-form-item>

            <el-form-item prop="tou">
              <template #label>
                <div style="display: flex; align-items: center">
                  <span>头饰伤害</span>
                  <el-tooltip placement="top" :content="touTips">
                    <el-icon class="form-icon">
                      <InfoFilled />
                    </el-icon>
                  </el-tooltip>
                </div>
              </template>
              <el-input-number :controls="false" :min="0" v-model="form.tou" />
            </el-form-item>

            <el-form-item prop="lingShiShang">
              <template #label>
                <div style="display: flex; align-items: center">
                  <span>灵饰伤害</span>
                  <el-tooltip placement="top" :content="lingShiShangTips">
                    <el-icon class="form-icon">
                      <InfoFilled />
                    </el-icon>
                  </el-tooltip>
                </div>
              </template>
              <el-input-number :controls="false" :min="0" :precision="0" v-model="form.lingShiShang" />
            </el-form-item>

            <el-form-item prop="lingShiGu">
              <template #label>
                <div style="display: flex; align-items: center">
                  <span>灵饰固伤</span>
                  <el-tooltip placement="top" :content="lingShiGuTips">
                    <el-icon class="form-icon">
                      <InfoFilled />
                    </el-icon>
                  </el-tooltip>
                </div>
              </template>
              <el-input-number :controls="false" :min="0" v-model="form.lingShiGu" />
            </el-form-item>

            <el-form-item prop="zhongGu">
              <template #label>
                <div style="display: flex; align-items: center">
                  <span>锐不固伤</span>
                  <el-tooltip placement="top" :content="zhongGuTips">
                    <el-icon class="form-icon">
                      <InfoFilled />
                    </el-icon>
                  </el-tooltip>
                </div>
              </template>
              <el-input-number :controls="false" :min="0" :precision="0" v-model="form.zhongGu" />
            </el-form-item>

            <el-form-item prop="yaoXieGu">
              <template #label>
                <div style="display: flex; align-items: center">
                  <span>腰鞋固伤</span>
                  <el-tooltip placement="top" :content="yaoXieGuTips">
                    <el-icon class="form-icon">
                      <InfoFilled />
                    </el-icon>
                  </el-tooltip>
                </div>
              </template>
              <el-input-number :controls="false" :min="0" v-model="form.yaoXieGu" />
            </el-form-item>
          </el-col>

          <el-col :xs="24" :sm="12" :md="12" :lg="6">
            <el-form-item label="符石组合" prop="fuShiZuHe">
              <el-select v-model="form.fuShiZuHe">
                <el-option v-for="item in fuShiZuHeOptions" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>

            <el-form-item prop="fuShiGu">
              <template #label>
                <div style="display: flex; align-items: center">
                  <span>符石固伤</span>
                  <el-tooltip placement="top" :content="fuShiGuTips">
                    <el-icon class="form-icon">
                      <InfoFilled />
                    </el-icon>
                  </el-tooltip>
                </div>
              </template>
              <el-input-number :controls="false" :min="0" v-model="form.fuShiGu" />
            </el-form-item>

            <el-form-item prop="fuShiShang">
              <template #label>
                <div style="display: flex; align-items: center">
                  <span>符石伤害</span>
                  <el-tooltip placement="top" :content="fuShiShangTips">
                    <el-icon class="form-icon">
                      <InfoFilled />
                    </el-icon>
                  </el-tooltip>
                </div>
              </template>
              <el-input-number :controls="false" :min="0" v-model="form.fuShiShang" />
            </el-form-item>

            <el-form-item label="帮派秘宝" prop="miBao">
              <el-input-number :controls="false" :min="0" :max="1" :precision="2" :step="0.1" v-model="form.miBao" />
            </el-form-item>
          </el-col>

          <el-col :xs="24" :sm="12" :md="12" :lg="6">
            <el-form-item label="伤害符" prop="shangHaiFu">
              <el-input-number :controls="false" :min="0" v-model="form.shangHaiFu" />
            </el-form-item>

            <el-form-item label="神木符" prop="shenMuFu">
              <el-input-number :controls="false" :min="0" :precision="0" v-model="form.shenMuFu" />
            </el-form-item>

            <template v-if="form.menPai === 'nver'">
              <el-form-item label="暗器技巧" prop="anQi">
                <el-input-number :controls="false" :min="0" v-model="form.anQi" />
              </el-form-item>
              <el-form-item prop="anQiMing">
                <template #label>
                  <div style="display: flex; align-items: center">
                    <span>暗器命中</span>
                    <el-tooltip placement="top" :content="anQiMingTips">
                      <el-icon class="form-icon">
                        <InfoFilled />
                      </el-icon>
                    </el-tooltip>
                  </div>
                </template>
                <el-input-number :controls="false" :min="0" v-model="form.anQiMing" />
              </el-form-item>
            </template>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <div class="slide-up-down">
      <div class="slide-icon" @click="onClickSlide">
        <el-icon>
          <ArrowUp v-if="isCollapse" />
          <ArrowDown v-if="!isCollapse" />
        </el-icon>
      </div>
    </div>

    <el-row :gutter="20" class="result">
      <el-col :xs="24" :sm="24" :md="6" :lg="4">
        <el-button v-show="isCollapse" class="result-button" type="primary" @click="onSumitClick(formRef)">
          计算结果
        </el-button>
      </el-col>
      <el-col :xs="24" :sm="24" :md="18" :lg="20">
        <div class="result-content">
          <div class="content-padding header border-bottom">
            <strong class="header-title">{{ guShangResult.menPai }}</strong>
            <div class="header-extra">
              <span>怪物抗性：</span>
              <el-input-number
                v-model="guShangResult.kangXing"
                :controls="false"
                :min="0"
                :max="25"
                size="small"
                style="width: 60px"
                @change="onKangXingChange"
              />
            </div>
          </div>

          <div class="content-box content-padding border-right">
            <div class="text-row">
              <span class="title">{{ guShangResult.title1 }}</span>
              <el-select size="small" v-model="guShangResult.miao1" style="width: 60px" @change="onMiaoChange">
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
              <el-text>主秒：</el-text>
              <span>{{ guShangResult.result1.zhuMiao }}</span>
            </div>
            <div class="text-row">
              <el-text>副秒：</el-text>
              <span>{{ guShangResult.result1.fuMiao }}</span>
            </div>
            <div class="text-row">
              <el-text>总输出：</el-text>
              <span>{{ guShangResult.result1.total }}</span>
            </div>
          </div>

          <div class="content-box content-padding" v-show="form.menPai !== 'putuo'">
            <div class="text-row">
              <span class="title">{{ guShangResult.title2 }}</span>
              <el-select size="small" v-model="guShangResult.miao2" style="width: 60px" @change="onMiaoChange">
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
              <el-text>主秒：</el-text>
              <span>{{ guShangResult.result2.zhuMiao }}</span>
            </div>
            <div class="text-row">
              <el-text>副秒：</el-text>
              <span>{{ guShangResult.result2.fuMiao }}</span>
            </div>
            <div class="text-row">
              <el-text>总输出：</el-text>
              <span>{{ guShangResult.result2.total }}</span>
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

.card {
  border-top: 20px solid var(--el-color-primary-light-7);

  .collapse-container {
    display: grid;
    grid-template-rows: 1fr;
    overflow: hidden;
    transition: all 0.3s;

    .collapse-content {
      min-height: 0;
    }
  }

  .collapse-hidden {
    grid-template-rows: 0fr;
  }
}

.slide-up-down {
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  .slide-icon {
    width: 60px;
    cursor: pointer;
    text-align: center;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    color: var(--el-color-primary);
    background-color: var(--el-color-primary-light-8);
    transition: 0.1s;
    &:hover {
      background-color: var(--el-color-primary-light-7);
    }
    &:active {
      background-color: var(--el-color-primary-light-5);
    }
  }
}

.el-input-number {
  width: 100%;
}
.form-icon {
  cursor: pointer;
  margin-left: 2px;
  color: #f49090;
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
    grid-template-rows: 50px auto;
    grid-template-columns: 1fr 1fr;
    max-width: 300px;
    border: 1px solid var(--el-border-color);

    .content-padding {
      padding: 10px;
    }

    .border-bottom {
      border-bottom: 1px solid var(--el-border-color);
    }

    .border-right {
      border-right: 1px solid var(--el-border-color);
    }

    .header {
      grid-column-start: 1;
      grid-column-end: 3;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .header-title {
        font-size: 20px;
      }

      .header-extra {
        font-size: 14px;
      }
    }

    .content-box {
      display: flex;
      flex-wrap: wrap;
      align-content: space-between;

      .text-row {
        flex-basis: 100%;
        display: flex;
        justify-content: space-between;

        &:first-child {
          margin-bottom: 8px;
        }

        .title {
          color: #b88230;
          font-weight: bold;
          font-size: 18px;
        }
      }
    }
  }
}
</style>
