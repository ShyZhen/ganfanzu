<template>
	<view class="container" :style="{opacity:pageOpacity}">
	<view class="like-wrap">
		<template v-if="cardList && cardList.length > 0">
		<view class="margin-bottom" v-for="(item, index) in cardList" :key="index">
			<y-DiaryItem :obj="item" />
		</view>
		</template>
		<template v-else>
			<y-Empty />
		</template>
	</view>
	</view>
</template>

<script>
	import { mapState, mapActions } from 'vuex'

	var that;
	export default {
		data() {
			return {
				pageOpacity: 0,
				cardList: [],
				startNum: 1
			}
		},
		computed: {
			...mapState(['hasBinding', 'hasLogin']),
		},
		onLoad() {
			// 在需要登录的地方执行初始化方法
			this.initLoginState()

			// 判断登录状态 并跳转到首页
			if (!this.hasLogin) {
				this.$toast('需要先登录呢')
				setTimeout(() => {
					this.$toLogin()
				}, 1000);
			} else {
				that = this
				that.getDiary()
			}

		},
		onReady(e) {
			this.pageOpacity = 1
		},
		methods: {
			...mapActions(['initLoginState']),

			getDiary() {
				that.cardList = that.$store.state.diary.cardList
			},
		}
	}
</script>

<style lang="less" scoped>
	.container {
		transition: all 0.5s linear;
		font-size: 14px;
		line-height: 24px;
		position: relative;
	}
</style>
