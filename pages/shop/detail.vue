<template>
	<view class="container" :style="{opacity:pageOpacity}">

    <view class="header" :style="{paddingTop: searchInput.top + 'px'}">
      <view class="search-group" :style="{width:searchInput.width+'px', height:searchInput.height+'px'}">
        <v-back></v-back>
      </view>
    </view>

    <view class="banner">
      <imgsBanner :imgList='imgList' :currentImg='currentImg'></imgsBanner>
    </view>

	</view>
</template>

<script>
  import { getDetailLink, getProductDetail } from "@/apis/ganfan.js"
  import { getShareObj } from "@/common/share.js"
  import imgsBanner from '../../components/imgsBanner-tag/imgsBanner-tag.vue'

	export default {
    components: {imgsBanner},
		data() {
			return {
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

        imgList: [],
        currentImg: 0,
        item: null,
			};
		},
		onLoad(e) {
      this.searchInput.width = this.$menuButtonRect.right - this.$menuButtonRect.width;
      this.searchInput.height = this.$menuButtonRect.height
      this.searchInput.top = this.$menuButtonRect.top
      this.headerHeight = this.searchInput.top + this.searchInput.height + 12;


			let propItem = JSON.parse(decodeURIComponent(e.item))
      this.getProductDetail({"platform":propItem.platform, "item_id":propItem.item_id})
		},
		onReady(e) {
			this.pageOpacity = 1
		},

		onShareAppMessage(res) {
			return getShareObj()
		},
		methods: {
      // 获取产品详情信息
      getProductDetail(param) {
        this.$loading('拼命加载中...')
        let that = this
        getProductDetail(param).then(res => {
          that.item = res.data
          that.handleData(that.item)
          that.$loading(false)
        })
      },
      // 点击领券购买调用
      getDetailLinkAndGoMp(item) {
        this.$loading('拼命加载中...')
        getDetailLink({
          'item_url': item.item_url
        }).then(res => {
          this.goMPwexin(res.data)
          this.$loading(false)
        })
      },
      goMPwexin(item) {
        //#ifdef H5
        window.location.href = item.short_url
        //#endif
        //微信小程序
        //#ifdef MP-WEIXIN
        wx.navigateToMiniProgram({
          appId: item.wx_appid,
          path: item.wx_path,
          success(res) {}
        })
        //#endif
      },
      // 处理当前页面展示
      handleData(item) {
        this.imgList = item.item_small_pictures
        console.log(item)
      }
		},
	};
</script>

<style lang="scss">
  .header {
    position: absolute;
    z-index: 1;
  }
</style>
