<template>
  <view class="container" :style="{opacity:pageOpacity}">

    <view style="position:absolute;z-index:12;" :style="{paddingTop: searchInput.top + 'px'}">
      <view :style="{width:searchInput.width+'px', height:searchInput.height+'px'}">
        <v-back></v-back>
      </view>
    </view>

    <view class="waimai-content" :style="pageBg.bgc">
      <view class="content">
        <!-- 正文内容 -->
        <view class="top">
          <image :src="pageBg.topBg" mode="widthFix" lazy-load @load="onoff='1'"></image>
        </view>
        <view class="center">
          <!-- 导购三标栏 -->
          <view class="cen-top">
            <image :src="stepImg" mode="widthFix" lazy-load @load="onoff='1'"></image>
            <view class="y y1" :style="pageBg.bgc"></view>
            <view class="y y2" :style="pageBg.bgc"></view>
          </view>
          <!-- 二维码 -->
          <view class="cen-cen">
            <image :src="coupon.originImage"></image>
          </view>
          <view class="cen-bottom">
            <CcButton @cctap="showLoading('jumpLoading', 30000)" width="500rpx" color="#fff" bgcolor="linear-gradient(-45deg, rgba(246, 112, 79, 1) 0%, rgba(243, 49, 35, 1) 100%);"
                      :loading="jumpLoading" @tap="goToMp">直接领取</CcButton>
          </view>
        </view>
        <view class="bottom">
          <view class="button-click-small">
            <CcButton @cctap="showLoading('shareLoading', 1000)" width="200rpx" color="#fff" bgcolor="linear-gradient(-45deg, rgba(246, 112, 79, 1) 0%, rgba(249, 203, 199, 1) 100%);"
                      :loading="shareLoading" openType="share">分享</CcButton>
            <CcButton @cctap="showLoading('saveLoading', 30000)" width="200rpx" color="#fff" bgcolor="linear-gradient(-45deg, rgba(246, 112, 79, 1) 0%, rgba(249, 203, 199, 1) 100%);"
                      :loading="saveLoading" @tap="saveTo">保存</CcButton>
          </view>
          <view class="bttext">
            干饭组使用说明:<br />
            1.本产品为广大用户提供每日领取外卖红包的快捷方式;<br />
            2.领取的红包可在该平台下的任何客户端查询与使用;<br />
            3.首次使用外卖平台小程序领取红包需授权微信登录;<br />
            4.本项目不会未经允许收集您的任何私人信息;<br />
            5.红包每天可领24小时有效,金额随机;<br />
          </view>
        </view>
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

      stepImg: '/static/detail/bg/step.jpg',
      pageBg: {
        bgc: 'background:linear-gradient(-45deg, #0163D2 0%, #0178D6 100%);',
        topBg: '/static/detail/bg/elm_zx_top.jpg',
      },
      pageBgCh: {
        bgc: 'background:linear-gradient(-45deg, #55ADCD 0%, #89C9E2 100%);',
        topBg: '/static/detail/bg/elm_ch_top.jpg',
      },
      pageBgCs: {
        bgc: 'background:linear-gradient(-45deg, #EA6D71 0%, #EB7979 100%);',
        topBg: '/static/detail/bg/elm_cs_top.jpg',
      },
      pageBgMt: {
        bgc: 'background:linear-gradient(-45deg, #FDB101 0%, #FEBB06 100%);',
        topBg: '/static/detail/bg/mt_top.jpg',
      },
    }
  },
  components:{
    cardSwiper,
    CcButton
  },
  onLoad(e) {
    this.searchInput.width = this.$menuButtonRect.right - this.$menuButtonRect.width;
    this.searchInput.height = this.$menuButtonRect.height
    this.searchInput.top = this.$menuButtonRect.top
    this.headerHeight = this.searchInput.top + this.searchInput.height + 12;

    this.coupon = JSON.parse(decodeURIComponent(e.item))

    // 皮肤切换
    switch (this.coupon.id) {
      case 1:
        this.pageBg = this.pageBgElm
        break
      case 2:
        this.pageBg = this.pageBgCh
        break
      case 3:
        this.pageBg = this.pageBgCs
        break
      case 4:
        this.pageBg = this.pageBgMt
        break
      default :
        break
    }
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

page{
  background-color: #fff;
}
.container {
  transition: all 0.8s linear;
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


.waimai-content {
  .content {
    .top {
      width: 750rpx;
      overflow: hidden;
      image {
        width: 100%;
        vertical-align: bottom;
      }
    }
    .center {
      background-color: #fff;
      width: 650rpx;
      margin: 0 auto;
      padding-bottom: 50rpx;
      border-radius: 20rpx;
      text-align: center;
      .cen-top {
        padding: 20rpx;
        border-bottom: dashed 1px rgba($color: #ccc, $alpha: 1);
        position: relative;

        image {
          width: 100%;
        }
        .y {
          width: 60rpx;
          height: 60rpx;
          position: absolute;
          bottom: 0;
          border-radius: 50%;
        }
        .y1 {
          left: 0;
          transform: translate(-50%, 50%);
        }
        .y2 {
          right: 0;
          transform: translate(50%, 50%);
        }
      }
      .cen-cen {
        margin: 40rpx 0 20rpx;
        image {
          width: 340rpx;
          height: 340rpx;
        }
      }
      .cen-bottom {
        width: 550rpx;
        margin: 10rpx auto 0;
        font-size: 42rpx;
        height: 100rpx;
        line-height: 100rpx;
        text-align: center;
        border-radius: 100rpx;
      }
    }
    // 最下字
    .bottom {
      width: 650rpx;
      margin: 30rpx auto 0;
      padding-bottom: 100rpx;
      .btn {
        view {
          width: 47%;
          text-align: center;
          line-height: 80rpx;
          font-size: 36rpx;
          letter-spacing: 4rpx;
          border-radius: 10rpx;
        }
      }
      .bttext {
        color: #fff;
        line-height: 60rpx;
        margin-top: 40rpx;
        font-size: 12px;
        text {
          color: rgb(236, 76, 21)
        }
      }
    }
  }
}

.slot-wrap {
  display: flex;
  align-items: center;
  width: 750rpx;

  .center {
    width: 300rpx;
    margin:  0 auto;
  }
}
</style>