<template>
  <view class="container" :style="{opacity:pageOpacity}">
    <view>
      <view>
        <view style="
            position: fixed;
            z-index: 1;
            bottom: 40px;
            right: 0;">
          <image @click="location" src="../../static/icon/location.png" style="width: 25px;height: 25px;opacity: 0.7" />
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
          @callouttap="handle"
          @markertap="handle"
          layer-style="1"
          enable-indoorMap="true">
      </map>
    </view>
  </view>
</template>

<script>
import { getShareObj } from "@/common/share.js";

var map
export default {
  data() {
    return {
      pageOpacity: 0,
      subkey: '5LEBZ-PIA6S-CTNOV-6777U-GIC5H-LJBL2',
      height: '500px',
      width: '500px',
      map: {
        scale: 13,
        latitude: 39.909,
        longitude: 116.39742
      },
    };
  },
  onLoad(e) {
    // 创建地图上下文
    map = uni.createMapContext('map', this);

    uni.getSystemInfo({
      success: res => {
        this.height = res.windowHeight + 'px';
        this.width = res.windowWidth + 'px';
      }
    });
    this.location();
  },
  onReady(e) {
    this.pageOpacity = 1
  },
  onShareAppMessage(res) {
    return getShareObj()
  },
  methods: {
    //定位当前
    location() {
      let that = this
      uni.getLocation({
        type: 'gcj02',
        success: res => {
          map.moveToLocation({
            latitude: res.latitude,
            longitude: res.longitude
          })
          // that.longitude = res.longitude
          // that.latitude = res.latitude
        },
        fail: () => {
          console.log('地理位置获取失败');
        }
      });
    },
    handle(i) {
      console.log(i)
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
