import { ComponentWithStore } from 'mobx-miniprogram-bindings'
import { global } from '../../store/index'
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
