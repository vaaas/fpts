import { Unary } from './data'

export const of = <T>(x: Iterable<T>): Set<T> => new Set(x)

export const inside = <T>(xs: Set<T>) => <U>(x: U | T): x is T => xs.has(x as T)

export const outside = <T>(xs: Set<T>) => <U>(x: U | T): x is U => !xs.has(x as T)

export const map = <A, B>(f: Unary<A, B>) => (xs: Set<A>): Set<B> => {
	const n: Set<B> = new Set()
	for (const x of xs)
		n.add(f(x))
	return n
}

export const diff = <T>(as: Set<T>) => (bs: Set<T>): Set<T> => {
	const n = new Set<T>()
	for (const x of as)
		if (!bs.has(x))
			n.add(x)
	return n
}

export const filter = <T>(f: Unary<T, boolean>) => (xs: Set<T>): Set<T> => {
    const ys = new Set<T>()
    for (const x of xs)
        if (f(x))
            ys.add(x)
    return ys
}

/** returns whether set A and set B have the same contents */
export const same = <T>(a: Set<T>) => (b: Set<T>): boolean => {
    if (a.size !== b.size)
        return false
    for (const x of a)
        if (!b.has(x))
            return false
    return true
}
