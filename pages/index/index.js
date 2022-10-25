import { testBehavior } from './behavior';
import { behavior as computedBehavior } from 'miniprogram-computed';
Page({
  behaviors: [testBehavior, computedBehavior],
  data: {
    someData: '...',
  },
  computed: {
    allSum(data) {
      return data.numA + data.numB + data.global.numA + data.global.numB;
    },
  },

  toLog() {
    wx.navigateTo({
      url: '/packages/logs/logs',
    });
  },

  onLoad: function () {},
  onShow() {
    console.log(this.data);
  },
  showdata() {
    console.log(this.data);
  },
});
