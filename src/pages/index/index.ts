import { mobxBehavior } from './behavior'
import { behavior as computedBehavior } from 'miniprogram-computed'
import { testApi } from '../../apis/index'
Page({
  behaviors: [mobxBehavior, computedBehavior],
  data: {
    someData: 'string1',
  },
  computed: {
    allSum(data: { numA: number; numB: number; global: { numA: number; numB: number } }) {
      return data.numA + data.numB + data.global.numA + data.global.numB
    },
  },

  toLog() {
    wx.navigateTo({
      url: '/packages/logs/logs',
    })
  },

  onLoad: async function () {
    console.log(1, this.data)
    console.log(await testApi())
    setTimeout(() => {
      console.log(2, this.data)
    }, 100)
  },
  onShow() {
    console.log(this.data)
  },
  showdata() {
    console.log(this.data)
  },
})
