import DefaultTheme from 'vitepress/theme'
import DemoBlock from './DemoBlock.vue'
import ReactDemo from './ReactDemo.vue'
import '@react-ui/pc/style.css'
import '@react-ui/h5/style.css'
import './demo.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('DemoBlock', DemoBlock)
    app.component('ReactDemo', ReactDemo)
  },
}