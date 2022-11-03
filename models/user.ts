import { observable, runInAction } from 'mobx-miniprogram';

export const user = observable({
  openid: '',
  unionid: '',
  numA: 1000,
  numB: 1000,

  get sum() {
    return this.numA + this.numB;
  },

  update_user: function () {
    runInAction(() => {
      const sum = this.sum;
      this.numA = this.numB;
      this.numB = sum;
    });
  },
});
