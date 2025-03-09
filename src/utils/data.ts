import { is } from './index';

function flattenObjectTree<T>(data: T, childrenKey: keyof T) {
  const source = [data];
  const result: T[] = [];

  while (source.length) {
    const node = source.shift()!;
    const children = node[childrenKey] || [];
    delete node[childrenKey];
    source.unshift(...(children as T[]));
    result.push(node);
  }

  return result;
}

function flattenArrayTree<T>(data: T[], childrenKey: keyof T) {
  console.log(childrenKey);

  return data;
}

export function flattenTree<T>(data: T | T[], options: { childrenKey: keyof T } = { childrenKey: 'children' as keyof T }) {
  if (is.array(data)) {
    return flattenArrayTree(data, options.childrenKey);
  }

  return flattenObjectTree(data, options.childrenKey);
}
