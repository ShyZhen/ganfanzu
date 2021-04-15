<template>
  <view class="container">
    <view class="title" :class="topNavStyle.class" :style="topNavStyle.style">
      <view class="flex_col" :style="{height:buttonHeight+'px'}">
      </view>
    </view>

    <view>
      <card-swiper :imageList='coupon.imageList'></card-swiper>
    </view>

    <view class="button-click">
      <CcButton @cctap="showLoading('shareLoading', 1000)" width="200rpx" color="#fff" bgcolor="linear-gradient(-45deg, rgba(246, 112, 79, 1) 0%, rgba(243, 49, 35, 1) 100%);"
                :loading="shareLoading" openType="share">分享</CcButton>
      <CcButton @cctap="showLoading('saveLoading', 30000)" width="200rpx" color="#fff" bgcolor="linear-gradient(-45deg, rgba(246, 112, 79, 1) 0%, rgba(243, 49, 35, 1) 100%);"
                :loading="saveLoading" @tap="saveTo">保存</CcButton>
    </view>

    <view class="bottom-bar">
      <view class="buyNow" @tap="goToMp">
        <text>
          直接领取
        </text>
      </view>
    </view>
  </view>
</template>

<script>
import cardSwiper from "@/components/helang-cardSwiper/helang-cardSwiper"
import CcButton from '@/components/cc-button/cc-button.vue'
import { getShareObj } from "@/common/share.js";

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
    this.coupon = JSON.parse(decodeURIComponent(e.item))
  },
  // 页面滚动监听
  onPageScroll(e){
    this.pageScrollTop = Math.floor(e.scrollTop);
  },
  onShareAppMessage(res) {
    return getShareObj()
  },
  methods: {
    goToMp() {
      let that = this
      this.$loading('拼命拉取中...')

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
            that.$loading(false)
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

.bottom-bar{
  background-color: #fff;
  position: fixed;
  bottom: 0;
  height: 50px;
  width: 100%;
  overflow: hidden;
  box-shadow: 0 0 10px #ccc;
  display: flex;
  .buyNow{
    width: 100%;
    font-size: 14px;
    text-align: center;
    line-height: 50px;
    background: linear-gradient(-45deg, rgba(246, 112, 79, 1) 0%, rgba(243, 49, 35, 1) 100%);

    color: #fff;
  }
}

// 优惠券
.button-click {
  margin-top: 35px;
  display: flex;
  justify-content: center;
}
</style>