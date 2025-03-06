/* eslint-disable @typescript-eslint/no-explicit-any */
export const is = {
  array: (value: any) => Array.isArray(value),
  bigint: (value: any) => Object.prototype.toString.call(value) === '[object BigInt]',
  boolean: (value: any) => Object.prototype.toString.call(value) === '[object Boolean]',
  date: (value: any) => Object.prototype.toString.call(value) === '[object Date]',
  function: (value: any) => Object.prototype.toString.call(value) === '[object Function]',
  map: (value: any) => Object.prototype.toString.call(value) === '[object Map]',
  null: (value: any) => value === null,
  number: (value: any) => Object.prototype.toString.call(value) === '[object Number]',
  object: (value: any) => Object.prototype.toString.call(value) === '[object Object]',
  set: (value: any) => Object.prototype.toString.call(value) === '[object Set]',
  string: (value: any) => Object.prototype.toString.call(value) === '[object String]',
  symbol: (value: any) => Object.prototype.toString.call(value) === '[object Symbol]',
  undefined: (value: any) => value === void 0,
};
