import cryptoJs from 'crypto-js';
import { createCustomRequest } from './createInstance';
import config from '../../config';

// 默认请求封装
export const request = createCustomRequest({
  baseUrl: config.apiServer[config.env],
  timeout: 15000,
  requestHandler(config) {
    // 可以在这里对请求进行通用修改，比如让请求都带上token
    // if (config.header && wx.getStorageSync('token')) {
    //   config.header.token = 'Bearer ' + wx.getStorageSync('token')
    // }
  },
  successTransformer(retData) {
    if (retData.statusData !== 200) {
      return {
        isSuccess: false,
        code: retData.statusCode,
        msg: `server return statusCode with ${retData.statusCode}`,
      };
    } else if (retData.data && retData.data.code === 0) {
      return {
        isSuccess: true,
        ...retData.data,
      };
    } else {
      return {
        isSuccess: false,
        ...retData.data,
      };
    }
  },
  failTransformer(err) {
    return {
      isSuccess: false,
      code: err.errno || -1,
      msg: err.errMsg,
    };
  },
});
