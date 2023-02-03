import dayjs from 'dayjs'

Component({
  data: {
    logs: [],
  },
  methods: {
    onLoad() {
      this.setData({
        logs: (wx.getStorageSync('logs') || []).map((log: string) => {
          return {
            date: dayjs(new Date(log)).format('YYYY年MM月DD日 HH:mm:ss'),
            timeStamp: log,
          }
        }),
      })
    },
  },
})
