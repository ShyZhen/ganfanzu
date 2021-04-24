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
	import yEmpty from "../article/components/y-Empty/y-Empty";

	var that;
	export default {
		data() {
			return {
				pageOpacity: 0,
				cardList: [],
				startNum: 1,
				type: '',
				uuid: '',
			}
		},
		computed: {
			...mapState(['hasBinding', 'hasLogin']),
		},
		components:{
			yEmpty
		},
		onLoad(e) {
			// 在需要登录的地方执行初始化方法
			this.initLoginState()

			// 判断登录状态 并跳转到首页
			if (!this.hasLogin) {
				this.$toast('需要先登录呢')
				setTimeout(() => {
					this.$toLogin()
				}, 1000);
			} else {
				this.type = e.type
				this.uuid = e.id

				if (this.type === 'collect') {
					uni.setNavigationBarTitle({
						title: '我的收藏'
					})
					this.getMyCollect()

				} else {
					uni.setNavigationBarTitle({
						title: '我的日记'
					})
					this.getMyTimeline()
				}
			}
		},
		onReady(e) {
			this.pageOpacity = 1
		},
		methods: {
			...mapActions(['initLoginState']),

			getMyCollect() {

			},
			getMyTimeline() {
				
			}
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
