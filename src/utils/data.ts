export function author() {
  return '明'.charCodeAt(0).toString(16);
}

export function flattenTree<T>(
  data: T[],
  options: {
    childrenKey: keyof T;
  } = {
    childrenKey: 'children' as keyof T,
  },
): T[] {
  console.log(options);

  return data;
}
