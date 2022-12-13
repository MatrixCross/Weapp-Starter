import { ComponentWithStore } from 'mobx-miniprogram-bindings'
import { global } from '../../models/index'
ComponentWithStore({
  options: {
    styleIsolation: 'shared',
  },
  data: {
    someData: '...',
  },
  storeBindings: {
    store: global,
    fields: ['numA', 'numB', 'sum'],
    actions: {
      buttonTap: 'update',
    },
  },
})
