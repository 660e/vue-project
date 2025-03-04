import { request } from '@/utils/index';

export function randomuser() {
  return request.get('https://randomuser.me/api/');
}
