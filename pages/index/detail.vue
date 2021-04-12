<template>
  <view>
    <view class="title" :class="topNavStyle.class" :style="topNavStyle.style">
      <view class="flex_col" :style="{height:buttonHeight+'px'}">
      </view>
    </view>

    <card-swiper :imageList='coupon.imageList'></card-swiper>



    <view class="bottom-bar">
      <view class="buyNow" @tap="goToMp">
        <text>
          立即领取
        </text>
      </view>
    </view>
  </view>
</template>

<script>
import cardSwiper from "@/components/helang-cardSwiper/helang-cardSwiper"
export default {
  data() {
    return {
      coupon: {
        imageList: [],
      },
      topNavIndex:0,
      pageScrollTop:0,	// 页面滚动距离
      buttonHeight: this.$menuButtonRect.height + this.$systemInfoSync.statusBarHeight - 25,
    }
  },
  components:{
    cardSwiper
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

  //&>view{
  //  height: 60px;
  //}

  .box1{
    width: 60rpx;
    margin: 0 40rpx;
    font-size: 36rpx;
  }


  .tab{
    &>view{
      margin: 0 30rpx;
      line-height: 64rpx;
      font-size: 36rpx;
      position: relative;
      letter-spacing: 0;
      transition: transform 0.3s ease-in-out 0s;
      transform: scale(1,1);

      &.active{
        color: rgba(255,255,255,1);
        transform: scale(1.15,1.15);
      }
    }
  }

  &.style2{
    color: #FFF;
    background-color: rgba(255, 87, 34, 0.81);

    .tab{
      &>view{
        &.active{
          color: #FFF;
        }
      }
    }
  }
}

.bottom-bar{
  background-color: #fff;
  position: fixed;
  bottom: 0;
  height: 45px;
  width: 100%;
  overflow: hidden;
  box-shadow: 0 0 10px #ccc;
  display: flex;
  .buyNow{
    width: 100%;
    font-size: 28rpx;
    text-align: center;
    line-height: 90rpx;
    background-color: #f14116;
    color: #fff;
  }
}

</style>