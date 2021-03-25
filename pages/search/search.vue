<template>
	<view class="container" :style="{opacity:pageOpacity}">
		<view class="header" :style="{paddingTop: searchInput.top + 'px'}">
			<view class="search">
				<view class="search-input" :style="{width:searchInput.width+'px', height:searchInput.height+'px'}">
					<image class="search-icon" src="../../static/icon/search.png" mode="widthFix" lazy-load @load="onoff='1'"></image>
					<input type="text" placeholder="搜索商品关键字..." maxlength="32" confirm-type="search" v-model="query" @confirm="searchList">
				</view>
			</view>
		</view>

		<view class="coupon" :style="{marginTop: headerHeight + 'px'}">
      <data-list class="data-list" ref="list" @load="handleLoad" @refresh="handleRefresh" @scroll="handleScroll"></data-list>
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
				/**
				 * 状态栏高度、搜索框位置（胶囊对其）
				 **/
				headerHeight: 0,
				searchInput: {
					width: 0,
					height: 0,
					top: 0,
					inputVal: ''
				},
			}
		},
		onLoad() {
			// 胶囊宽高坐标
			this.searchInput.width = (this.$systemInfoSync.windowWidth - this.$menuButtonRect.width) - 24
			this.searchInput.height = this.$menuButtonRect.height || 32
			this.searchInput.top = this.$menuButtonRect.top || 12
			this.headerHeight = this.searchInput.top + this.searchInput.height + 36 + 12;
		},
		onReady() {
			this.pageOpacity = 1
		},
		methods: {
      handleLoad() {

      },
      handleRefresh() {

      },
      handleScroll() {

      },
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
page {
	background-color: #fff;
}

.container {
	transition: all 0.5s linear;
	font-size: 14px;
	line-height: 24px;
	position: relative;
}

.header {
	box-sizing: border-box;
}

/*搜索框*/
.search {
	display: flex;
	position: fixed;
	width: 100%;
	padding: 0 24rpx;
	box-sizing: border-box;

	.search-input {
		height: 100%;
		border-radius: 20px;
		background: #F2F2F2;
		color: rgba(68, 66, 66, 0.63);
		display: flex;
		/* justify-content: center; */
		align-items: center;

		input {
			padding-left: 18rpx;
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
