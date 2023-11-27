import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
// import fuEdit from './components/fuEdit.vue'
// 引入初始化样式文件
import '@/assets/common.scss'
// 引入edit的css文件
import '@wangeditor/editor/dist/css/style.css'
// 引入编辑器的样式
const app = createApp(App)
// 引入自动化持久化存储
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
// app.component('myEdit', fuEdit)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)

app.mount('#app')
