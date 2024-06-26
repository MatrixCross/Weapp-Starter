import { storage } from '../../utils/index'

// components/icon/icon.ts
Component({
  options: {
    styleIsolation: 'apply-shared',
  },
  /**
   * 组件的属性列表
   */
  properties: {
    name: {
      type: String,
      value: '',
    },
    color: {
      type: String,
      value: '',
    },
    width: {
      type: String,
      value: '1em',
    },
    height: {
      type: String,
      value: '1em',
    },
    // 是否占位
    placeholder: {
      type: Boolean,
      value: true,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    iconUrl: '',
    class: '',
  },

  lifetimes: {
    attached() {
      this.loadSvg()
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    loadSvg() {
      // 先从缓存读取
      const iconUrl = storage.get<string>('icon::' + this.data.name)
      if (iconUrl) {
        this.setData({
          iconUrl,
          class: this.data.color ? 'icon' : 'default-icon',
        })
        return
      }
      // 缓存不存在，去iconify请求
      wx.request({
        url: `${getApp()?.globalData?.iconApiURL}${this.data.name}.svg`,
        success: (res) => {
          const iconUrl = this.encodeDataUri(this.encodeSvg(res.data as string))
          storage.set('icon::' + this.data.name, iconUrl, null)
          this.setData({
            iconUrl,
            class: this.data.color ? 'icon' : 'default-icon',
          })
        },
      })
    },
    encodeSvg(svg: string) {
      return svg
        .replace('<svg', ~svg.indexOf('xmlns') ? '<svg' : '<svg xmlns="http://www.w3.org/2000/svg"')
        .replace(/"/g, "'")
        .replace(/%/g, '%25')
        .replace(/#/g, '%23')
        .replace(/{/g, '%7B')
        .replace(/}/g, '%7D')
        .replace(/</g, '%3C')
        .replace(/>/g, '%3E')
    },
    encodeDataUri(str: string) {
      return `url("data:image/svg+xml;utf8,${str}")`
    },
  },

  observers: {
    'name,color,width,height'() {
      this.loadSvg()
    },
  },
})
