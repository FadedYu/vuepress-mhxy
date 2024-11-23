import { defineClientConfig } from 'vuepress/client'
import ElementPlus from 'element-plus'
// import './styles/element.scss'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'

export default defineClientConfig({
  enhance({ app, router, siteData }) {
    app.use(ElementPlus)
  },
  setup() {},
  layouts: {},
  rootComponents: []
})
