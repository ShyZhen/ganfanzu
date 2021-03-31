<template>
	<view class="back">
    <i class="back-icon iconfont iconjiantou" @tap="back"></i>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			};
		},
		methods: {
		  back() {
		    this.$toBack()
      }
		}
	}
</script>

<style lang="scss">
.back {
	width: 100%;
	height: 100%;
	display: flex;
  flex-direction: row;
	align-items: center;
	color: rgba(68, 66, 66, 0.63);
    &-icon{
      font-size: 20px;
      padding-left: 24rpx;
    }
}
</style>
