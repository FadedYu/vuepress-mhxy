import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress/cli'
import { viteBundler } from '@vuepress/bundler-vite'
import { registerComponentsPlugin } from '@vuepress/plugin-register-components'
import { getDirname, path } from 'vuepress/utils'

const __dirname = getDirname(import.meta.url)

export default defineUserConfig({
  lang: 'zh-CN',

  title: 'VuePress',
  description: '这是我的第一个 VuePress 站点',

  theme: defaultTheme({
    locales: {
      '/': {
        prev: '上一页',
        next: '下一页',
        selectLanguageName: '简体中文',
        selectLanguageText: '选择语言',
        selectLanguageAriaLabel: '选择语言',
        editLinkText: '在 GitHub 上编辑此页',
        editLink: false,
        lastUpdatedText: '上次更新',
        contributorsText: '贡献者',
        tip: '提示',
        warning: '注意',
        danger: '警告',
        // 404 page
        notFound: [
          '这里什么都没有',
          '我们怎么到这来了？',
          '这是一个 404 页面',
          '看起来我们进入了错误的链接'
        ],
        backToHome: '返回首页',
        // a11y
        openInNewWindow: '在新窗口打开',
        toggleColorMode: '切换颜色模式',
        toggleSidebar: '切换侧边栏'
      }
    },

    logo: 'https://vuejs.press/images/hero.png',

    navbar: [
      {
        text: '首页',
        link: '/'
      },
      {
        text: '固伤计算',
        link: '/guide/calculation/index'
      }
    ],
    sidebar: [
      {
        text: '固伤计算',
        children: ['/guide/calculation/index', '/guide/calculation/formula']
      },
      {
        text: '常用查询',
        children: ['/guide/document/monster/index']
      }
    ]
  }),

  plugins: [
    // 动态注册组件
    registerComponentsPlugin({
      componentsDir: path.resolve(__dirname, './components')
    })
  ],

  bundler: viteBundler()
})
