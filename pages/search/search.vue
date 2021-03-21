<template>
	<view>
		<view class="search">
			<view class="search-input">
				<image class="search-icon" src="../../static/icon/search.png" mode="widthFix" lazy-load @load="onoff='1'"></image>
				<input type="text" placeholder="搜索关键字..." maxlength="32" confirm-type="search">
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
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
