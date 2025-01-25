export function flattenTree<T>(data: T[], children = 'children'): T[] {
  return data.reduce((accumulator: T[], currentValue: T) => {
    return [...accumulator, currentValue, ...flattenTree((currentValue[children as keyof T] as T[]) || [])];
  }, []);
}

export function buildTree<T extends Record<string, string | number | boolean | T[]>>(
  data: T[],
  id: keyof T & string = 'id',
  pid: keyof T & string = 'pid',
  children: keyof T & string = 'children',
): T[] {
  const map: Record<string, T> = {};
  data.forEach((node) => {
    map[node[id] as string] = { ...node, [children]: [] };
  });

  return data.reduce((accumulator: T[], currentValue) => {
    if (!currentValue[pid]) {
      accumulator.push(map[currentValue[id] as string]);
    } else {
      if (map[currentValue[pid] as string]) {
        (map[currentValue[pid] as string][children] as T[]).push(map[currentValue[id] as string]);
      }
    }
    return accumulator;
  }, []);
}

// export function buildTree<T extends Record<string, string | T[]>>(
//   data: T[],
//   id: keyof T & string = 'id',
//   pid: keyof T & string = 'pid',
//   children: keyof T & string = 'children',
// ): T[] {
//   const map: Record<string, T & { [K in typeof children]: T[] }> = {};

//   data.forEach((node) => {
//     // 将每个节点映射为包含 children 属性的新对象
//     map[node[id] as string] = { ...node, [children]: [] } as T & { [K in typeof children]: T[] };
//   });

//   return data.reduce(
//     (accumulator, currentValue) => {
//       if (!currentValue[pid]) {
//         // 根节点直接放入结果数组
//         accumulator.push(map[currentValue[id] as string]);
//       } else {
//         // 非根节点，挂载到父节点的 children 下
//         const parentNode = map[currentValue[pid] as string];
//         if (parentNode) {
//           parentNode[children].push(map[currentValue[id] as string]);
//         }
//       }
//       return accumulator;
//     },
//     [] as (T & { [K in typeof children]: T[] })[],
//   );
// }
