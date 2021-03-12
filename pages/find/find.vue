<template>
  <view class="container" :style="{opacity:pageOpacity}">
    <view>
      <view>
        <view style="
            position: fixed;
            z-index: 1;
            bottom: 40px;
            right: 20rpx;">
          <image @click="location" src="../../static/icon/my-location.png" style="width: 25px;height: 25px;opacity: 0.7" />
        </view>
      </view>
      <map
          id="map"
          ref="map"
          :style="'width: ' + width + '; height: ' + height + ';'"
          :subkey="subkey"
          :longitude="map.longitude"
          :latitude="map.latitude"
          :scale="map.scale"
          :markers="markers"
          :include-points="markers"
          :polyline="polyline"
          @markertap="handle"
          @callouttap="handle"
          @regionchange="regionChange"
          show-location="true"
          enable-indoorMap="true">
      </map>
    </view>
  </view>
</template>

<script>
import Config from "../../config/config";
import { getShareObj } from "@/common/share";
import QQMapWX from '../../libs/qqmap/qqmap-wx-jssdk.min.js'

let map
export default {
  data() {
    return {
      pageOpacity: 0,
      subkey: Config.subkey,
      height: '500px',
      width: '500px',
      markers: [],
      polyline: [],
      map: {
        scale: 16,
        latitude: 39.909,
        longitude: 116.39742,
      },
      qqMapSdk: null
    };
  },
  onLoad(e) {
    // 创建地图上下文
    map = uni.createMapContext('map', this);

    uni.getSystemInfo({
      success: res => {
        this.height = res.windowHeight + 'px'
        this.width = res.windowWidth + 'px'
      }
    });

    this.location()

    this.initQQMap()
  },
  onReady(e) {
    this.pageOpacity = 1
  },
  onShareAppMessage(res) {
    return getShareObj()
  },
  methods: {
    /**
     * 当前定位，获取周边关键字
     * @param e
     */
    location() {
      let query = '美食'
      let that = this
      uni.getLocation({
        type: 'gcj02',
        success: res => {
          that.map.longitude = res.longitude
          that.map.latitude = res.latitude
          map.moveToLocation({
            latitude: res.latitude,
            longitude: res.longitude
          })

          this.search(query, res.latitude+','+res.longitude).then(res => {
            that.pushMaster(res)
          })
        },
        fail: () => {
          that.$toast('地理位置获取失败');
        }
      });
    },
    pushMaster(data) {
      this.markers = [];
      for (let i = 0; i < data.data.length; i++) {
        this.markers.push({
          id: data.data[i].id.toString(),
          title: data.data[i].title,
          latitude: data.data[i].location.lat,
          longitude: data.data[i].location.lng,
          iconPath: '/static/icon/location.png',
          width: 20,
          height: 20,
          callout: {
            content: data.data[i].title,
            color: '#fff',
            fontSize: 12,
            borderRadius: 4,
            bgColor: '#464141b8',
            padding: 10,
            textAlign: 'center',
            display: 'ALWAYS'
          }
        })
      }
    },
    /**
     * 点击气泡 、marker标记点触发：规划路线
     * @param e
     */
    handle(e) {
      let from = {
        latitude: this.map.latitude,
        longitude: this.map.longitude,
      }
      let to
      for (let i = 0; i < this.markers.length; i++) {
        if (e.detail.markerId === this.markers[i].id) {
          to = {
            latitude: this.markers[i].latitude,
            longitude: this.markers[i].longitude,
          }
        }
      }

      this.direction(from, to)
    },
    /**
     * 改变视角触发
     * @param e
     */
    regionChange(e) {},
    /**
     * 初始化sdk
     */
    initQQMap() {
      this.qqmapsdk = new QQMapWX({
        key: Config.subkey
      });
    },
    /**
     * 搜索附件关键字
     */
    search(query, location = '') {
      return new Promise((resolve, reject) => {
        this.qqmapsdk.search({
          keyword: query,
          location: location,
          page_size: 20,
          success: function (res) {
            resolve(res)
          },
          fail: function (res) {
            reject(res)
          },
        });
      })
    },
    /**
     * 线路规划
     * @param from
     * @param to
     */
    direction(from, to) {
      return new Promise((resolve, reject) => {
        let that = this;
        //调用距离计算接口
        this.qqmapsdk.direction({
          mode: 'walking',  // 'driving'（驾车）、'walking'（步行）、'bicycling'（骑行），默认：'driving'
          from: from,
          to: to,
          success: function (res) {
            let ret = res;
            let coors = ret.result.routes[0].polyline, pl = [];
            let kr = 1000000;
            for (var i = 2; i < coors.length; i++) {
              coors[i] = Number(coors[i - 2]) + Number(coors[i]) / kr;
            }
            for (var i = 0; i < coors.length; i += 2) {
              pl.push({ latitude: coors[i], longitude: coors[i + 1] })
            }
            // console.log(pl)

            that.map.latitude = pl[0].latitude
            that.map.longitude = pl[0].longitude
            that.polyline = [{
              points: pl,
              color: '#2B9939DD',
              width: 4
            }]
          },
          fail: function (error) {
            console.error(error);
          },
        });
      })
    }
  }
};
</script>

<style lang="scss">
page {
  background-color: #fff;
}
.container {
  transition: all 0.5s linear;
  font-size: 14px;
  line-height: 24px;
  position: relative;
}
</style>
