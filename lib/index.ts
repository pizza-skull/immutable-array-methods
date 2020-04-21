const setMultiple = <T, U>(
  array: readonly T[],
  index: number,
  items: readonly U[]
): readonly (T | U)[] =>
  items.length === 0
    ? array
    : setMultiple(set(array, index, items[0]), index + 1, items.slice(1));

export const push = <T, U>(array: readonly T[], value: U): readonly (T | U)[] =>
  (array as (T | U)[]).concat([value]);

export const pop = <T>(array: readonly T[]): readonly T[] => array.slice(0, -1);

export const shift = <T>(array: readonly T[]): readonly T[] => array.slice(1);

export const unshift = <T, U>(
  array: readonly T[],
  value: U
): readonly (T | U)[] => ([value] as (T | U)[]).concat(array);

export const splice = <T, U>(
  array: readonly T[],
  index: number,
  deleteCount: number,
  ...items: readonly U[]
) =>
  deleteCount === items.length
    ? setMultiple(array, index, items)
    : (array as (T | U)[])
        .slice(0, index)
        .concat(items)
        .concat(array.slice(index + deleteCount));

export const set = <T, U>(
  array: readonly T[],
  index: number,
  value: U | T
): readonly (T | U)[] =>
  array[index] === value
    ? array
    : (array as (T | U)[])
        .slice(0, index)
        .concat([value])
        .concat(array.slice(index + 1));

export const flatten = <T, U>(
  array: readonly (T | U[])[]
): readonly (T | U)[] => {
  if (array.every((value) => !Array.isArray(value))) {
    return array as T[];
  }

  return [].concat(...(array as any)) as (T | U)[];
};

export function map<T>(
  array: readonly T[],
  fn: (input: T, index: number) => T
): readonly T[];
export function map<T, U>(
  array: readonly T[],
  fn: (input: T, index: number) => U
): readonly U[];
export function map<T, U>(
  array: readonly T[],
  fn: (input: T, index: number) => T | U
) {
  let changed = false;
  const newArray = array.map((obj, index) => {
    const newObj = fn(obj, index);
    changed = changed || obj !== newObj;
    return newObj;
  });

  return changed ? newArray : array;
}

export const move = <T>(
  array: readonly T[],
  fromIndex: number,
  toIndex: number
): readonly T[] => {
  return splice(splice(array, fromIndex, 1), toIndex, 0, array[fromIndex]);
};

export const filter = <T>(
  array: readonly T[],
  fn: (row: T, index: number) => boolean
): readonly T[] => {
  let changed = false;
  const newArray = array.filter((row, index) => {
    const shouldKeep = fn(row, index);
    changed = !shouldKeep || changed;
    return shouldKeep;
  });
  return changed ? newArray : array;
};

