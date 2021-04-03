<template>
	<view>
		<view class="search" @click="toSearchPage" :style="{width: width + 'px', height: height + 'px', lineHeight: height + 'px'}">
			<image class="search-icon" src="../../static/icon/search.png" lazy-load></image>
			<view class="search-input">{{searchText}}</view>
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
				searchText: '搜索商品关键字...'
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
    background: rgba(255, 255, 255, 0.9);
    color: rgba(68, 66, 66, 0.63);
		&-icon{
			width: 20px;
			height: 20px;
			flex-shrink: 0;
		}
		.search-input {
      width: 100%;
			flex-shrink: 1;
			padding-left: 18rpx;
		}
	}
</style>
