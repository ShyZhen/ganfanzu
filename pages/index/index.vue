<template>
  <view class="outFood-wrapper container" :style="{opacity:pageOpacity}">
    <view class="pageHeader-container rowCen">
      <view class="userModel-content rowCenBet">
        <view class="rowCen" style="margin-left: 60rpx;">
          <image class="avatar" src="/static/default_avatar.jpg" mode=""></image>
        </view>
      </view>
    </view>

    <!--  扫码进入的关注公众号  -->
    <view>
      <official-account></official-account>
    </view>

    <view class="mainTitle rowCenCen">
      <view class="bdlr"></view>
      <view class="titletxt">
        省钱教程
      </view>
      <view class="bdlr"></view>
    </view>
    <view class="adv-container rowCenCen borderBox">
      <view class="pic-wrapper rowCenCen" @tap="goWebview()">
        <image class="adv-pic" src="https://image.fmock.com/mp/gfz/ad.png" mode=""></image>
      </view>
    </view>

    <view class="animate-container rowCenCen">
      <view class="dialogue">
        <view class="advtxt">
          {{wordTxt}}
        </view>
      </view>
      <view class="bread"></view>
    </view>

    <view class="mainTitle rowCenCen">
      <view class="bdlr"></view>
      <view class="titletxt">
        领干饭红包
      </view>
      <view class="bdlr"></view>
    </view>

    <view class="list-container rowCenBet borderBox">
      <block v-for="(items, index) in list" :key="index">
        <view class="items-content colCenCen"  @tap="goNextPage(items)">
          <view class="items-title">
            {{items.name}}
          </view>
          <image class="itemspic" :class="index<2?'tada':''" :src="items.bannerPic" mode=""></image>
        </view>
      </block>
    </view>


    <view>
      <view class="mainTitle rowCenCen">
        <view class="bdlr"></view>
        <view class="titletxt">
          国潮来袭：给你的头像加点料
        </view>
        <view class="bdlr"></view>
      </view>

      <view class="adv-container rowCenCen borderBox">
        <view class="pic-wrapper rowCenCen" @tap="jumpMp()">
          <image class="adv-pic" src="http://image.fmock.com/MPWangzhe/banner/5_m.jpg" mode="">
          </image>
        </view>
      </view>
    </view>



    <view class="movie">

      <view class="mainTitle rowCenCen">
        <view class="bdlr"></view>
        <view class="titletxt">
          饭后电影推荐
        </view>
        <view class="bdlr"></view>
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

    <view class="mainTitle rowCenCen">
      <view class="bdlr"></view>
      <view class="titletxt">
        联系客服
      </view>
      <view class="bdlr"></view>
    </view>

    <view class="kf-container rowCenCen borderBox">
      <button open-type="contact" class="pic-wrapper rowCenCen">
        <image class="adv-pic" src="https://image.fmock.com/mp/gfz/wmkefu.png" mode="">
        </image>
      </button>
    </view>

    <view class="bottom-content rowCenBet borderBox">
      <image @tap="goAction()" class="share" src="https://image.fmock.com/mp/gfz/refush.png" mode=""></image>
      <image class="morepic" src="https://image.fmock.com/mp/gfz/morepic.png" mode=""></image>
      <view class="share"></view>
    </view>
  </view>
</template>

<script>
import { getShareObj } from "@/utils/share.js"
import { getCouponsNew } from "@/apis/ganfan.js"
import { mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
      pageOpacity: 0,
      userInfo: '',
      wordTxt: '一直很尊重奶茶,没去冰,没去糖,没少喝',
      list:[
        {
          "id": 1,
          "name": "美团红包",
          "bannerPic": "https://image.fmock.com/mp/gfz/mt.png",
          "minapp": {
            "appid": "wxde8ac0a21135c07d",
            "path": "/waimai/pages/h5/h5?f_token=1&weburl=https%3A%2F%2Fdpurl.cn%2FvoNQNGKz",
          },
          "originImage": "/static/detail/mp-mt.jpg"
        },
        {
          "id": 1,
          "name": "饿了么红包",
          "bannerPic": "https://image.fmock.com/mp/gfz/elm.png",
          "minapp": {
            "appid": "wxece3a9a4c82f58c9",
            "path": "taoke/pages/shopping-guide/index?scene=kvnz0ru",
          },
          "originImage": "/static/detail/mp-zx.jpg"
        },
        {
          "id": 1,
          "name": "吃货红包",
          "bannerPic": "https://image.fmock.com/mp/gfz/ch.png",
          "minapp": {
            "appid": "wxece3a9a4c82f58c9",
            "path": "pages/sharePid/web/index?scene=s.click.ele.me%2FGyR1jqu",
          },
          "originImage": "/static/detail/mp-ch.jpg"
        },
        {
          "id": 1,
          "name": "果蔬超市",
          "bannerPic": "https://image.fmock.com/mp/gfz/cs.png",
          "minapp": {
            "appid": "wxece3a9a4c82f58c9",
            "path": "pages/sharePid/web/index?scene=s.click.ele.me%2FwUZhiqu",
          },
          "originImage": "/static/detail/mp-cs.jpg"
        }
      ],
    }
  },
  computed: {
    ...mapState(['hasBinding', 'hasLogin', 'statusH']),
  },
  // onLoad(e) {
  //   let that = this
  //   this.$loading('获取优惠中')
  //   getCouponsNew().then(res => {
  //     that.list = res.data
  //     that.$loading(false)
  //     console.log(that.list)
  //   })
  // },
  onReady(e) {
    this.pageOpacity = 1
  },
  onLoad() {
    // 在需要登录的地方执行初始化方法
    this.initLoginState()
  },
  onShareAppMessage(res) {
    return getShareObj()
  },
  onShareTimeline(res) {
    return getShareObj()
  },
  methods: {
    ...mapActions(['initLoginState']),

    goWebview() {
      uni.navigateTo({
        url: '/pages/index/link'
      })
    },
    goNextPage(info) {
      if (this.hasLogin) {
        wx.navigateToMiniProgram({
          appId: info.minapp.appid,
          path: info.minapp.path,
          success: (res) => {
            console.log(res);
          }
        })
      } else {
        this.$toast('领取需要登录')
        setTimeout(() => {
          this.saveLoading = false
          this.$toLogin()
        }, 1000);
        return false
      }
    },
    goAction() {

    },
    jumpMp() {
      wx.navigateToMiniProgram({
        appId: 'wx0559a4b18b51c197',
        path: 'pages/index/index',
        success: (res) => {
          console.log(res);
        }
      })
    },
  }
}
</script>

<style lang="scss">
@import url('/common/main.css');
.container {
  transition: all 0.5s linear;
  font-size: 14px;
  line-height: 24px;
  position: relative;
}

.outFood-wrapper {
  width: 100%;

  .pageHeader-container {
    width: 100%;
    height: 190rpx;
    border-bottom: 1rpx solid #222222;

    .userModel-content {
      width: 100%;

      .avatar {
        width: 150rpx;
        height: 150rpx;
      }
    }
  }

  .mainTitle {
    width: 100%;
    height: 100rpx;
    margin-top: 40rpx;

    .titletxt {
      font-size: 28rpx;
      font-weight: bold;
      color: #111111;
      margin: 0 20rpx;
    }

    .bdlr {
      width: 60rpx;
      height: 2rpx;
      border-radius: 1rpx;
      background: #222222;
    }
  }

  .adv-container {
    width: 100%;
    padding: 0 26rpx;

    .pic-wrapper {
      width: 100%;
      height: 328rpx;
      background: #F4F4F4;
      border-radius: 16rpx;

      .adv-pic {
        //width: 528rpx;
        height: 240rpx;
      }
    }
  }

  .kf-container {
    width: 100%;
    padding: 0 26rpx;

    .pic-wrapper {
      width: 100%;
      height: 224rpx;
      background: #F4F4F4;
      border-radius: 16rpx;

      .adv-pic {
        width: 626rpx;
        height: 141rpx;
      }
    }
  }

  .animate-container {
    width: 100%;
    margin-top: 70rpx;

    .dialogue {
      width: 520rpx;
      height: 110rpx;
      background: url(https://image.fmock.com/mp/gfz/dialog.png) no-repeat;
      background-size: 100% 100%;

      .advtxt {
        width: 100%;
        height: 100%;
        //padding: 22rpx 82rpx 23rpx 48rpx;
        padding: 30rpx 0 0 11px;
        font-size: 26rpx;
        font-weight: 500;
        color: #FFFFFF;
      }
    }

    .bread {
      width: 152rpx;
      height: 130rpx;
      background: url(https://image.fmock.com/mp/gfz/mianbao.png) no-repeat;
      background-size: 100% 100%;
    }
  }

  .list-container {
    width: 100%;
    padding: 0 26rpx;
    flex-wrap: wrap;

    .items-content {
      width: 332rpx;
      height: 327rpx;
      background: #F4F4F4;
      border-radius: 16rpx;
      margin-bottom: 41rpx;

      .items-title {
        font-size: 28rpx;
        font-weight: bold;
        color: #111111;
      }

      .itemspic {
        margin-top: 30rpx;
        width: 160rpx;
        height: 184rpx;
      }

      @keyframes tada {
        from {
          transform: scale3d(1, 1, 1);
        }

        10%,
        20% {
          transform: rotate3d(0, 0, 1, -8deg);
        }

        30%,
        50%,
        70%,
        90% {
          transform: rotate3d(0, 0, 1, 8deg);
        }

        40%,
        60%,
        80% {
          transform: rotate3d(0, 0, 1, 0deg);
        }

        to {
          transform: scale3d(1, 1, 1);
        }
      }

      .tada {
        animation: tada 1.5s infinite linear;
      }
    }
  }

  .bottom-content {
    width: 100%;
    margin-bottom: 20rpx;
    padding: 0 32rpx;

    .share {
      width: 82rpx;
      height: 64rpx;
    }

    .morepic {
      width: 266rpx;
      height: 183rpx;
      margin-top: 160rpx;
    }
  }

  button {
    background-color: transparent;
    padding-left: 0;
    padding-right: 0;
    line-height: inherit;
    border-radius: 0;
  }

  button::after {
    border: none;
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
}
</style>
