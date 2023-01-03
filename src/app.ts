import { setNavigationBarHeight } from './utils/index'
import { global } from './store/index'
import { runInAction } from 'mobx-miniprogram'
type require = (url: string, cb: (module: IAnyObject) => void) => void
App<IAppOption>({
  onLaunch() {
    // 加载svg，这里不能使用import进行导入，使用import导入会导致报错
    const reqModule = require as require
    reqModule('./assets/svg/svgs.js', (module) => {
      this.globalData.svgs = module.default
      runInAction(() => {
        global.isLoadedSvg = true
      })
    })

    // 获取状态栏和顶部栏高度
    setNavigationBarHeight()
  },
  globalData: {},
})
