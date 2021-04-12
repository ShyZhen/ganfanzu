<template>
	<view class="container" :style="{opacity:pageOpacity}">

    <view class="header" :style="{paddingTop: searchInput.top + 'px'}">
      <view class="search-group" :style="{width:searchInput.width+'px', height:searchInput.height+'px'}">
        <v-back></v-back>
      </view>
    </view>

    <!-- 商品轮播图 -->
    <view class="banner">
      <imgsBanner :imgList='item.item_small_pictures' :currentImg='currentImg'></imgsBanner>
    </view>

    <!-- 商品信息 -->
    <view class="detail-wrapp">
      <view class="detail-info">
        <!-- 普通商品 价格显示 -->
        <view class="detail-price" v-if="!isShowSeckill">
          <view class="price">￥{{item.item_price}}</view>
          <view class="buyNum">{{item.item_volume}}人已购买</view>
        </view>
        <!-- 商品名字及简介 -->
        <view class="detail-text">
          <view class="detail-text-name">{{item.item_title}}</view>
          <view class="detail-text-dec">{{item.seller_name}}</view>
        </view>
        <!-- 促销 -->
        <view class="promotion">
          <view class="promotion-text">优惠券</view>
          <i v-if="item.coupon_price && item.coupon_price !== '0.000'">
            <view class="promotion-icon">￥{{ item.coupon_price}}</view>
          </i>
          <i v-else>
            <view class="promotion-no-icon">无</view>
          </i>

        </view>
        <!-- 说明 -->
        <view class="explain">
          <view class="explain-text">说明</view>
          <view class="explain-dec">
            <view class="explain-dec-one">*24小时发货</view>
            <view class="explain-dec-two">*7天无理由退换</view>
          </view>
        </view>
      </view>
    </view>

    <!-- 图文详情 仅jd有数据 -->
    <view>
      <view class="detail-html">
        <view class="explain-text">商品详情</view>
      </view>
      <view v-if="imageHtml">
        <u-parse :content="imageHtml" ></u-parse>
      </view>
    </view>

    <!-- 底部bar -->
    <view class="bottom-bar">
<!--      <view class="bottom-bar-item">-->
<!--        <image class="icon" src="../../static/img/customerservice.png"></image>-->
<!--        <view>客服</view>-->
<!--      </view>-->
<!--      <view class="bottom-bar-item">-->
<!--        <image class="icon" src="../../static/img/ic-me-car.png"></image>-->
<!--        <view>购物车</view>-->
<!--      </view>-->
<!--      <view class="bottom-bar-item">-->
<!--        <image class="icon" src="../../static/img/ic-me-collect.png"></image>-->
<!--        <view>收藏</view>-->
<!--      </view>-->

      <view class="buyNow" @tap="getDetailLinkAndGoMp">
        <text v-if="item.coupon || item.coupon_price">
          优惠 ￥{{ item.coupon_price}}
        </text>
        <text v-if="!item.coupon && !item.coupon_price">
          无优惠
        </text>
      </view>
    </view>

    <!-- 返回顶部 -->
    <view class="top" :style="{'display':(flag===true? 'block':'none')}">
      <i class="topc iconfont icontopt01" @tap="goTop"></i>
    </view>

	</view>
</template>

<script>
  import { getDetailLink, getProductDetail, getProductHtml } from "@/apis/ganfan.js"
  import { getShareObj } from "@/common/share.js"
  import imgsBanner from '../../components/imgsBanner-tag/imgsBanner-tag.vue'
  import uParse from '@/components/u-parse/u-parse.vue'

	export default {
    components: {imgsBanner, uParse},
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

        propData: {
          platform: '',
          item_id: 0,
        },

        currentImg: 0,
        item: null,
        isShowSeckill: false,
        imageHtml:'',
        flag: false,
			};
		},
		onLoad(e) {
      this.searchInput.width = this.$menuButtonRect.right - this.$menuButtonRect.width;
      this.searchInput.height = this.$menuButtonRect.height
      this.searchInput.top = this.$menuButtonRect.top
      this.headerHeight = this.searchInput.top + this.searchInput.height + 12;

			let propItem = JSON.parse(decodeURIComponent(e.item))
      this.propData.platform = e.platform ? e.platform : propItem.platform
      this.propData.item_id = propItem.item_id

      let param = {
			  "platform":this.propData.platform,
        "item_id":this.propData.item_id
			}
      this.getProductDetail(param)
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

        // 仅支持比价
        this.$toast('仅支持优惠查询，购买还请到官方app下进行')
        return false;

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

        // 图文详情
        let that = this
        let param = {
          "platform":this.propData.platform,
          "item_id":this.propData.item_id
        }
        getProductHtml(param).then(res => {
          if (res.status === 0) {
            that.imageHtml = res.data.content
          }
        })
      },
      // 回到顶部
      goTop() {
        uni.pageScrollTo({
          scrollTop: 0,
          duration: 300
        })
      },
      //  根据距离顶部距离是否显示回到顶部按钮
      onPageScroll(e) {
        if (e.scrollTop > 600) {
          this.flag = true
        } else {
          this.flag = false
        }
      },
		},

	};
</script>

<style lang="scss">
  @import url("@/components/u-parse/u-parse.css");

  .header {
    position: fixed;
    z-index: 1;
  }

  /*详情*/
  .detail-wrapp {
    width: 100%;
    background-color: #FFFFFF;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .detail-info {
    width: 94%;
  }

  .detail-price {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80rpx;
  }

  .price {
    font-size: 32rpx;
    color: #ff7159;
    font-weight: 600;
  }

  .buyNum {
    font-size: 12px;
    color: #a5a1a1;
  }

  .detail-text {
    width: 100%;
    height: 130rpx;
    border-bottom: 1px solid #f3f3f3;
    padding: 5px 0 5px 0;
  }

  .detail-text-name {
    font-size: 30rpx;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    text-overflow: ellipsis;
    word-wrap: break-word;
    overflow: hidden;
  }

  .detail-text-dec {
    font-size: 12px;
    color: #a5a1a1;
    line-height: 35px;
  }

  .promotion {
    width: 100%;
    height: 80rpx;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #f3f3f3;
  }

  .promotion-text,
  .explain-text {
    font-size: 28rpx;
    color: #a5a1a1;
  }

  .promotion-icon {
    width: 70px;
    background-color: #ff7159;
    font-size: 12px;
    height: 17px;
    margin-left: 20px;
    color: #ffff;
    text-align: center;
  }
  .promotion-no-icon {
    width: 70px;
    font-size: 12px;
    height: 17px;
    color: #ccc;
    text-align: center;
  }

  .explain {
    width: 100%;
    height: 100rpx;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #f3f3f3;
  }

  .explain-dec {
    width: 70%;
    display: flex;
    flex-direction: column;
    margin-left: 20px;
  }

  .explain-dec-one,
  .explain-dec-two {
    font-size: 24rpx;
    color: #CCCCCC;
  }

  .detail-html {
    width: 100%;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }

  /* 底部bar */
  .bottom-bar{
    background-color: #fff;
    position: fixed;
    bottom: 0;
    height: 45px;
    width: 100%;
    overflow: hidden;
    box-shadow: 0 0 10px #ccc;
    display: flex;
  }
  .bottom-bar-item{
    width: 14%;
    display: flex;
    flex-direction: column;
    font-size: 24rpx;
    align-items: center;
    .icon{
      width: 25px;
      height: 25px;
    }
  }
  .buyNow{
    width: 100%;
    font-size: 28rpx;
    text-align: center;
    line-height: 90rpx;
    background-color: #f14116;
    color: #fff;
  }

  // 返回顶部
  .top {
    position: relative;
    display: none;
  }
  .topc {
    position: fixed;
    right: 20px;
    top: 75%;
    color: #cccaca94;
    font-size: 28px;
  }
</style>
