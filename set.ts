import { Unary } from './data'

export const of = <T>(x: Iterable<T>): Set<T> => new Set(x)

export const inside = <T>(xs: Set<T>) => (x: T): boolean => xs.has(x)

export const outside = <T>(xs: Set<T>) => (x: T): boolean => !xs.has(x)

export const map = <A, B>(f: Unary<A, B>) => (xs: Set<A>): Set<B> => {
	const n: Set<B> = new Set()
	for (const x of xs)
		n.add(f(x))
	return n
}
