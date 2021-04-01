<template>
	<view class="container" :style="{opacity:pageOpacity}">
		<view class="header" :style="{paddingTop: searchInput.top + 'px'}">
			<view class="search-group" :style="{width:searchInput.width+'px', height:searchInput.height+'px'}">
				<v-search @confrim="confrimSearch"></v-search>
			</view>
		</view>
		<view class="coupon" :style="{marginTop: headerHeight + 'px'}">
			<view class="uni-product-list">
				<view v-for="(v, k) in productList" @click="toCoupon(v)" :key="k">
					<view class="uni-product">
						<view class="image-view">
							<image class="uni-product-image" :src="v.picture"></image>
						</view>
						<view class="uni-product-tip">{{v.seller_name}}</view>
						<view class="uni-product-title">{{v.item_title}}</view>
						<view class="uni-product-price">
							<text v-if="v.item_price !==v.item_final_price" class="uni-product-price-favour">￥{{v.item_price}}</text>
							<text class="uni-product-price-original">￥{{v.item_final_price}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { ERR_OK } from '@/common/config.js'
	import { getQueryList } from "@/apis/ganfan.js"
	export default {
		data() {
			return {
				query: '',
				platform: 'jd',
				// 搜索关键字列表
				searchKeyWordsList: [],
				// 搜索商品
				productList: [],
				page: 1,
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
			this.searchInput.width = this.$menuButtonRect.right - this.$menuButtonRect.width;
			this.searchInput.height = this.$menuButtonRect.height
			this.searchInput.top = this.$menuButtonRect.top
			this.headerHeight = this.searchInput.top + this.searchInput.height + 12;
		},
		onReady() {
			this.pageOpacity = 1
		},
		onReachBottom() {
			this.getProductList(++this.page)
		},
		methods: {
			// 关键词联想
			searchKeyWords() {
				
			},
			confrimSearch(query) {
				this.query = query;
				this.getProductList()
			},
			/**
			 * 搜索当前平台
			 * @param query
			 */
			getProductList(page = 1) {
				this.$loading('拼命拉取中...')
				let data = {
					platform: this.platform,
					page: page,
					query: this.query,
				}
				getQueryList(data).then(res => {
					if(res.code !== ERR_OK) {
						this.$toast(res.message)
						return;
					}
					const productList = res.data.map(product => {
						const {
							item_picture: picture,
							item_title: seller_name,
						} = product;
						
						return Object.assign(product, {
							seller_name,
							picture
						})
					})
					this.productList = this.productList.concat(productList)
					this.$loading(false)
				}).catch(err => {
					this.$toast('您的网络状态不太好哦~')
				})
			},
      toCoupon(item) {
        // 点击跳转到详情页
        uni.navigateTo({
          url: '../../pages/shop/detail?platform=jd&item='+encodeURIComponent(JSON.stringify(item))
        })
        return false;
      },
		}
	}
</script>

<style lang="scss">
.search-group{
	padding: 0 24rpx;
	box-sizing: border-box;
}
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
	position: fixed;
	top: 0;
	z-index: 99;
	width: 100%;
	padding-bottom: 12px;
	box-sizing: border-box;
	background-color: #fff;
}

.uni-product-list {
	display: flex;
	width: 100%;
	flex-wrap: wrap;
	flex-direction: row;
}

.uni-product {
	padding: 20rpx;
	display: flex;
	flex-direction: column;
}

.image-view {
	height: 330rpx;
	width: 330rpx;
	margin-bottom: 12rpx;
}

.uni-product-image {
	height: 330rpx;
	width: 330rpx;
}

.uni-product-title {
	width: 300rpx;
	word-break: break-all;
	display: -webkit-box;
	overflow: hidden;
	line-height: 1.5;
	text-overflow: ellipsis;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
	font-size: 12px;
	word-break: break-all;
}

.uni-product-price {
	margin-top: 10rpx;
	font-size: 13px;
	line-height: 1.5;
	position: relative;
}

.uni-product-price-original {
	color: #e80080;
}

.uni-product-price-favour {
	color: #888888;
	text-decoration: line-through;
	margin-left: 10rpx;
}

.uni-product-tip {
	max-width: max-content;
	width: 300rpx;
	background-color: #ff3333;
	color: #ffffff;
	padding: 0 10rpx;
	border-radius: 5rpx;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
}
</style>
