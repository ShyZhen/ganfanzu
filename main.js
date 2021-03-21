import Vue from 'vue'
import App from './App'
import { toast, loading, toLogin, toBack, toHome } from './common/global.js'

Vue.config.productionTip = false

Vue.prototype.$loading = loading
Vue.prototype.$toast = toast
Vue.prototype.$toLogin = toLogin
Vue.prototype.$toBack = toBack
Vue.prototype.$toHome = toHome
// 兼容H5
Vue.prototype.$systemInfoSync = uni.getSystemInfoSync() || {
	windowHeight: window.innerHeight,
	windowWidth: window.innerWidth
}
Vue.prototype.$menuButtonRect = uni.getMenuButtonBoundingClientRect() || {
	width: 0,
	height: 0,
	top: 0
}

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
