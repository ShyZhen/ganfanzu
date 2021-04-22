<template>
  <view class="other">
    <view class="info-box">
      <y-PersionInfo :info="info" @change="handleMenu" />
    </view>
    <view class="diary-box" v-if="cardList && cardList.length > 0">
      <view class="scroll-wrapper">
        <!-- 日记list -->
        <view class="margin-bottom" v-for="(item, index) in cardList" :key="index">
          <y-DiaryItem :obj="item" :radius="true" />
        </view>
        <y-LoadMore :status="loadMoreStatus" />
      </view>
    </view>
    <view class="empty" v-else>
      <y-Empty />
    </view>
  </view>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { getUserInfo } from '@/apis/users.js'
import yDiaryItem from '../article/components/y-DiaryItem/y-DiaryItem'
import yLoadMore from '../article/components/y-LoadMore/y-LoadMore'
import yPersionInfo from '../article/components/y-PersionInfo/y-PersionInfo'
import yRefresh from "../article/components/y-Refresh/y-Refresh";
import yFab from "../article/components/y-Fab/y-Fab";

var that;
export default {
  data() {
    return {
      pageOpacity: 0,
      info: {},
      cardList: [],
      loadMoreStatus: 2
    };
  },
  onLoad(e) {
    // 在需要登录的地方执行初始化方法
    this.initLoginState()

    // 判断登录状态 并跳转到首页
    if (!this.hasLogin) {
      this.$toast('需要先登录呢')
      setTimeout(() => {
        this.$toLogin()
      }, 1000);
    } else {
      this.initUserInfo(e.id)
    }

    // that.info = that.$store.state.user.userInfo;
    // that.cardList = that.$store.state.diary.cardList;
  },
  computed: {
    ...mapState(['hasBinding', 'hasLogin']),
  },
  components:{
    yRefresh,
    yDiaryItem,
    yLoadMore,
    yPersionInfo,
    yFab,
  },
  methods: {
    ...mapActions(['initLoginState']),

    initUserInfo(id) {
      this.$loading('拼命拉取中...')
      getUserInfo(id).then(res => {
        this.info = res.data
        this.$loading(false)
      }).catch(err => {
        this.$loading(false)
      })
    },

    handleMenu(index) {
      switch (index) {
        case 0:
          uni.navigateTo({
            url: './like'
          });
          break;
        case 1:
          uni.navigateTo({
            url: './fans'
          });
          break;
        case 2:
          uni.navigateTo({
            url: './fans'
          });
          break;
      }
    },
  }
};
</script>

<style lang="less" scoped>
.other {
  .info-box {
    padding-bottom: 110rpx;
  }

  .diary-box {
    margin: 0 40rpx;
  }
}
</style>
