export const of = <T>(x: Iterable<T>): Set<T> => new Set(x)

export const inside = <T>(xs: Set<T>) => (x: T): boolean => xs.has(x)

export const outside = <T>(xs: Set<T>) => (x: T): boolean => !xs.has(x)
