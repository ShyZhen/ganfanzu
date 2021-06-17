<script>
export default {
	onLaunch: function() {
		console.log('App Launch');
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style lang="less">
    @import 'colorui/main.css';
    @import 'colorui/icon.css';
    @import 'colorui/animation.css';
    @font-face {
      font-family: "Helvetica Neue", Helvetica, Arial, "PingFang SC", "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
    }

    page {
        --mainColor: #435257;
        --activeColor: #F2674A;
    }

    body {
      font-family: "Helvetica Neue", Helvetica, Arial, "PingFang SC", "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
      background-color: #ffffff;
    }

    view {
        /*box-sizing: border-box;*/
    }

    .flex-center {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .mainColor {
        color: var(--mainColor);
    }

    .aColor {
        color: var(--activeColor);
    }

    .color-nine{
        color: #999999;
    }

    .main-btn {
        border-radius: 40upx;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--mainColor);
        border: 1upx solid var(--mainColor);
        padding: 10rpx 40rpx;
    }

    .active-btn {
        color: #FFFFFF !important;
        background-color: var(--activeColor) !important;
        border: 1upx solid var(--activeColor) !important;
    }

    .bottom-btn {
        display: flex;

        .btn-item {
            flex: 1;
            color: var(--mainColor);

            .img {
                width: 50rpx;
                height: 50rpx;
                margin-right: 20rpx;
            }
        }
    }
</style>
