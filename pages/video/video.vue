<template>
  <view class="container" :style="{opacity:pageOpacity}">
    <view class="home">
      <view class="card-bottom">
        <!-- 顶部分页栏 -->
        <view class="top-tab">
          <view :class="['tab-item flex-center', activeTab == index ? 'active' : '']" @tap="handleTab(index)" v-for="(item, index) in tabList" :key="index">{{ item.title }}</view>
        </view>
        <view style="padding: 10px">
          <txv-video playerid="txv1" vid="h07290i9vt0" object-fit='fill'>
          </txv-video>

          <txv-video playerid="txv2" vid="z3102dhik4e" object-fit='fill'>
          </txv-video>

          <txv-video playerid="txv3" vid="v0713mr31oz" object-fit='fill'>
          </txv-video>

<!--          <txv-video :vid="matchVideoUrl[index]" playerid="txv1" :autoplay="autoplayFlag" :showCenterPlayBtn="showCenterPlayBtn"-->
<!--                     bindstatechange="bindstatechange()"></txv-video>-->

        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
      activeTab: 0,
      pageSize: 10,
      // tab的名称
      tabList: [
        {
          title: '最新',
          id: 'new',
        },
        {
          title: '热门',
          id: 'hot',
        },
        {
          title: '推荐',
          id: 'tj',
        },
        {
          title: '精选',
          id: 'jx',
        },
        {
          title: '搞笑',
          id: 'gx',
        }
      ],
      cardList: [],
      pageOpacity: 0,
    };
  },
  computed: {
    ...mapState(['hasBinding', 'hasLogin', 'statusH']),
  },
  components:{
  },
  onShareAppMessage(res) {
    return {
      title: '干饭人日记',
      path: '/pages/video/video',
      imageUrl: '',
      desc: '等我解决完温饱，再来解决你',
    }
  },

  onLoad() {
    // 在需要登录的地方执行初始化方法
    this.initLoginState()

    this.loadTabbars()
  },
  onReady(e) {
    this.pageOpacity = 1
  },
  methods: {
    ...mapActions(['initLoginState']),
    loadData(type) {
      let that = this
      let tabItem = this.tabList[this.activeTab]
      // 加载
      if (type === 'add') {
        if (tabItem.loadMoreStatus === 2){
          return
        }
        tabItem.loadMoreStatus = 1
      }
      // 刷新
      if (type === 'refresh') {
        tabItem.currentPage = 1
      }
    },

    handleTab(index) {
      this.activeTab = index;
      this.loadData('add')
    },
  }
};
</script>

<style lang="less" scoped>
.container {
  transition: all 0.8s linear;
  font-size: 14px;
  line-height: 24px;
  position: relative;
}
.home {
  padding-top: 120rpx;

  .top-barrage {
    width: 100%;
    height: 320rpx;
    overflow: hidden;
  }

  .card-bottom {
    width: 100%;

    .top-tab {
      display: flex;
      height: 120rpx;
      position: fixed;
      top: 0;
      width: 100%;
      z-index: 100;
      background-color: #ffffff;

      .tab-item {
        flex: 1;
        color: #999;
        border-bottom: 4rpx solid #ececec;
      }

      .active {
        color: var(--activeColor);
        border-bottom: 4rpx solid var(--activeColor);
      }
    }
  }
}
</style>
