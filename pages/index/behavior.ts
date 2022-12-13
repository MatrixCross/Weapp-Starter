import { BehaviorWithStore } from 'mobx-miniprogram-bindings'
import { global, user } from '../../models/index'

export const mobxBehavior = BehaviorWithStore({
  storeBindings: [
    {
      namespace: 'global',
      store: global,
      fields: ['numA', 'numB', 'sum'],
      actions: ['update'],
    },
    {
      store: user,
      fields: ['numA', 'numB', 'sum'],
      actions: ['update_user'],
    },
  ],
})
