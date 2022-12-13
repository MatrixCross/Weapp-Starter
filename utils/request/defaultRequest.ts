import config from '../../config'

// 只拓展了一个是否显示loading，可以按需添加
export type DefaultRequestOptions<T> = WechatMiniprogram.RequestOption<T> & {
  loading?: boolean
}

// 后端默认返回格式
type ResponseRowData<T extends string | IAnyObject | ArrayBuffer = string | IAnyObject | ArrayBuffer> = {
  code: number
  msg: string
  data?: T
}

// 对后端返回值的数据封装
export type DefaultResponseType<T> = ResponseRowData<T> & {
  isSuccess: boolean
}

// 基本的请求方法实例
type BaseRequest = <T, U extends DefaultResponseType<T> = DefaultResponseType<T>>(
  requestConfig: DefaultRequestOptions<U>,
) => Promise<U>

// 封装好http method的请求实例
type DefaultRequest = BaseRequest & {
  get: BaseRequest
  post: BaseRequest
  put: BaseRequest
  delete: BaseRequest
}

const baseRequest: BaseRequest = function <T, U extends DefaultResponseType<T> = DefaultResponseType<T>>(
  requestOption: DefaultRequestOptions<U>,
) {
  return new Promise<U>((resolve) => {
    // 这里配置自定义的header
    const header = {}
    if (requestOption.header) {
      requestOption.header = {
        ...requestOption,
        header,
      }
    } else {
      requestOption.header = header
    }
    // 是否显示loading，显示mask用于阻止用户多次点击
    if (requestOption.loading) {
      wx.showLoading &&
        wx.showLoading({
          title: '加载中...',
          mask: true,
        })
    }
    // 请求前这里可以再次对requestOption进行处理
    requestOption.url = config.defaultApiServer[config.env] + requestOption.url
    if (!requestOption.success) {
      // 通用的响应处理方法，可以在下面添加
      requestOption.success = (result) => {
        resolve({
          isSuccess: Boolean(result.data && result.data.code === 0),
          code: result.data.code ? result.data.code : -1,
          msg: result.data.msg ? result.data.msg : '',
          data: result.data.data,
        } as U)
      }
    } else {
      // 不通用的失败处理方法，可以在请求时在fail传递handler进来
      const rowHandler = requestOption.success
      requestOption.success = (result) => {
        rowHandler(result)
        resolve({
          isSuccess: Boolean(result.data && result.data.code === 0),
          code: result.data.code ? result.data.code : -1,
          msg: result.data.msg ? result.data.msg : '',
          data: result.data.data,
        } as U)
      }
    }
    if (!requestOption.fail) {
      // 通用的失败处理方法，可以在下面添加
      requestOption.fail = (err) => {
        resolve({
          isSuccess: true,
          code: -1,
          msg: err.errMsg,
          data: undefined,
        } as U)
      }
    } else {
      // 不通用的失败处理方法，可以在请求时在fail传递handler进来
      const handler = requestOption.fail
      requestOption.fail = (err) => {
        handler(err)
        resolve({
          isSuccess: true,
          code: -1,
          msg: err.errMsg,
          data: undefined,
        } as U)
      }
    }
    wx.request({
      ...requestOption,
      complete() {
        wx.hideLoading && wx.hideLoading()
      },
    })
  })
}

const defaultRequest = baseRequest as unknown as DefaultRequest

// 仿照axios，添加get post put delete方法
;(['get', 'post', 'put', 'delete'] as const).forEach((method) => {
  defaultRequest[method] = (requestConfig) => {
    return baseRequest({
      ...requestConfig,
      method: method.toUpperCase() as 'GET' | 'POST' | 'PUT' | 'DELETE',
    })
  }
})

export { defaultRequest }
