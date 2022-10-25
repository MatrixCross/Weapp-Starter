# 原生微信小程序开发模板

## 特性
项目已经自带下面的依赖：
- [UnoCSS](https://github.com/MellowCo/unocss-preset-weapp) 功能强大且性能极高的 CSS 引擎
- [MobX](https://github.com/wechat-miniprogram/mobx-miniprogram-bindings) 官方推荐的全局状态管理库
- [computed](https://github.com/wechat-miniprogram/computed) 像写Vue一样写computed和watch吧
- [TDesign](https://tdesign.tencent.com/miniprogram/overview) 腾讯官方组件库，但是还没有发布正式版
- [Vant](https://vant-contrib.gitee.io/vant-weapp) 轻量、可靠的微信小程序组件库

项目配置了一个分包示例，可以按需求进行修改。

## 使用方法
1. 使用`npm i`安装依赖
2. 在微信开发者工具，点击：工具-构建npm
3. 开始使用

> Unocss用法和Tailwind基本一致，可以查看[Tailwind](https://tailwindcss.com/)官方文档进行使用，

## TODO
- [ ] 添加wx.request的封装