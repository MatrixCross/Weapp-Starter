interface IAppOption {
  globalData: {
    userInfo?: WechatMiniprogram.UserInfo
    svgs?: Record<string, string>
    iconApiURL?: string
  }
}

type IAnyObject = WechatMiniprogram.IAnyObject
