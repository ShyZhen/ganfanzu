<template>
	<view class="container" :style="{opacity:pageOpacity}">
	<view class="fans-wrap">
		<template v-if="usersList && usersList.length > 0">
			<view class="fans-item" v-for="(item,index) in usersList" :key="index">
				<view class="left-wrap">
					<view class="img-wrap flex-center margin-right" @tap="toOthers(item.uuid)">
						<image :src="item.avatar ? item.avatar : defaultAvatar" mode="widthFix" class="avatar"></image>
					</view>
					<text>{{item.name}}</text>
				</view>
				<view :class="['right-btn main-btn',item.inMyFollows ? 'active-btn' : '']" @tap="handleFans(item)">{{item.inMyFollows ? '已关注' : '关注'}}</view>
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
	import { followList, fanList, followUser } from '@/apis/users.js'

	export default {
		data() {
			return {
				defaultAvatar: '/static/default_avatar.jpg',
				pageOpacity: 0,
				usersList: [],
				type: '',
				uuid: '',

				pageSize: 10,
				currentPage: 1,
				loadMoreStatus: 0,
			}
		},
		computed: {
			...mapState(['hasBinding', 'hasLogin']),
		},
		onLoad(options) {
			// 在需要登录的地方执行初始化方法
			this.initLoginState()

			// 判断登录状态 并跳转到首页
			if (!this.hasLogin) {
				this.$toast('需要先登录呢')
				setTimeout(() => {
					this.$toLogin()
				}, 1000);
			} else {
				this.type = options.type
				this.uuid = options.id

				if (this.type === 'fans') {
					uni.setNavigationBarTitle({
						title: '粉丝列表'
					})
					this.getFansList()

				}else{
					uni.setNavigationBarTitle({
						title: '关注列表'
					})
					this.getFollowList()
				}
			}
		},
		onReady(e) {
			this.pageOpacity = 1
		},
		methods: {
			...mapActions(['initLoginState']),

			getFansList() {
				let that = this
				fanList(this.uuid).then(res => {
					that.usersList = that.usersList.concat(res.data)
				})
			},
			getFollowList() {
				let that = this
				followList(this.uuid).then(res => {
					that.usersList = that.usersList.concat(res.data)
				})
			},

			toOthers(uuid) {
				uni.navigateTo({
					url: '/pages/mine/other?id='+uuid
				});
			},
			handleFans(info) {
				const { id, status } = info;
				let that = this
				if (id !== 'user-anonymous') {
					followUser(id).then(res => {
						item.status = !status;
						
						that.$toast(res.message)

					})
				} else {
					this.$toast('匿名用户无法被关注')
				}
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
	.fans-wrap {
		.fans-item {
			padding: 20rpx 30rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			background-color: #FFFFFF;
			border-bottom: 1rpx solid #ececec;

			.left-wrap {
				display: flex;
				align-items: center;
				font-size: 28rpx;
				color: var(--mainColor);

				.img-wrap {
					width: 70rpx;
					height: 70rpx;
					border-radius: 50%;
					overflow: hidden;
					border: 1rpx solid #ECECEC;

					.avatar {
						width: 100%;
						height: 100rpx;
					}
				}
			}

			.right-btn {
				width: 170rpx;
			}
		}
	}
</style>
