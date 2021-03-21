<template>
	<view>
		<view class="search" @click="toSearchPage" :style="{width: width + 'px', height: height + 'px', lineHeight: height + 'px'}">
			<image class="search-icon" src="../../static/icon/search.png" lazy-load></image>
			<text>{{searchText}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			width: {
				type: Number,
				default: 320,
			},
			height: {
				type: Number,
				default: 32,
			}
		},
		data() {
			return {
				searchText: '搜索附近吃喝玩乐'
			};
		},
		methods:{
			toSearchPage() {
				uni.navigateTo({
					url: '../../pages/search/search'
				});
			}
		}
	}
</script>

<style lang="scss">
	.search{
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		border-radius: 20px;
		background: #ffffff;
		color: rgba(68, 66, 66, 0.63);;
		&-icon{
			width: 64rpx;
			height: 64rpx;
			flex-shrink: 0;
		}
		&-text{
			flex-shrink: 1;
		}
	}
</style>
