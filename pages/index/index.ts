import { testBehavior } from './behavior';
import { behavior as computedBehavior } from 'miniprogram-computed';
import { testApi } from '../../api/index';
Page({
  behaviors: [testBehavior, computedBehavior],
  data: {
    someData: 'string1',
  },
  computed: {
    allSum(data: { numA: any; numB: any; global: { numA: any; numB: any; }; }) {
      return data.numA + data.numB + data.global.numA + data.global.numB;
    },
  },

  toLog() {
    wx.navigateTo({
      url: '/packages/logs/logs',
    });
  },

  onLoad: async function () {
    console.log(await testApi());
  },
  onShow() {
    console.log(this.data);
  },
  showdata() {
    console.log(this.data);
  },
});
