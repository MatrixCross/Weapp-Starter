export default {
  env: 'dev', // dev | prod
  // 主要的后端服务地址
  defaultApiServer: {
    dev: 'https://baidu.com',
    prod: 'https://baidu.com',
  },
  // 缓存默认有效时间（单位：秒）
  storageExpire: {
    dev: 60 * 60 * 24 * 30,
    prod: 60 * 60 * 24 * 30,
  },
} as const;
