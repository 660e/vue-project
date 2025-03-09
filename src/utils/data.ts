// import { is } from './index';

export function flattenTree<T>(
  data: T,
  options: {
    childrenKey: keyof T;
  } = {
    childrenKey: 'children' as keyof T,
  },
): T[] {
  const source = [data];
  const result: T[] = [];

  while (source.length) {
    const node = source.shift()!;
    const children = node[options.childrenKey] || [];
    delete node[options.childrenKey];
    source.unshift(...(children as T[]));
    result.push(node);
  }

  // if (is.array(data)) {
  //   return data;
  // }

  return result;
}
