import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress/cli'
import { viteBundler } from '@vuepress/bundler-vite'
import { registerComponentsPlugin } from '@vuepress/plugin-register-components'
import { getDirname, path } from 'vuepress/utils'

const __dirname = getDirname(import.meta.url)

export default defineUserConfig({
  lang: 'zh-CN',

  title: 'VuePress',
  description: 'My first VuePress Site',

  theme: defaultTheme({
    logo: 'https://vuejs.press/images/hero.png',

    navbar: [
      {
        text: '首页',
        link: '/',
      },
      {
        text: '固伤计算',
        link: '/guide/calculation/index',
      },
    ],
    sidebar: [
      {
        text: '固伤计算',
        children: ['/guide/calculation/index', '/guide/calculation/expression'],
      },
      {
        text: '常用查询',
        children: ['/guide/document/monster/index'],
      },
    ],
  }),

  plugins: [
    // 动态注册组件
    registerComponentsPlugin({
      componentsDir: path.resolve(__dirname, './components'),
    }),
  ],

  bundler: viteBundler(),
})
