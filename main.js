import Vue from 'vue'
import App from './App'
import { toast, loading, toLogin, toBack, toHome } from './common/global.js'

// 字体图标库
import './common/iconfont/iconfont.css'

Vue.config.productionTip = false

Vue.prototype.$loading = loading
Vue.prototype.$toast = toast
Vue.prototype.$toLogin = toLogin
Vue.prototype.$toBack = toBack
Vue.prototype.$toHome = toHome
// 兼容H5
Vue.prototype.$systemInfoSync = uni.getSystemInfoSync()
Vue.prototype.$menuButtonRect = uni.getMenuButtonBoundingClientRect()

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
