import dayjs from 'dayjs'

Page({
  data: {
    logs: [],
  },
  onLoad() {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map((log) => {
        return {
          date: dayjs(new Date(log)).format('YYYY年MM月DD日 HH:mm:ss'),
          timeStamp: log,
        }
      }),
    })
  },
})
