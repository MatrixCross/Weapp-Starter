# mobx 使用注意点

微信小程序的 mobx 有些小问题需要注意。

## 定义 observable

和 vuex 类似，mobx 也有 action 用于修改状态的方法，但是 mobx-miniprogram 基于 mobx4 修改而来，多少带点类型推导的 bug，正确的 action 定义如下：

```ts
import { observable, runInAction, action } from 'mobx-miniprogram'
import { delay } from '../utils/index' // 简单实现的延时函数，相信你也能写出来

export const store = observable({
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

  // 使用action没办法使用this（TS报错），而且不能像上面runInAction一样使用async封装一下
  update1: action(() => {
    const sum = store.sum
    store.numA = store.numB
    store.numB = sum
  }),

  // ！！！像这么写页面不会有响应！！！
  update2: action(async () => {
    await delay(1000)
    const sum = store.sum
    store.numA = store.numB
    store.numB = sum
  }),
})
```

# binding

定义完 store 之后就需要绑定到组件或者页面，这里不能使用手动绑定，不然就会报错：

```ts
import { createStoreBindings } from 'mobx-miniprogram-bindings'

Page({
  onLoad() {
    // TS 这里会产生类型错误！！！
    this.storeBindings = createStoreBindings(this, {
      /* 绑定配置（见下文） */
    })
  },
  onUnload() {
    this.storeBindings.destroyStoreBindings()
  },
})
```

正确的绑定方法如下：

```ts
import { ComponentWithStore } from 'mobx-miniprogram-bindings'
import { store } from '../../models'
ComponentWithStore({
  storeBindings: {
    namespace: 'user_store',
    store: user,
    fields: {
      numA: 'numA',
      numB: (store: typeof user) => {
        return store.numB
      },
      sum: 'sum',
    },
    actions: {
      buttonTap: 'update_user',
    },
  },
})
```

或者使用 behavior 的方式绑定：

```ts behavior.ts
import { BehaviorWithStore } from 'mobx-miniprogram-bindings'
import { store1, store2 } from '../../models/index'

export const mobxBehavior = BehaviorWithStore({
  storeBindings: [
    {
      namespace: 'store2',
      store: store2,
      fields: ['numA', 'numB', 'sum'],
      actions: ['update'],
    },
    {
      store: store1,
      fields: ['numA', 'numB', 'sum'],
      actions: ['update_user'],
    },
  ],
})
```

```ts
import { mobxBehavior } from './behavior'
import { behavior as computedBehavior } from 'miniprogram-computed'
import { testApi } from '../../api/index'
import { store } from '../../models/index'
Page({
  // page和component应该都一样
  behaviors: [mobxBehavior, computedBehavior], // ！！！computed一定要放在后面（来着官方文档）！！！
  computed: {
    allSum(data: { numA: number; numB: number; global: { numA: number; numB: number } }) {
      return data.numA + data.numB + data.global.numA + data.global.numB
    },
  },
  readStore() {
    console.log(store) // 现在store里的值和绑定到this.data的值保持一致，但是this.data访问绑定的值无法提供正常的类型推导，如果在ts下，需要保持类型正确目前的方法只能直接读取store
  },
})
```

# Action

如果需要响应式修改 store 的值，可以使用 runInAction:

```ts
import { runInAction } from 'mobx-miniprogram'
import { store } from '../../models/index'
Page({
  // ...
  setStore(arg) {
    runInAction(() => {
      store.xxx = arg
    })
  },
})
```

**注意：如果 store 里有对象数组，则需要特殊操作**

```ts
setStore(arg) {
  runInAction(() => {
    store.myList = store.myList.map((item)=>{
      // 这里处理
    })
    // 或者使用filter之类的方法，保证list地址发生变化

    // 下面是错误演示，这样修改会导致this.data绑定的值和store不一致
    store.myList[xx].xx = arg
    store.myList = store.myList
  })
}
```
