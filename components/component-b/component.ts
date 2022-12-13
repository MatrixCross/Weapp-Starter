import { ComponentWithStore } from 'mobx-miniprogram-bindings'
import { user } from '../../models/index'
ComponentWithStore({
  options: {
    styleIsolation: 'shared',
  },
  data: {
    someData: '...',
  },
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
  attached() {},
})
