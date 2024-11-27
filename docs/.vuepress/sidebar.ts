import type { SidebarArrayOptions } from '@vuepress/theme-default'
export const sidebar: SidebarArrayOptions = [
  {
    text: '常用工具',
    children: [
      {
        text: '人物固伤计算',
        link: '/guide/tools/gushang'
      },
      {
        text: '人宠配速计算',
        link: '/guide/tools/speed'
      }
    ]
  },
  {
    text: '常用查询',
    children: [
      {
        text: '人物固伤公式',
        link: '/guide/document/formula'
      },
      {
        text: '怪物血量',
        link: '/guide/document/monster'
      }
    ]
  }
]
