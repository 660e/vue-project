export function flattenTree<T>(data: T[], children = 'children'): T[] {
  return data.reduce((accumulator: T[], currentValue: T) => {
    return [...accumulator, currentValue, ...flattenTree((currentValue[children as keyof T] as T[]) || [])];
  }, []);
}
