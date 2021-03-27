<template>
	<view class="search">
		<view class="search-input">
			<image class="search-icon" src="../../static/icon/search.png" mode="widthFix" lazy-load @load="onoff='1'"></image>
			<input 
				type="text" 
				confirm-type="search" 
				v-model="query" 
				:placeholder="placeholder" 
				:maxlength="maxLength" 
				:focus="needFocus"
				@input="searchKeyWordsList" 
				@confirm="confrim"
				@focus="focus"
			>
			<view 
				v-show="showClearBtn"
				ref="searchInp"
				class="iconfont iconioscloseempty close" 
				@click="clearSearchInfo"
			></view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			// 最多输入长度
			maxLength: {
				type: Number,
				default: 32
			},
			// 输入框提示
			placeholder: {
				type: String,
				default: '搜索商品关键字...'
			},
			// 搜索内容
			searchText: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				needFocus: false,
				showClearBtn: false,
				query: ''
			};
		},
		created() {
			this.query = this.searchText
		},
		methods: {
			searchKeyWordsList() {
				this.showClearBtn = this.query !== '';
				console.log(this.showClearBtn)
				this.$emit('searchKeyWordsList')
			},
			confrim() {
				const query = this.query.trim()
				if(query === '') return;
				this.$emit('confrim', query)
			},
			focus() {
				this.showClearBtn = false;
			},
			clearSearchInfo() {
				this.query = ''
				this.needFocus = true;
				this.showClearBtn = false;
				this.$emit('clearSearchInfo')
			}
		}
	}
</script>

<style lang="scss">
$primary-padding: 24rpx;
$innerInputHeight: 52rpx;
.search{
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	border-radius: 20px;
	background: #F2F2F2;
	color: rgba(68, 66, 66, 0.63);
	
	&-input{
		display: flex;
		width: 100%;
		height: $innerInputHeight;
		
		.search-icon{
			margin-left: $primary-padding / 2;
			width: $innerInputHeight;
			height: $innerInputHeight;
		}
		input{
			margin: 0 $primary-padding / 2;
			flex: 1;
		}
		
	}

	.close{
		font-size: 20px;
		width: $innerInputHeight;
	}
}
</style>
