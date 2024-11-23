import type { SidebarArrayOptions } from '@vuepress/theme-default'
export const sidebar: SidebarArrayOptions = [
  {
    text: '固伤计算',
    children: [
      {
        text: '伤害计算',
        link: '/guide/calculation/index'
      },
      {
        text: '公式',
        link: '/guide/calculation/formula'
      }
    ]
  },
  {
    text: '常用工具',
    children: [
      {
        text: '配速计算工具',
        link: '/guide/tools/speed'
      }
    ]
  },
  {
    text: '常用查询',
    children: [
      {
        text: '怪物血量',
        link: '/guide/document/monster'
      }
    ]
  }
]
