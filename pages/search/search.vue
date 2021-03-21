<template>
	<view>
		<view class="search">
			<view class="search-input">
				<image class="search-icon" src="../../static/icon/search.png" mode="widthFix" lazy-load @load="onoff='1'"></image>
				<input type="text" placeholder="搜索商品关键字..." maxlength="32" confirm-type="search" v-model="query" @confirm="searchList">
			</view>
		</view>
	</view>
</template>

<script>
	import { getQueryList } from "@/apis/ganfan.js"
	export default {
		data() {
			return {
				query: '',
				platform: 'jd',
			}
		},
		methods: {
			/**
			 * 搜索当前平台
			 * @param query
			 */
			searchList() {

				uni.showModal({
					title: '通知',
					content: '本功能暂时受限,小埋正在紧急处理',
					showCancel: false,
					confirmText: '确定',
					success: function (res) {
						uni.navigateBack({
							delta: 1
						});
					},
				})
				return false





				let query = this.query.trim()
				if (!query) {
					return false
				}

				this.$loading('拼命拉取中...')
				let data = {
					platform: this.platform,
					page: 1,
					query: query,
				}
				getQueryList(data).then(res => {
					console.log(res)
					this.$loading(false)
				}).catch(err => {
					this.$toast('您的网络状态不太好哦~')
				})
			}
		}
	}
</script>

<style lang="scss">
/*搜索框*/
.search {
	display: flex;
	position: fixed;
	width: 100%;
	
	&-input {
		height: 100%;
		border-radius: 20px;
		background: #ffffffd6;
		color: rgba(68, 66, 66, 0.63);
		display: flex;
		/* justify-content: center; */
		align-items: center;
		input {
			padding-left: 30rpx;
			width: 75%;
		}
		image {
			padding-left: 20rpx;
			width: 20px;
			height: 20px;
		}
	}
}
</style>
