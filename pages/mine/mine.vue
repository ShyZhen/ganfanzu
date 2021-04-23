<template>
	<view class="container" :style="{opacity:pageOpacity}">
		<view class="head comm-center">
			<view v-if="hasLogin">
				<image :src="user.avatar ? user.avatar : '/static/default_avatar.jpg'" mode="widthFix"></image>
				<view class="name">{{user.name}}</view>
				<view class="remarks">{{user.bio ? user.bio : '说点啥好呢~'}}</view>
			</view>
			<view v-else>
				<CcButton @cctap="showLoading('loginLoading')"  color="#fff" bgcolor="linear-gradient(-45deg, rgba(246, 112, 79, 1) 0%, rgba(243, 49, 35, 1) 100%);"
						  :loading="loginLoading" @tap="goLogin">登录</CcButton>
			</view>
		</view>

		<view class="home-menu">
			<view class="row comm-center">
				<view>{{user.id}}</view>
				<view>ID</view>
			</view>
			<view class="row edge comm-center" @tap="myFans">
				<view>{{user.fans_num}}</view>
				<view>关注</view>
			</view>
			<view class="row comm-center" @tap="myFollows">
				<view>{{user.followed_num}}</view>
				<view>粉丝</view>
			</view>
		</view>

		<view class="list-menu">
			<view class="cell" @tap="myTimeline">
				<view class="left-icon comm-center">
					<image src="/static/icon/mytimeline.png"></image>
				</view>
				<view class="txt">我的日记</view>
				<view class="right-icon comm-center">
					<image src="/static/icon/youjiantou.png"></image>
				</view>
			</view>
			<view class="cell" @tap="myCollect">
				<view class="left-icon comm-center">
					<image src="/static/icon/collect.png"></image>
				</view>
				<view class="txt">我的收藏</view>
				<view class="right-icon comm-center">
					<image src="/static/icon/youjiantou.png"></image>
				</view>
			</view>
			<view class="cell" @tap="goShop">
				<view class="left-icon comm-center">
					<image src="/static/icon/shop_b.png"></image>
				</view>
				<view class="txt">优惠券查询</view>
				<view class="right-icon comm-center">
					<image src="/static/icon/youjiantou.png"></image>
				</view>
			</view>
			<view class="cell" @tap="report">
				<view class="left-icon comm-center">
					<image src="/static/icon/report.png"></image>
				</view>
				<view class="txt">向小埋反馈</view>
				<view class="right-icon comm-center">
					<image src="/static/icon/youjiantou.png"></image>
				</view>
			</view>
			<view class="cell" @tap="goAbout">
				<view class="left-icon comm-center">
					<image src="/static/icon/about_b.png"></image>
				</view>
				<view class="txt">关于干饭组</view>
				<view class="right-icon comm-center">
					<image src="/static/icon/youjiantou.png"></image>
				</view>
			</view>
		</view>

		<view v-if="hasLogin" class="logout">
			<CcButton @cctap="showLoading('logoutLoading')" width="500rpx" color="#fff" bgcolor="linear-gradient(-45deg, rgba(246, 112, 79, 1) 0%, rgba(243, 49, 35, 1) 100%);"
					  :loading="logoutLoading" @tap="logout">退出登录</CcButton>
		</view>
	</view>
</template>

<script>
	import CcButton from '@/components/cc-button/cc-button.vue'
	import { mapState, mapActions } from 'vuex'
	import { getMyInfo } from '@/apis/users.js'
	import { logout } from '@/utils/loginPlugin.js'

	export default {
		data() {
			return {
				pageOpacity: 0,
				user: {
					id: 0,
					avatar: '',
					name: '',
					bio: '',
				},
				logoutLoading: false,
				loginLoading: false,
			}
		},
		components:{
			CcButton
		},
		onLoad: function () {

			// 在需要登录的地方执行初始化方法
			this.initLoginState()

			// 判断登录状态 并跳转到首页
			if (!this.hasLogin) {
				//this.$toLogin()
			} else {
				this.initUserInfo()
			}
		},
		onReady(e) {
			this.pageOpacity = 1
		},
		computed: {
			...mapState(['hasBinding', 'hasLogin']),
		},
		methods: {
			...mapActions(['initLoginState']),

			initUserInfo() {
				this.$loading('拼命拉取中...')
				getMyInfo().then(res => {
					this.user = res.data
					this.$loading(false)
				}).catch(err => {
					this.$loading(false)
				})
			},
			goLogin() {
				let that = this
				setTimeout(() => {
					that.loginLoading = false
					that.$toLogin()
				}, 500);
			},
			logout() {
				this.bindLogout()
			},
			bindLogout() {
				let that = this
				logout().then(res => {
					setTimeout(() => {
						that.logoutLoading = false
						that.$toLogin()
					}, 500);
				})
			},
			showLoading(type, ttl = 3500) {
				this[type] = true
				setTimeout(() => {
					this[type] = false
				}, ttl);
			},
			goAbout() {
				uni.navigateTo({
					url: '../about/about'
				});
			},
			goShop() {
				this.$toast('为规范化小程序环境，该功能暂时下线')
				return false
				uni.navigateTo({
					url: '../shop/shop'
				});
			},

			updateMyName() {
				// 安全校验
			},

			updateAvatar() {
				// 安全校验
			},

			updateMyInfo() {
				// 安全校验
				console.log('bio')
			},

			myFans() {

			},

			myFollows() {

			},

			myTimeline() {

			},
			report() {
				// 安全校验
			},
			myCollect() {

			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f8f8f8;
	}
	.container {
		transition: all 0.5s linear;
		font-size: 14px;
		line-height: 24px;
		position: relative;
	}
	.comm-center {
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		justify-content: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		text-align: center;
	}

	.head {
		padding-top: 10px;
		height: 400rpx;
		flex-direction: column;
		background: linear-gradient(#F46845, #fa856b);
		color: #fbf1ef;

		image {
			width: 120rpx;
			height: 120rpx;
			border: 5rpx solid #FFFFFF;
			border-radius: 100%;
		}

		.name {
			padding-top: 30rpx;
			font-size: 35rpx;
		}

		.remarks {
			padding-top: 10rpx;
			font-size: 24rpx;
		}
	}

	.home-menu {
		display: flex;
		justify-content: space-around;
		align-items: center;
		margin: 20rpx 0;
		height: 180rpx;
		border-radius: 5rpx;
		background-color: #FFFFFF;

		.row {
			width: 30%;
			font-size: 28rpx;
			font-weight: bold;
			flex-direction: column;

			view {
				line-height: 50rpx;
			}
		}

		.edge {
			border-left: 5rpx solid #f1f1f1;
			border-right: 5rpx solid #f1f1f1;
		}
	}

	.list-menu {
		background-color: #FFFFFF;

		.cell {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 100rpx;
			border-top: 5rpx solid #f8f8f8;

			.left-icon {
				width: 15%;

				image {
					width: 50rpx;
					height: 50rpx;
				}
			}

			.txt {
				width: 75%;
				font-size: 26rpx;
			}

			.right-icon {
				width: 10%;

				image {
					width: 30rpx;
					height: 30rpx;
				}
			}
		}
	}
	.logout {
		margin-top: 30px;
	}
</style>
