<template>
  <view class="container" :style="{opacity:pageOpacity}">
    <!--  header  -->
    <view class="header-container">
      <view class="header">
        <view class="title">干饭推荐</view>
        <view class="header-button">
          <image src="/static/xiaomai_min.png" mode="widthFix" lazy-load @load="onoff='1'" @click="xiaoMai" />
        </view>
      </view>
    </view>

    <v-tabs v-model="current" :tabs="tabs" @change="changeTab" class="tab"></v-tabs>

    <!--  内容  -->
    <view class="coupon" ref="coupon">
      <view class="uni-product-list">
        <view class="uni-product" v-for="(v, i) in couponList" @click="toCoupon(v)" :key="i">
          <view class="image-view">
            <image v-if="renderImage" class="uni-product-image" :src="v.picture"></image>
          </view>
          <view class="uni-product-tip">{{v.seller_name}}</view>
          <view class="uni-product-title">{{v.title}}</view>
          <view class="uni-product-price">
            <text v-if="v.item_price !==v.item_final_price" class="uni-product-price-favour">￥{{v.item_price}}</text>
            <text class="uni-product-price-original">￥{{v.item_final_price}}</text>
          </view>
        </view>
      </view>



    </view>
  </view>
</template>

<script>
import { getShareObj } from "@/common/share.js"
import { getProductList, getDetailLink, getCustomProduct } from "@/apis/ganfan.js"

export default {
  data() {
    return {
      pageOpacity: 0,
      current: 0,
      tabs: [
        // {
        //   text: '全部',
        //   tabId: 0,
        // },
        {
          text: '下饭必备',
          tabId: 1,
        },
        {
          text: '京东',
          tabId: 2,
        },
        {
          text: '拼多多',
          tabId: 3,
        },
      ],
      couponList: [],
      coupons: [],
      renderImage: true
    };
  },
  onLoad(e) {
    //#ifdef H5
    let tabId = this.$route.query.tabId ? parseInt(this.$route.query.tabId) : 0
    //#endif
    //#ifdef MP-WEIXIN
    let tabId = e.tabId ? parseInt(e.tabId) : 0
    //#endif
    for(let i in this.tabs){
      if(tabId == this.tabs[i].tabId){
        this.current = parseInt(i)
      }
    }
    this.changeTab(this.current)
  },
  onReady(e) {
    this.pageOpacity = 1
  },
  onShareAppMessage(res) {
    return getShareObj()
  },
  methods: {
    changeTab(index) {
      this.couponList = []
      this.$loading('拼命拉取中...')

      switch (index) {
        case 0:
          getCustomProduct().then(res => {
            this.couponList = (this.handleData(res.data, true))
            this.$loading(false)
          })
          break
        case 1:
          getProductList({'platform': 'jd'}).then(res => {
            this.couponList = (this.handleData(res.data))
            this.$loading(false)
          })
          break
        case 2:
          getProductList({'platform': 'pdd'}).then(res => {
            this.couponList = (this.handleData(res.data))
            this.$loading(false)
          })
          break
      }

      //#ifdef H5
      this.$nextTick(() => {
        this.$refs.coupon.scrollTop= 0;
      })
      //#endif
    },
    toCoupon(item){
      if (item.custom === 1) {
        this.goMPwexin(item)
        this.$loading(false)
      } else {
        this.$loading('拼命加载中...')
        getDetailLink({'item_url':item.item_url}).then(res => {
          this.goMPwexin(res.data)
          this.$loading(false)
        })
      }
    },
    xiaoMai() {
      let messages = [{
        toast: '小埋自己要饿死了,嘤嘤嘤',
      },{
        toast: '小埋求大家多多推荐分享啦',
      },{
        toast: '嘘,这里是爸爸的广告位',
      },{
        toast: '小埋的财富自由就靠您老人家啦',
      },{
        toast: '放心吧,小埋不骗人',
      },{
        toast: '歪比巴卜',
      }];

      let message = messages[Math.floor(Math.random()*messages.length)]['toast'];
      this.$toast(message)
    },
    // 处理数据格式，区分自定义以及接口api返回
    handleData(data, isCustom = false) {
      let formatData = []
      if (isCustom) {
        data.forEach(item => {
          let obj = {}
          obj.custom = 1
          obj.title = item.product_title
          obj.picture = item.product_main_picture
          obj.seller_name = item.seller_name
          obj.item_url = item.item_url
          obj.item_price = item.product_original_price               // 原价
          obj.item_final_price = item.product_coupon_after_price     // 卷后价格

          // 以下为自定义产品直接带有的信息，非自定义的需要去调用getLink接口拿
          obj.short_url = item.short_url
          obj.wx_appid = item.wx_appid
          obj.wx_path = item.wx_path

          formatData.push(obj)
        })
      } else {
        data.forEach(item => {
          let obj = {}
          obj.custom = 0
          obj.title = item.item_title
          obj.picture = item.item_picture
          obj.seller_name = item.seller_name
          obj.item_url = item.item_url
          obj.item_price = item.item_price               // 原价
          obj.item_final_price = item.item_final_price   // 卷后价格

          formatData.push(obj)
        })
      }
      return formatData
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
        success(res) {
        }
      })
      //#endif
    }
  },

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
    //position: fixed;
    top: var(--window-top);
    left: 0;
    z-index: 9999;
  }

  // 商品列表
  .coupon {
    view {
      font-size: 26rpx;
    }

    .uni-product-list {
      display: flex;
      width: 100%;
      flex-wrap: wrap;
      flex-direction: row;
    }

    .uni-product {
      padding: 20rpx;
      display: flex;
      flex-direction: column;
    }

    .image-view {
      height: 330rpx;
      width: 330rpx;
      margin: 12rpx 0;
    }

    .uni-product-image {
      height: 330rpx;
      width: 330rpx;
    }

    .uni-product-title {
      width: 300rpx;
      word-break: break-all;
      display: -webkit-box;
      overflow: hidden;
      line-height: 1.5;
      text-overflow: ellipsis;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      font-size: 12px;
      word-break: break-all;
    }

    .uni-product-price {
      margin-top: 10rpx;
      font-size: 13px;
      line-height: 1.5;
      position: relative;
    }

    .uni-product-price-original {
      color: #e80080;
    }

    .uni-product-price-favour {
      color: #888888;
      text-decoration: line-through;
      margin-left: 10rpx;
    }

    .uni-product-tip {
      max-width: max-content;
      width: 300rpx;
      background-color: #ff3333;
      color: #ffffff;
      padding: 0 10rpx;
      border-radius: 5rpx;
      text-overflow:ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
  }
}
</style>
