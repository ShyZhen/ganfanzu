<template>
  <view class="container" :style="{opacity:pageOpacity}">

    <view style="position:absolute;z-index:12;" :style="{paddingTop: searchInput.top + 'px'}">
      <view :style="{width:searchInput.width+'px', height:searchInput.height+'px'}">
        <v-back></v-back>
      </view>
    </view>


    <view class="title" :class="topNavStyle.class" :style="topNavStyle.style">
      <view class="flex_col" :style="{height:buttonHeight+'px'}">
      </view>
    </view>

    <view>
      <card-swiper :imageList='coupon.imageList'></card-swiper>
    </view>

    <view>
      <view class="button-click">
        <CcButton @cctap="showLoading('jumpLoading', 30000)" width="500rpx" color="#fff" bgcolor="linear-gradient(-45deg, rgba(246, 112, 79, 1) 0%, rgba(243, 49, 35, 1) 100%);"
                  :loading="jumpLoading" @tap="goToMp">直接领取</CcButton>
      </view>

      <view class="button-click-small">
        <CcButton @cctap="showLoading('shareLoading', 1000)" width="200rpx" color="#fff" bgcolor="linear-gradient(-45deg, rgba(246, 112, 79, 1) 0%, rgba(249, 203, 199, 1) 100%);"
                  :loading="shareLoading" openType="share">分享</CcButton>
        <CcButton @cctap="showLoading('saveLoading', 30000)" width="200rpx" color="#fff" bgcolor="linear-gradient(-45deg, rgba(246, 112, 79, 1) 0%, rgba(249, 203, 199, 1) 100%);"
                  :loading="saveLoading" @tap="saveTo">保存</CcButton>
      </view>
    </view>

  </view>
</template>

<script>
import cardSwiper from "@/components/helang-cardSwiper/helang-cardSwiper"
import CcButton from '@/components/cc-button/cc-button.vue'
import { getShareObj } from "@/utils/share.js";

export default {
  data() {
    return {
      coupon: {
        imageList: [],
      },
      topNavIndex:0,
      pageScrollTop:0,	// 页面滚动距离
      buttonHeight: this.$menuButtonRect.height + this.$systemInfoSync.statusBarHeight - 25,
      shareLoading: false,
      saveLoading: false,
      jumpLoading: false,

      pageOpacity: 0,
      searchInput: {
        width: 0,
        height: 0,
        top: 0,
        inputVal: ''
      },
    }
  },
  components:{
    cardSwiper,
    CcButton
  },
  computed:{
    topNavStyle(){
      let r = this.pageScrollTop  / 100;
      return {
        "class":r>=0.85?'style2':'',
        "style":`background-color: rgba(243, 102, 58,${r>=1?1:r});`
      }
    }
  },
  onLoad(e) {
    this.searchInput.width = this.$menuButtonRect.right - this.$menuButtonRect.width;
    this.searchInput.height = this.$menuButtonRect.height
    this.searchInput.top = this.$menuButtonRect.top
    this.headerHeight = this.searchInput.top + this.searchInput.height + 12;

    this.coupon = JSON.parse(decodeURIComponent(e.item))
  },
  onReady(e) {
    this.pageOpacity = 1
  },

  onShareAppMessage(res) {
    return getShareObj()
  },
  methods: {
    goToMp() {
      let that = this

      //h5
      //#ifdef H5
      window.location.href = this.coupon.url
      //#endif
      //微信小程序
      //#ifdef MP-WEIXIN
      if(this.coupon.minapp){
        wx.navigateToMiniProgram({
          appId: that.coupon.minapp.appid,
          path: that.coupon.minapp.path,
          success(res) {
            // 打开成功
          },
          complete() {
            setTimeout(() => {
              that.jumpLoading = false
            }, 500);
          }
        })
      }
      //#endif
    },

    saveTo() {
      let that = this
      uni.saveImageToPhotosAlbum({
        filePath: this.coupon.imageList[0],
        success: function () {
          that.$toast('已保存到手机相册!')
        },
        complete: function() {
          setTimeout(() => {
            that.saveLoading = false
          }, 500);
        }
      });
    },
    // 超过最大执行时间后，loading状态为false
    showLoading(type, ttl = 3500) {
      this[type] = true
      setTimeout(() => {
        this[type] = false
      }, ttl);
    },
  }
}
</script>

<style lang="scss">
@import "common/global.scss";

page{
  background-color: #fff;
}
.container {
  transition: all 0.5s linear;
  font-size: 14px;
  line-height: 24px;
  position: relative;
}

/* 标题栏 */
.title{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: auto;
  padding-top: var(--status-bar-height);
  z-index: 10;
  background-color: rgba(255, 87, 34, 0.81);
  color: rgba(255,255,255,0.8);
}

// 优惠券
.button-click {
  margin-top: 35px;
  display: flex;
  justify-content: center;
}
.button-click-small {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
</style>