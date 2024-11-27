import { defineClientConfig } from 'vuepress/client'

import './styles/element/index.scss'
import ElementPlus from 'element-plus'

export default defineClientConfig({
  enhance({ app, router, siteData }) {
    app.use(ElementPlus)
  },
  setup() {},
  layouts: {},
  rootComponents: []
})
