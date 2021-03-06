 # 干饭组小程序

 ### 项目简介
 > 美团、饿了么CPS红包，以及京东、拼多多、有赞等等所有支持小程序平台的商城推广。

 ### 项目说明

 - uniapp + php 前后端分离
 - 推广商品链接由后端接口获取，可动态更新商品列表，不需要写死在客户端中重新审核。
 - 支持微信小程序、H5
 - 统一的推广数据格式，支持后端接口拉取API、支持手动自定义商品列表

 ### 使用说明
 1. 复制配置文件，并修改配置好的后端接口host: `cp config/config.js.example config/config.js`
 2. 使用hbuilder打包运行
 3. 后端接口api全部在`apis/ganfan.js`中，可以依照自己的实际情况修改

 ### 线上微信小程序地址
 ![img](/tmp/mp-weixin.jpg)
 ### 示例图
 <img src="/tmp/index.jpg" width="30%">
 <img src="/tmp/shop.jpg" width="30%">
 <img src="/tmp/about.jpg" width="30%">
 
 ### Future
 - 推荐列表导航下拉固定状态栏，添加状态栏高度获取等逻辑
 - 推荐列表上滑加载，下拉刷新
 - 商品搜索优惠，支持固定商品url、商品title模糊搜索
 （有空在搞）
 
 ### Contact
 - [博客 https://www.litblc.com](https://www.litblc.com)
 - QQ群(php): 815675006
 - GitHub/ShyZhen
 
 ### 其他
 - 本项目后端代码比较简单，你写个单页面也能满足，俺使用的是自己几年前写的一个垃圾框架（脚手架）
 - 如果觉得还行，想用俺的后端接口，可以联系俺
 - 本项目灵感来自 https://github.com/zwpro/coupons
 
