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
      this.setData({
        iconUrl: this.getGlobalSvg(this.data.name),
        class: this.data.color ? 'icon' : 'default-icon',
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
    getGlobalSvg(name: string) {
      // 从全局的svgs加载svg数据
      if (getApp()?.globalData?.svgs[name]) {
        return this.encodeDataUri(this.encodeSvg(getApp().globalData.svgs[name]))
      } else {
        return ''
      }
    },
  },

  observers: {
    'name,color,width,height'() {
      this.loadSvg()
    },
  },
})
