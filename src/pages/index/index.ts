import { mobxBehavior } from './behavior'
import { ComponentWithComputed } from 'miniprogram-computed'
import { testApi } from '../../apis/index'
ComponentWithComputed({
  behaviors: [mobxBehavior],
  data: {
    someData: 'string1',
  },
  computed: {
    allSum(data) {
      if (data.numA) {
        // TODO: 等待ComponentWithComputed修复：#84
        return data.numA + data.numB + data.global.numA + data.global.numB
      }
    },
  },

  methods: {
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
  },
})
