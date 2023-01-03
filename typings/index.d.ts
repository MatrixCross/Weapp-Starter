interface IAppOption {
  globalData: {
    userInfo?: WechatMiniprogram.UserInfo
    svgs?: Record<string, string>
  }
}

type IAnyObject = WechatMiniprogram.IAnyObject
