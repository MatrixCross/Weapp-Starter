import { setNavigationBarHeight } from './utils/index'
import svg from './assets/svg/index'

App<IAppOption>({
  onLaunch() {
    this.globalData.svgs = svg

    // 获取状态栏和顶部栏高度
    setNavigationBarHeight()
  },
  globalData: {
    iconApiURL: 'https://api.iconify.design/',
  },
})
