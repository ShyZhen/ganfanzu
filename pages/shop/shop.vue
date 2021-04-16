<template>
	<view class="container" :style="{opacity:pageOpacity}">
		<!--  header  -->
		<!-- <view class="header-container">
			<view class="header">
				<view class="title">干饭推荐</view>
				<view class="header-button">
					<image src="/static/xiaomai_min.png" mode="widthFix" lazy-load @load="onoff='1'" @click="xiaoMai" />
				</view>
			</view>
		</view> -->
		<view class="header" :style="{paddingTop: searchInput.top + 'px'}">
			<!-- search component -->
			<view class="search">
				<v-fake-search :height="searchInput.height" :width="searchInput.width"></v-fake-search>
			</view>
			<view class="tabs">
				<v-tabs
					v-model="current"
					:tabs="tabs"
					@change="changeTab"
					class="tab"
					bgColor="#F46845"
					color="rgba(255,255, 255, .65)"
					activeColor="#fff"
					lineColor="#fff"
				></v-tabs>
			</view>
		</view>

		<!--  内容  -->
		<view class="coupon" ref="coupon" :style="{marginTop: headerHeight + 'px'}">
			<view v-for="(tab, i) in tabs" v-show="tab.type === tabType" :key="i">
				<view class="uni-product-list">
					<view v-for="(v, k) in couponListInfo[tab.type].list" @click="toCoupon(v)" :key="k">
						<view class="uni-product">
							<view class="image-view">
								<image v-if="renderImage" class="uni-product-image" :src="v.picture"></image>
							</view>
							<view class="uni-product-tip">{{v.seller_name}}</view>
							<view class="uni-product-title">{{v.title}}</view>
							<view class="uni-product-price">
								<text v-if="v.item_price !==v.item_final_price" class="uni-product-price-favour">￥{{v.item_price}}</text>
								<text class="uni-product-price-original">￥{{v.item_final_price}}</text>
							</view>
						</view>
					</view>
				</view>
				<v-loading v-show="!couponListInfo[tab.type].canLoadMore" :type="1" ></v-loading>
			</view>
		</view>

		<v-loading v-show="isLoading"></v-loading>
	</view>
</template>

<script>
	import {
		getShareObj
	} from "@/utils/share.js"
	import CONTANTS, {
		ERR_OK
	} from '@/common/config'
	import {
		getProductList,
		getDetailLink,
		getCustomProduct,
	} from "@/apis/ganfan.js"
	import VFakeSearch from "../../components/v-fake-search/v-fake-search";

	// 默认选中tab 下饭必备
	const DEFAULR_CHECKED_TYPE = 'custom'
	export default {
		components: {VFakeSearch},
		data() {
			return {
				isLoading: false,
				pageOpacity: 0,
				current: 0,
				tabType: '',
				tabs: [],
				/**
				 * 数据结构
				 * 		{coustom: {list: [], canLoadMore: true, page: 1}, pdd:[list: [], canLoadMore: true, page: 1], ...}
				 **/
				couponListInfo: {},
				coupons: [],
				renderImage: true,
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
			};
		},
		onLoad(e) {
			let type = DEFAULR_CHECKED_TYPE
			//#ifdef H5
			type = this.$route.query.type || DEFAULR_CHECKED_TYPE
			//#endif
			// //#ifdef MP-WEIXIN
			type = DEFAULR_CHECKED_TYPE
			// //#endif

			this.initTabs();
			this.initCouponListInfo(this.tabs)
			this.changeTab({
				type
			})

			// 胶囊宽高坐标
			this.searchInput.width = (this.$systemInfoSync.windowWidth - this.$menuButtonRect.width) - 24
			this.searchInput.height = this.$menuButtonRect.height || 32
			this.searchInput.top = this.$menuButtonRect.top || 12
			this.headerHeight = this.searchInput.top + this.searchInput.height + 36 + 12
		},
		onReady(e) {
			this.pageOpacity = 1
		},
		onReachBottom() {
			const type = this.tabType
			if(!type) return
			const couponListInfo = this.couponListInfo[type];
			let {canLoadMore, page} = couponListInfo;
			// 没有更多加载
			if(!canLoadMore) return

			switch(type) {
				case DEFAULR_CHECKED_TYPE:
					break
				default:
					this.getProductList(type, ++page)
			}
		},
		onShareAppMessage(res) {
			return getShareObj()
		},
		methods: {
			/**
			 * @description	初始化推荐导航列表
			 * @return {void}
			 **/
			initTabs() {
				this.tabs = CONTANTS.RECOMMEND.TABS
			},
			/**
			 * @description	初始化优惠券列表数据
			 * @param {Array} 导航列表
			 * @return {void}
			 **/
			initCouponListInfo(tabs) {
				/**
				 * 初始化优惠券列表数据
				 * 数据结构
				 * 		{coustom: {list: [], canLoadMore: true, page: 1}, pdd:[list: [], canLoadMore: true, page: 1], ...}
				 **/
				tabs.forEach(tab => {
					/**
					 * 错误绑定方式
					 * 		this.couponListInfo[tab.type] = {list: []}
					 * 		新增的属性，不被添加到监听机制内 导致视图不更新
					**/
					this.$set(this.couponListInfo, tab.type, {
						list: [],
						// 是否可以加载更多
						canLoadMore: false,
						// 加载第几页
						page: 1,
						// 页面容量
						size: 20
					})
				})
			},
			/**
			 * @description	设置当前选中的tab类型
			 * @param {String} 选中的tab类型
			 **/
			setChoosedTab(type) {
				this.tabType = type;

				// 更新tabs组件的显示索引
				this.tabs.forEach((tab, index) => {
					if (tab.type === type) {
						this.current = index
					}
				})
			},
			/**
			 * @description	获取产品列表
			 * @param {String} platform 获取的平台
			 * @param {Number} page 获取页数
			 **/
			getProductList(platform, page = 1) {
				this.isLoading = true
				getProductList({
					platform,
					page
				}).then(res => {
					this.isLoading = false
					// if (res.code !== ERR_OK) {
					// 	this.$toast(res.msg || '您的网络状态不太好哦~')
					// 	return
					// }
					const
						couponListInfo = this.couponListInfo[platform],
						handleList = this.handleData(res.data, platform);

					this.setChoosedTab(platform)
					Object.assign(couponListInfo, {
						page,
						canLoadMore: handleList.length >= couponListInfo.size
					})
					couponListInfo.list = couponListInfo.list.length === 0
						? handleList
						: couponListInfo.list.concat(handleList)
					this.$loading(false)
				}).catch(err => {
					this.isLoading = false
					this.$toast('您的网络状态不太好哦~')
				})
			},
			changeTab(tabInfo) {
				const {
					type
				} = tabInfo
				const {
					[type]: {
						list: couponList
					}
				} = this.couponListInfo;
				if (couponList.length !== 0) {
					this.setChoosedTab(type)
					return;
				}
				this.$loading('拼命拉取中...')

				switch (type) {
					// 默认下饭必备
					case DEFAULR_CHECKED_TYPE:
						this.isLoading = true;
						getCustomProduct().then(res => {
							this.isLoading = false;
							// if (res.code !== ERR_OK) {
							// 	this.$toast(res.msg || '您的网络状态不太好哦~')
							// 	return
							// }
							this.setChoosedTab(type);
							this.couponListInfo[DEFAULR_CHECKED_TYPE].list = this.handleData(res.data, type)
							this.$loading(false)
						}).catch(err => {
							this.isLoading = false;
							this.$toast('您的网络状态不太好哦~')
						})
						break;
					default:
						this.getProductList(type);
				}

				//#ifdef H5
				this.$nextTick(() => {
					this.$refs.coupon.scrollTop = 0;
				})
				//#endif
			},
			toCoupon(item) {

			  // 点击跳转到详情页
        uni.navigateTo({
          url: '../../pages/shop/detail?item='+encodeURIComponent(JSON.stringify(item))
        })
        return false;

        // 全部统一，自定义与其他平台的处理方式，不再直接返回wx_path
				// if (item.custom === 1) {
				// 	this.goMPwexin(item)
				// 	this.$loading(false)
				// } else {
				// 	this.$loading('拼命加载中...')
				// 	getDetailLink({
				// 		'item_url': item.item_url
				// 	}).then(res => {
				// 		this.goMPwexin(res.data)
				// 		this.$loading(false)
				// 	})
				// }
			},
			xiaoMai() {
				let messages = [{
					toast: '小埋自己要饿死了,嘤嘤嘤',
				}, {
					toast: '小埋求大家多多推荐分享啦',
				}, {
					toast: '嘘,这里是爸爸的广告位',
				}, {
					toast: '小埋的财富自由就靠您老人家啦',
				}, {
					toast: '放心吧,小埋不骗人',
				}, {
					toast: '歪比巴卜',
				}];

				let message = messages[Math.floor(Math.random() * messages.length)]['toast'];
				this.$toast(message)
			},
			// 处理数据格式，区分自定义以及接口api返回
			handleData(data, type) {
				let formatData = []
				if (type === DEFAULR_CHECKED_TYPE) {
					data.forEach(item => {
						let obj = {}
						obj.custom = 1
						obj.title = item.product_title
						obj.picture = item.product_main_picture
						obj.seller_name = item.seller_name
						obj.item_url = item.item_url
						obj.item_price = item.product_original_price // 原价
						obj.item_final_price = item.product_coupon_after_price // 卷后价格

            obj.item_id = item.item_id
            // 自定义产品返回platform
            obj.platform = item.platform
            obj.coupon = item.coupon
            obj.coupon_price = item.coupon_price

						formatData.push(obj)
					})
				} else {
					data.forEach(item => {
						let obj = {}
						obj.custom = 0
						obj.title = item.item_title
						obj.picture = item.item_picture
						obj.seller_name = item.seller_name
						obj.item_url = item.item_url
						obj.item_price = item.item_price // 原价
						obj.item_final_price = item.item_final_price // 卷后价格

            obj.item_id = item.item_id
            // 其他产品使用当前tab
            obj.platform = type
            obj.coupon = item.coupon
            obj.coupon_price = item.coupon_price

						formatData.push(obj)
					})
				}
				return formatData
			},

			// goMPwexin(item) {
			// 	//#ifdef H5
			// 	window.location.href = item.short_url
			// 	//#endif
			// 	//微信小程序
			// 	//#ifdef MP-WEIXIN
			// 	wx.navigateToMiniProgram({
			// 		appId: item.wx_appid,
			// 		path: item.wx_path,
			// 		success(res) {}
			// 	})
			// 	//#endif
			// },
		},
	};
</script>

<style lang="scss">
	.header{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 99;
		// height: 156rpx;
		padding-top: 24rpx;
		background-color: #F46845;
		box-sizing: border-box;
		/*搜索框*/
		.search {
			box-sizing: border-box;
			padding: 0 24rpx;
		}
		.tabs{
			background-color: #F46845;
		}
	}
	page {
		background-color: #f8f8f8;
	}
	.header-container {
		background: #fff;

		.header {
			//background-color: #F46845;
			background: linear-gradient(#F46845, #fa856b);
			height: 380rpx;
			text-align: center;
			line-height: 230rpx;
			color: #fff;
			font-size: 16px;
		}

		.banner {
			text-align: center;
			margin-top: -200rpx;

			image {
				width: 92%;
				border-radius: 25px;
			}
		}

		.header-button {
			text-align: center;

			image {
				width: 20%;
				border-radius: 25px;
			}
		}
	}

	.container {
		transition: all 0.5s linear;
		font-size: 14px;
		line-height: 24px;
		position: relative;

		.tab {
			// //position: fixed;
			// top: var(--window-top);
			// left: 0;
			// z-index: 9999;
		}

		// 商品列表
		.coupon {
			margin-top: 180rpx;
			view {
				font-size: 26rpx;
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
		}
	}
</style>
