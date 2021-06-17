<template>
  <view class="container" :style="{opacity:pageOpacity}">
    <!--  关注  -->
    <!-- #ifdef MP-WEIXIN -->
    <aTip ref="tipNotice" isCustom="true" bgColor="#31313194" borderR="5"></aTip>
    <!-- #endif -->

    <!--  header  -->
    <view class="header-container">
      <view class="header">
        <view class="title">干饭组</view>
      </view>
      <view class="banner">
        <image src="/static/banner/banner2.jpg" mode="widthFix" lazy-load @load="onoff='1'" />
      </view>
      <view class="header-button">
        <image src="/static/xiaomai_min.png" mode="widthFix" lazy-load @load="onoff='1'" @click="followNotice" />
      </view>
    </view>
    <!--  扫码进入的关注公众号  -->
    <view>
      <official-account></official-account>
    </view>
    <!--  内容  -->
    <view class="coupon" ref="coupon">
      <view class="item" v-for="(v, i) in couponList" @click="toCoupon(i)" :key="i">
        <view class="top">
          <view class="left">
            <view class="content">
              <image :src="v.icon" class="icon" mode="widthFix" lazy-load @load="onoff='1'" />
              <view class="name">{{ v.name }}</view>
            </view>
          </view>
          <view class="right">立即领取</view>
        </view>
        <view class="bottom"><image :src="v.bannerPic" class="banner-image" mode="widthFix" lazy-load @load="onoff='1'" /></view>
      </view>
    </view>

    <view class="movie">
      <view class="movie-head">
        <view class="movie-title">
          饭后电影推荐
        </view>
        <view class="movie-count">
          全部52部
        </view>
      </view>
      <view class="movie-list">
        <view class="item">
          <image class="cover" src="https://image.fmock.com/mp/gfz/1.jpg" mode=""></image>
          <view class="name">
            寻龙传说
          </view>
          <view class="buy">
            已售空
          </view>
        </view>
        <view class="item">
          <image class="cover" src="https://image.fmock.com/mp/gfz/2.jpg" mode=""></image>
          <view class="name">
            无依之地
          </view>
          <view class="buy">
            已售空
          </view>
        </view>
        <view class="item">
          <image class="cover" src="https://image.fmock.com/mp/gfz/3.jpg" mode=""></image>
          <view class="name">
            唐人街探案3
          </view>
          <view class="buy">
            已售空
          </view>
        </view>
        <view class="item">
          <image class="cover" src="https://image.fmock.com/mp/gfz/4.jpg" mode=""></image>
          <view class="name">
            送你一朵小红花
          </view>
          <view class="buy">
            已售空
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import aTip from "@/components/a_tip/aTip";
import { getShareObj } from "@/utils/share.js";
import { getCoupons } from "@/apis/ganfan.js";
import Config from "../../config/config";

export default {
  data() {
    return {
      noticeKey: Config.noticeKey + Config.version,
      pageOpacity: 0,
      current: 0,
      couponList: [],
      coupons: []
    };
  },
  components: {
    aTip,
  },
  onLoad(e) {
    let that = this
    this.$loading('获取优惠中')
    getCoupons().then(res => {
      that.coupons = res.data
      that.changeTab()
    })
  },
  onReady(e) {
    this.pageOpacity = 1
  },
  onShareAppMessage(res) {
    return getShareObj()
  },
  onShareTimeline(res) {
    return getShareObj()
  },
  methods: {
    changeTab() {
      uni.showLoading({
        title: '获取优惠中'
      });
      this.couponList = this.coupons

      //#ifdef H5
      this.$nextTick(() => {
        this.$refs.coupon.scrollTop= 0;
      })
      //#endif
      setTimeout(() => {
        uni.hideLoading()
      }, 500)
    },
    toCoupon(i) {

      // 点击跳转到详情页
      uni.navigateTo({
        url: '/pages/index/detail?item='+encodeURIComponent(JSON.stringify(this.couponList[i]))
      })
      return false;



      let that = this
      this.$loading('拼命拉取中...')

      //h5
      //#ifdef H5
      window.location.href = this.couponList[i].url
      //#endif
      //微信小程序
      //#ifdef MP-WEIXIN
      if(this.couponList[i].minapp){
        wx.navigateToMiniProgram({
          appId: this.couponList[i].minapp.appid,
          path: this.couponList[i].minapp.path,
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
    followNotice() {
      if (uni.getStorageSync(this.noticeKey)) {
        this.changeTab()
      } else {
        this.$refs.tipNotice.init()
      }
    }
  }
};
</script>

<style lang="scss">
page {
  background-color: #f8f8f8;
}

.header-container {
  background: #fff;
  .header {
    //background-color: #F46845;
    background: linear-gradient(#F46845, #fa856b);
    height: 380rpx;
    text-align: center;
    line-height: 230rpx;
    color: #fff;
    font-size: 16px;
    border-bottom-right-radius: 25px;
    border-bottom-left-radius: 25px;
  }

  .banner {
    text-align: center;
    margin-top: -200rpx;
    image {
      width: 92%;
      border-radius: 25px;
    }
  }
  .header-button {
    text-align: center;
    image {
      width: 20%;
      border-radius: 25px;
    }
  }
}

.container {
  transition: all 0.5s linear;
  font-size: 14px;
  line-height: 24px;
  position: relative;
  .tab {
    position: fixed;
    top: var(--window-top);
    left: 0;
    z-index: 9999;
  }
  .coupon {
    // padding-top: 200rpx;
    .item {
      background-color: #ffffff;
      margin: 30rpx;
      border-radius: 10rpx;
      padding: 0 30rpx 30rpx 30rpx;
      .top {
        height: 80rpx;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .left {
          height: 116rpx;
          width: 400rpx;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .content {
            width: 100%;
          }
          .icon {
            display: inline-block;
            vertical-align: bottom;
            width: 44rpx;
            height: auto;
          }
          .name {
            text-align: left;
            display: inline-block;
            vertical-align: bottom;
            font-size: 34rpx;
            color: #000;
            line-height: 22px;
            font-weight: bold;
            margin-left: 15rpx;
          }
          .text {
            width: 150rpx;
            height: 38rpx;
            line-height: 38rpx;
            text-align: center;
            font-size: 24rpx;
            color: #61300e;
            background: linear-gradient(90deg, #f9db8d, #f8d98a);
            border-radius: 6rpx;
          }
        }

        .right {
          width: 150rpx;
          height: 22px;
          border-radius: 30rpx;
          background: linear-gradient(135deg, #ef3305, #f6704f);
          color: #fdfdfd;
          font-size: 24rpx;
          line-height: 22px;
          text-align: center;
          margin-top: 3px;
        }
      }

      .bottom {
        height: auto;
        width: 100%;
        image {
          display: block;
          width: 100%;
          height: auto;
        }
      }
      .banner-image {
        border-radius: 20rpx;
      }
    }
  }
}

.movie{
  display: block;
  width: 700rpx;
  margin: 20rpx auto;
  background-color: white;
  border-radius: 20rpx;
  padding: 20rpx;
  .movie-head{
    display: flex;
    width: 700rpx;

    .movie-title{
      width: 350rpx;
      text-align: left;
      font-size: 30rpx;
      font-weight: 700;
    }
    .movie-count{
      width: 310rpx;
      text-align: right;
      font-size: 24rpx;
    }
  }
  .movie-list::-webkit-scrollbar {
    display:none;
  }
  .movie-list{
    display: block;
    margin-top: 20rpx;
    white-space: nowrap;
    overflow-x: scroll;
    .item{
      display: inline-block;
      width: 170rpx;
      margin-right: 10rpx;
      .cover{
        display: blcok;
        width: 160rpx;
        height: 250rpx;
        border-radius: 8rpx;
      }
      .name{
        font-size: 28rpx;
        font-weight: 700;
        width: 170rpx;
        text-overflow: hidden;
        white-space: nowrap;
      }
      .buy{
        width: 120rpx;
        height: 54rpx;
        line-height: 54rpx;
        // background-color: #EA5858;
        background-color: #d8d8d8;
        border-radius: 40rpx;
        color: white;
        font-size: 26rpx;
        text-align: center;

      }
    }
  }
}
</style>
