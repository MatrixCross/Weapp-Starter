import { BehaviorWithStore } from 'mobx-miniprogram-bindings'
import { global, user } from '../../store/index'

export const mobxBehavior = BehaviorWithStore({
  storeBindings: [
    {
      namespace: 'global',
      store: global,
      fields: ['numA', 'numB', 'sum', 'isLoadedSvg'],
      actions: ['update'],
    },
    {
      store: user,
      fields: ['numA', 'numB', 'sum'],
      actions: ['update_user'],
    },
  ],
})
