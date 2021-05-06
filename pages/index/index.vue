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
            <!--						<view class="text" v-if="v.type == 1">每日可领</view>-->
            <!--						<view class="text" v-else-if="v.type == 2">限时秒杀</view>-->
          </view>
          <view class="right">立即领取</view>
        </view>
        <view class="bottom"><image :src="v.bannerPic" class="banner-image" mode="widthFix" lazy-load @load="onoff='1'" /></view>
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
    const couponsConfig = {
      elmIcon:  '/static/coupon/elm_icon.png',
      mtIcon:  '/static/coupon/mt_icon.png',
      elmMpAppId: 'wxece3a9a4c82f58c9',
      mtMpAppId: 'wxde8ac0a21135c07d',
    }
    return {
      noticeKey: Config.noticeKey + Config.version,
      pageOpacity: 0,
      current: 0,
      couponList: [],
      // coupons: [
      //   {
      //     id: 1,
      //     name: '饿了么每日专享红包',
      //     icon: couponsConfig.elmIcon,
      //     bannerPic: '/static/coupon/elmZX.png',
      //     url: 'https://s.click.ele.me/quDa1ru',
      //     minapp: {
      //       appid: couponsConfig.elmMpAppId,
      //       path: 'taoke/pages/shopping-guide/index?scene=kvnz0ru',
      //     },
      //     originImage: '/static/detail/mp-zx.jpg',
      //   },
      //   {
      //     id: 2,
      //     name: '饿了么吃货联盟红包',
      //     icon: couponsConfig.elmIcon,
      //     bannerPic: '/static/coupon/elmCHLM.png',
      //     url: 'https://s.click.ele.me/GyR1jqu',
      //     minapp: {
      //       appid: couponsConfig.elmMpAppId,
      //       path: 'pages/sharePid/web/index?scene=s.click.ele.me%2FGyR1jqu',
      //     },
      //     originImage: '/static/detail/mp-ch.jpg',
      //   },
      //   {
      //     id: 3,
      //     name: '饿了么果蔬商超红包',
      //     icon: couponsConfig.elmIcon,
      //     bannerPic: '/static/coupon/elmCS2.png',
      //     url: 'https://s.click.ele.me/wUZhiqu',
      //     minapp: {
      //       appid: couponsConfig.elmMpAppId,
      //       path: 'pages/sharePid/web/index?scene=s.click.ele.me%2FwUZhiqu',
      //     },
      //     originImage: '/static/detail/mp-cs.jpg',
      //   },
      //   {
      //     id: 4,
      //     name: '美团外卖每日红包',
      //     icon: couponsConfig.mtIcon,
      //     bannerPic: '/static/coupon/mtHB.png',
      //     url:'https://c.mktdatatech.com/track.php?site_id=450533&aid=10124&euid=&t=https%3A%2F%2Fi.meituan.com&dm_fid=16079',
      //     minapp: {
      //       appid: couponsConfig.mtMpAppId,
      //       path: '/waimai/pages/h5/h5?f_token=1&weburl=https%3A%2F%2Fdpurl.cn%2FvoNQNGKz'
      //     },
      //     originImage: '/static/detail/mp-mt.jpg',
      //   },
      // ],
      coupons: []
    };
  },
  components: {
    aTip,
  },
  onLoad(e) {
    let that = this
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
</style>
