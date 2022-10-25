import { createStoreBindings } from 'mobx-miniprogram-bindings';
import { user } from '../../models/index';
Component({
  options: {
    styleIsolation: 'shared',
  },
  data: {
    someData: '...',
  },
  attached() {
    this.storeBindings = createStoreBindings(this, {
      namespace: 'user_store',
      store: user,
      fields: {
        numA: 'numA',
        numB: (store) => {
          return store.numB;
        },
        sum: 'sum',
      },
      actions: {
        buttonTap: 'update_user',
      },
    });
  },
});
