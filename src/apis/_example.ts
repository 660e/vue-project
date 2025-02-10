import { request } from '@/utils/request.ts';

export function randomuser() {
  return request.get('https://randomuser.me/api/');
}
