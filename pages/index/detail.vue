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
      <CcButton @cctap="showLoading('shareLoading')" width="200rpx" color="#fff" bgcolor="linear-gradient(-45deg, rgba(87, 225, 181, 1) 0%, rgba(0, 63, 255, 1) 100%);"
                :loading="shareLoading">分享</CcButton>
      <CcButton @cctap="showLoading('saveLoading')" width="200rpx" color="#fff" bgcolor="linear-gradient(-45deg, rgba(87, 225, 181, 1) 0%, rgba(0, 63, 255, 1) 100%);"
                :loading="saveLoading">保存</CcButton>
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
    console.log(this.coupon)
  },
  // 页面滚动监听
  onPageScroll(e){
    this.pageScrollTop = Math.floor(e.scrollTop);
  },
  methods: {
    showLoading(type) {
      this[type] = true
      setTimeout(() => {
        this[type] = false
      }, 2000);
    },
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
            console.log(3)
            // 打开成功
          },
          complete() {
            console.log(2)
            that.$loading(false)
          }
        })
      }
      //#endif
    }
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
    background: linear-gradient(-45deg, rgba(87, 225, 181, 1) 0%, rgba(0, 63, 255, 1) 100%);;

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