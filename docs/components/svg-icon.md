# 通用 svg 展示组件

## 简介

通过请求下载svg数据并展示，数据会缓存到本地，不会重新加载


## 属性

| 参数 name   | 类型    | 必传  | 默认值 | 描述             |
| ----------- | ------- | ----- | ------ | ---------------- |
| name        | string  | true  | ''     | svg 名称         |
| color       | string  | false | ''     | svg 填充颜色     |
| width       | string  | false | 1em    | svg 的宽         |
| height      | string  | false | 1em    | svg 的高         |
| placeholder | boolean | false | true   | 不渲染时是否占位 |

> **远程url地址可以再app.ts里的globalData设置iconApiURL**。