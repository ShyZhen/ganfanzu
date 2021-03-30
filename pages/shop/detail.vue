<template>
	<view class="container" :style="{opacity:pageOpacity}">
    <view>
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
        imgList: [],
        currentImg: 0,
        item: null,
			};
		},
		onLoad(e) {
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
      getProductDetail(param) {
        let that = this
        getProductDetail(param).then(res => {
          that.item = res.data
          that.handleData(that.item)
        })
      },
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
      }
		},
	};
</script>

<style lang="scss">

</style>
