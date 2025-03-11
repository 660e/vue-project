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
  return data.flatMap((node) => flattenObjectTree(node, childrenKey));
}

export function flattenTree<T>(
  data: T | T[],
  options: {
    childrenKey: keyof T;
  } = {
    childrenKey: 'children' as keyof T,
  },
) {
  if (is.array(data)) {
    return flattenArrayTree(data, options.childrenKey);
  }

  return flattenObjectTree(data, options.childrenKey);
}

export function buildTree<T>(
  data: T[],
  options: {
    childrenKey: string;
    idKey: keyof T;
    parentIdKey: keyof T;
  } = {
    childrenKey: 'children',
    idKey: 'id' as keyof T,
    parentIdKey: 'parentId' as keyof T,
  },
) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const map: any = {};
  const roots: T[] = [];

  data.forEach((item) => {
    map[item[options.idKey]] = { ...item, [options.childrenKey]: [] };
  });

  data.forEach((item) => {
    const node = map[item[options.idKey]];
    if (item[options.parentIdKey]) {
      const parent = map[item[options.parentIdKey]];
      if (parent) {
        parent[options.childrenKey].push(node);
      }
    } else {
      roots.push(node);
    }
  });

  return roots;
}
