<template>
	<view class="container" :style="{opacity:pageOpacity}">

    <view class="header" :style="{paddingTop: searchInput.top + 'px'}">
      <view class="search-group" :style="{width:searchInput.width+'px', height:searchInput.height+'px'}">
        <v-back></v-back>
      </view>
    </view>

    <view class="banner">
      <imgsBanner :imgList='item.item_small_pictures' :currentImg='currentImg'></imgsBanner>
    </view>




    <view>
      <view>
        {{item.item_title}}
      </view>
      <view>
        {{item.item_price}}
        {{item.item_final_price}}
      </view>

      <view>
        {{item.item_volume}}
      </view>
      <view>
        {{item.seller_name}}
      </view>

      <view class="bottom" @tap="getDetailLinkAndGoMp">
        <text v-if="item.coupon || item.coupon_price">
          领券购买
        </text>
        <text v-if="!item.coupon && !item.coupon_price">
          去购买
        </text>
      </view>
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
        pageOpacity: 0,
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

		onShareAppMessage(res) {
			return getShareObj()
		},
		methods: {
      // 获取产品详情信息
      getProductDetail(param) {
        this.$loading('拼命加载中...')
        let that = this
        getProductDetail(param).then(res => {
          that.handleData(res.data)
        })
      },
      // 点击领券购买调用
      getDetailLinkAndGoMp() {
        this.$loading('拼命加载中...')

        let param = {
          'item_url': this.item.item_url
        }
        getDetailLink(param).then(res => {
          this.goMPwexin(res.data)
          this.$loading(false)
        })
      },
      goMPwexin(detailLink) {
        //#ifdef H5
        window.location.href = detailLink.short_url
        //#endif
        //微信小程序
        //#ifdef MP-WEIXIN
        wx.navigateToMiniProgram({
          appId: detailLink.wx_appid,
          path: detailLink.wx_path,
          success(res) {}
        })
        //#endif
      },
      // 处理当前页面展示
      handleData(item) {
        this.item = item
        this.pageOpacity = 1
        this.$loading(false)
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
