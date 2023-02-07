import { observable, runInAction, action } from 'mobx-miniprogram'
import { delay } from '../utils/index'

export const global = observable({
  numA: 1,
  numB: 2,

  get sum() {
    return this.numA + this.numB
  },

  // 模拟请求接口异步修改状态
  update: async function () {
    await delay(1000)
    runInAction(() => {
      const sum = this.sum
      this.numA = this.numB
      this.numB = sum
    })
  },

  // 使用action没办法使用this（TS报错），而且不能像上面runInAction一样使用async封装一下（action放在async函数里应该会丢失响应式）
  update1: action(() => {
    const sum = global.sum
    global.numA = global.numB
    global.numB = sum
  }),
})
