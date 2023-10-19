import type { Unary } from './data.js'
import { every } from './iter.js'
import { C } from './combinator.js'

export const of = <T>(x: Iterable<T>): Set<T> => new Set(x)

export const inside = <T>(xs: Set<T>) => <U>(x: U | T): x is T => xs.has(x as T)

export const outside = <T>(xs: Set<T>) => <U>(x: U | T): x is U => !xs.has(x as T)

export const map = <A, B>(f: Unary<A, B>) => (xs: Set<A>): Set<B> => {
	const n: Set<B> = new Set()
	for (const x of xs)
		n.add(f(x))
	return n
}

/** create a new set that contains all the elements of `bs` minus the elements of `as`
 *
 * IOW, calculate a set difference between `bs` and `as`
 */
export const diff = <T>(as: Set<T>) => (bs: Set<T>): Set<T> => {
	const n = new Set<T>()
	for (const x of bs)
		if (!as.has(x))
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
    if (a.size !== b.size) return false
    else return every(inside(b))(a)
}

export const superset = <A>(superset: Set<A>) => (subset: Set<A>): boolean =>
    every(inside(superset))(subset)

export const subset = C(superset)

export const intersect = <A>(a: Set<A>) => <B>(b: Set<B>): Set<A & B> => {
    const c = new Set<A & B>()
    if (a.size === 0 || b.size === 0)
        return c;
    for (const x of a)
        if (b.has(x as any))
            c.add(x as any);
    return c;
}
