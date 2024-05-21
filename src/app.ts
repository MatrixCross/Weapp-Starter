import { setNavigationBarHeight } from './utils/index'

App<IAppOption>({
  onLaunch() {
    // 获取状态栏和顶部栏高度
    setNavigationBarHeight()
  },
  globalData: {
    iconApiURL: 'https://api.iconify.design/',
  },
})
