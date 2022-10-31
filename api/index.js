import { testBehavior } from '../pages/index/behavior';
import { request } from '../utils/request/index';

export async function testApi(data) {
  return await request({
    url: '/test',
  });
}
