export function createCustomRequest({ requestHandler, successTransformer, failTransformer, baseUrl, timeout, header }) {
  const instance = (requestConfig) => {
    return new Promise((resolve) => {
      // 将配置的header加入到请求配置
      if (requestConfig.header && Object.prototype.toString.call(requestConfig.header) === '[object Object]') {
        Object.keys(header).forEach((key) => (requestConfig.headers[key] = header[key]));
      } else {
        requestConfig.header = header;
      }
      // 是否显示loading
      if (requestConfig.loading) {
        wx.showLoading &&
          wx.showLoading({
            title: '加载中...',
            mask: true,
          });
      }
      // 最后对请求配置进行通用化处理
      if (requestHandler) {
        requestHandler(requestConfig);
      }
      wx.request({
        url: baseUrl + requestConfig.url,
        data: requestConfig.data,
        header: requestConfig.header,
        timeout: timeout || 60000,
        method: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'].includes(requestConfig.method) ? requestConfig.method : 'GET',
        success(res) {
          if (successTransformer) {
            return resolve(successTransformer(res));
          }
          resolve(res);
        },
        fail(err) {
          if (failTransformer) {
            return resolve(failTransformer(err));
          }
          resolve(err);
        },
        complete() {
          wx.hideLoading && wx.hideLoading();
        },
      });
    });
  };
  ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'].forEach((method) => {
    instance[method.toLowerCase()] = (requestConfig) =>
      instance({
        ...requestConfig,
        method,
      });
  });
  return instance;
}
