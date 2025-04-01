import { request } from '@/utils/index';

export function randomuser(params: { results?: number } = {}) {
  return request.get('https://randomuser.me/api/', { params: { nat: 'us', ...params } });
}
