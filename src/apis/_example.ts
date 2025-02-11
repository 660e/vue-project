import { request } from '@/utils/index.ts';

export function randomuser() {
  return request.get('https://randomuser.me/api/');
}
