import { request } from '@/utils/request';

export function randomuser() {
  return request.get('https://randomuser.me/api/');
}
