export default {
  env: 'dev', // dev | prod
  // 后端服务地址
  apiServer: {
    dev: 'https://baidu.com',
    prod: 'https://baidu.com',
  },
  // 缓存默认有效时间（单位：秒）
  storageExpire: {
    dev: 60 * 60 * 24 * 30,
    prod: 60 * 60 * 24 * 30,
  },
};
