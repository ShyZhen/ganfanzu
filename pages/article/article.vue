<template>
  <view class="home">
    <view class="card-bottom">
      <!-- 顶部分页栏 -->
      <view class="top-tab">
        <view :class="['tab-item flex-center', activeTab == index ? 'active' : '']" @tap="handleTab(index)" v-for="(item, index) in tabList" :key="index">{{ item.title }}</view>
      </view>
      <y-Refresh ref="mixPulldownRefresh" :top="100" @refresh="onPulldownReresh">
        <view class="scroll-wrapper">
          <!-- 漂流瓶 -->
          <view v-if="activeTab == 0">
            <view class="margin-bottom" v-for="(item, index) in cardList" :key="index">
              <y-DiaryItem :obj="item" />
            </view>
          </view>
          <!-- 聚集岛 -->
          <view v-else>
            <view class="margin-bottom" v-for="(item, index) in rightList" :key="item.id">
              <y-DiaryItem :obj="item" />
            </view>
          </view>
          <y-LoadMore :status="loadMoreStatus" />
        </view>
      </y-Refresh>
      <!-- 右下角按钮 -->
      <y-Fab :bottom="140" :right="40" :btnList="fabList" @click="handleFab" />
    </view>
  </view>
</template>

<script>
  import yRefresh from './components/y-Refresh/y-Refresh'
  import yDiaryItem from './components/y-DiaryItem/y-DiaryItem'
  import yLoadMore from './components/y-LoadMore/y-LoadMore'
  import yFab from './components/y-Fab/y-Fab'


  let that;
  export default {
    data() {
      return {
        startNum: 0,
        activeTab: 0,
        // tab的名称
        tabList: [
          {
            title: '最新'
          },
          {
            title: '热门'
          }
        ],
        cardList: [],
        rightList: [],
        loadMoreStatus: 1, //0加载前，1加载中，2没有更多了
        //fab的设置
        fabList: [
          {
            bgColor: '#F46845',
            text: '发布',
            fontSize: 28,
            color: '#fff'
          },
          {
            bgColor: '#fa7e62',
            text: '分享',
            fontSize: 28,
            color: '#fff'
          }
        ]
      };
    },
    components:{
      yRefresh,
      yDiaryItem,
      yLoadMore,
      yFab
    },
    onShareAppMessage(res) {
      return {
        title: '干饭人日记',
        path: '/pages/article/article',
        imageUrl: '',
        desc: '等我解决完温饱，再来解决你',
      }
    },
    onLoad() {
      that = this;
      that.loadData('add');
      that.rightList = that.testRightList()
    },
    onReachBottom() {
      that.startNum++;
      //上滑加载
      that.loadData('add');
    },
    methods: {
      loadData(type) {
        if (type === 'add') {
          // 上拉加载
          let list = that.cardList;
          if (list.length == 8) {
            that.loadMoreStatus = 2;
          } else if (list.length > 0) {
            that.cardList = that.cardList.concat({
              id: 2,
              time: '06-17',
              avatarUrl: 'https://6d61-matchbox-79a395-1302390714.tcb.qcloud.la/matchbox/cat.jpg',
              nickName: '小黄鸭',
              title: '洛稚喜欢盛淮南谁也不知道',
              follow: false,
              isLike: false,
              likeNum: '24',
              commentNum: '0',
              imgList: [
                {
                  url: 'https://6d61-matchbox-79a395-1302390714.tcb.qcloud.la/matchbox/1e942ff08083714184afbf42eba0d87.jpg'
                }
              ]
            });
          } else {
            that.cardList = that.testCardList()
          }
        } else {
          //下拉刷新
          that.$refs.mixPulldownRefresh && that.$refs.mixPulldownRefresh.endPulldownRefresh();
        }
      },
      //下拉刷新
      onPulldownReresh() {
        that.loadData('refresh');
      },
      handleTab(index) {
        that.activeTab = index;
      },
      //点击右下角tab按钮
      handleFab(e) {
        let index = e.index;
        switch (index) {
          case 0:
            uni.navigateTo({
              url: './push'
            });
            break;
          case 1:
            console.log(1);
            break;
        }
      },

      // 测试数据
      testCardList() {
        let testCardList = [{
          id: 1,
          createTime: '2秒前',
          avatarUrl: 'https://6d61-matchbox-79a395-1302390714.tcb.qcloud.la/matchbox/avatar.png',
          nickName: '小黄鸭',
          title: '生活就像夏天的柑橘树，挂着青皮的果，苦是一定的，甜也有。        --《少年的你，如此美丽》',
          follow: false,
          isLike: false,
          likeNum: '28',
          commentNum: '1',
          imgList: [{
            "url": "https://6d61-matchbox-79a395-1302390714.tcb.qcloud.la/matchbox/tree.jpg"
          }]
        }, {
          id: 2,
          "createTime": "3天前",
          "avatarUrl": "https://6d61-matchbox-79a395-1302390714.tcb.qcloud.la/matchbox/avatar.png",
          "nickName": "小黄鸭",
          "title": "对你从山有木兮木有枝的满心欢喜;到沅有芷兮澧有兰的小心翼翼;经过玲珑骰子安红豆的世俗俗气;最后陷入长相思兮长相忆的无穷思念",
          follow: false,
          isLike: false,
          likeNum: '24',
          commentNum: '0',
          "imgList": [{
            "url": "https://6d61-matchbox-79a395-1302390714.tcb.qcloud.la/matchbox/love.jpg"
          }, {
            url: 'https://6d61-matchbox-79a395-1302390714.tcb.qcloud.la/matchbox/lonely.jpg'
          }]
        }, {
          id: 3,
          "createTime": "7-10",
          "avatarUrl": "https://6d61-matchbox-79a395-1302390714.tcb.qcloud.la/matchbox/avatar.png",
          "nickName": "小黄鸭",
          "title": "我说你是人间的四月天； 笑音点亮了四面风； 轻灵，在春的光艳中交舞著变。 你是四月早天里的云烟， 黄昏吹着风的软， 星子在无意中闪，细雨点洒在花前。    --民国四大美人之首林徽因《你是人间四月天》",
          follow: false,
          isLike: false,
          likeNum: '24',
          commentNum: '0',
          "imgList": [{
            "url": "https://6d61-matchbox-79a395-1302390714.tcb.qcloud.la/matchbox/img_flower_1.jpg"
          },{
            "url": "https://6d61-matchbox-79a395-1302390714.tcb.qcloud.la/matchbox/img_flower_2.jpg"
          },{
            "url": "https://6d61-matchbox-79a395-1302390714.tcb.qcloud.la/matchbox/img_flower_3.jpg"
          },{
            "url": "https://6d61-matchbox-79a395-1302390714.tcb.qcloud.la/matchbox/img_flower_4.jpg"
          }]
        }]
        return testCardList
      },
      testRightList() {
        let testRightList = [{
          id: 3,
          "createTime": "7-10",
          "avatarUrl": "https://6d61-matchbox-79a395-1302390714.tcb.qcloud.la/matchbox/avatar.png",
          "nickName": "小黄鸭",
          "title": "我说你是人间的四月天； 笑音点亮了四面风； 轻灵，在春的光艳中交舞著变。 你是四月早天里的云烟， 黄昏吹着风的软， 星子在无意中闪，细雨点洒在花前。    --民国四大美人之首林徽因《你是人间四月天》",
          follow: false,
          isLike: false,
          likeNum: '24',
          commentNum: '0',
          "imgList": [{
            "url": "https://6d61-matchbox-79a395-1302390714.tcb.qcloud.la/matchbox/img_flower_1.jpg"
          },{
            "url": "https://6d61-matchbox-79a395-1302390714.tcb.qcloud.la/matchbox/img_flower_2.jpg"
          },{
            "url": "https://6d61-matchbox-79a395-1302390714.tcb.qcloud.la/matchbox/img_flower_3.jpg"
          },{
            "url": "https://6d61-matchbox-79a395-1302390714.tcb.qcloud.la/matchbox/img_flower_4.jpg"
          }]
        },{
          id: 1,
          createTime: '2秒前',
          avatarUrl: 'https://6d61-matchbox-79a395-1302390714.tcb.qcloud.la/matchbox/avatar.png',
          nickName: '小黄鸭',
          title: '生活就像夏天的柑橘树，挂着青皮的果，苦是一定的，甜也有。        --《少年的你，如此美丽》',
          follow: false,
          isLike: false,
          likeNum: '28',
          commentNum: '1',
          imgList: [{
            "url": "https://6d61-matchbox-79a395-1302390714.tcb.qcloud.la/matchbox/tree.jpg"
          }]
        }, {
          id: 2,
          "createTime": "3天前",
          "avatarUrl": "https://6d61-matchbox-79a395-1302390714.tcb.qcloud.la/matchbox/avatar.png",
          "nickName": "小黄鸭",
          "title": "对你从山有木兮木有枝的满心欢喜;到沅有芷兮澧有兰的小心翼翼;经过玲珑骰子安红豆的世俗俗气;最后陷入长相思兮长相忆的无穷思念",
          follow: false,
          isLike: false,
          likeNum: '24',
          commentNum: '0',
          "imgList": [{
            "url": "https://6d61-matchbox-79a395-1302390714.tcb.qcloud.la/matchbox/love.jpg"
          }, {
            url: 'https://6d61-matchbox-79a395-1302390714.tcb.qcloud.la/matchbox/lonely.jpg'
          }]
        }]
        return testRightList
      },
    }
  };
</script>

<style lang="less" scoped>

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
          color: var(--mainColor);
          border-bottom: 4rpx solid var(--mainColor);
        }
      }
    }
  }
</style>
