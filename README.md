# 原生微信小程序开发模板

## 特性

项目已经自带下面的依赖：

- [UnoCSS](https://github.com/MellowCo/unocss-preset-weapp) 功能强大且性能极高的 CSS 引擎
- [MobX](https://github.com/wechat-miniprogram/mobx-miniprogram-bindings) 官方推荐的全局状态管理库
- [computed](https://github.com/wechat-miniprogram/computed) 像写 Vue 一样写 computed 和 watch 吧
- [Vant](https://vant-contrib.gitee.io/vant-weapp) 轻量、可靠的微信小程序组件库
- [TDesign](https://tdesign.tencent.com/miniprogram/overview) 腾讯官方组件库，但是还没有发布正式版,API可能会变
- SvgIcon 自实现 svg 动态加载组件，可使用脚本自动从 iconify 拉取 svg 标签

项目配置了一个分包示例，可以按需求进行修改。

## 创建项目

```bash
pnpm create matrix-starter
# 输入项目名、版本号、选择weapp模板
cd your-project
pnpm i
```

## 项目结构

```
Weapp-Starter
├── .husky // git hooks
├── build // 一些自动化脚本
├── docs // 项目文档
├── src // 小程序源码
     ├── apis // 后端接口封装
     ├── assets // 资源目录
           ├── svg // 存放svg文件
           └── img // 存放图片文件
     ├── components // 公用组件
     ├── config // 一些全局公用的配置、数据
     ├── custom-tab-bar // 自定义tabbar
     ├── store // 全局状态
     ├── packages // 分包，如果分包内容比较多，建议按照package-xx 拆分
     ├── pages // 主包的页面
     └── utils // 公用方法
└── typings // 类型声明文件
```

## 使用方法

1. 使用`npm i`或者`pnpm i`安装依赖
2. 运行`npm run unocss`或者`pnpm unocss`监听 wxml 文件并生成对应 wxss
3. 在微信开发者工具，点击：工具-构建 npm
4. 开始编写代码

> Unocss 用法和 Tailwind 基本一致，可以查看[Tailwind](https://tailwindcss.com/)官方文档进行使用，微信小程序的 class 不支持写`%`，所以要用`/`来代替，比如 w-50%可以用 w-1/2 表示

> SvgIcon 用法：SvgIcon 组件会从 globalData 读取 svg 标签，然后动态生成 url，并使用 css 渲染。项目在 build/getIconify.ts 实现了读取一个 json 文件里的`iconList`列表，然后生成 js/ts 文件，然后导入到 globalData 即可根据 svg 的名字加载 svg，使用`pnpm getIconify`快速执行下载svg。或者使用online属性，从远程加载，**记得将iconApiURL的url加入到微信开发平台后台设置允许访问的地址里去**。

## 项目规范

1. 主包页面存放在 pages 目录下，分包页面存放在 packages 目录下，如果分包内容非常多，可以按照 packageXXX 再进行区分。
2. 全局状态模型定义存放在 models 目录下，按照业务拆分模块。
3. 接口调用方式封装在 apis 目录下，可以按照业务区分模块，如果项目比较大有多个后端接口地址，可以归类到不同文件夹进行区分。
4. 接口通用的请求处理、响应处理、失败处理都封装在 utils/request 目录下，参考`utils/request/defaultRequest.ts`，不通用的数据和逻辑操作通过参数传入。
5. TS 类型规范，业务相关的类型定义在 typings 目录下，按需使用 namespace 和不同的 d.ts 进行拆分，如果业务复杂，还可以归类到不同文件夹进行区分。
6. 页面也需要使用Component进行构建，Page不适合复杂的界面，所以统一使用Component就行了。

## 注意点

1. [mobx 使用注意点](./docs/mobx使用注意点.md)
2. [svg-icon 组件使用注意点](./docs/copmponents/svg-icon.md)
