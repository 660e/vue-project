import { is } from './index';

export function flattenTree<T>(
  data: T | T[],
  options: {
    childrenKey: keyof T;
  } = {
    childrenKey: 'children' as keyof T,
  },
): T[] {
  console.log(options);

  if (is.array(data)) {
    return data;
  }

  return [data];
}
