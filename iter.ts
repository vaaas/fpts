import { Unary, Binary } from './data'

export function is(x: any): boolean {
	if (x === null || x === undefined) return false
	else return typeof x[Symbol.iterator] === 'function'
}

export function map<A, B>(f: Unary<A, B>): (xs: Iterable<A>) => Iterable<B> {
	return function* (xs) {
		for (const x of xs)
			yield f(x)
	}
}

export function filter<A>(f: Unary<A, boolean>): (xs: Iterable<A>) => Iterable<A> {
	return function* (xs) {
		for (const x of xs)
			if (f(x))
				yield x
	}
}

export function foldl<A, B>(f: Binary<A, B, A>, i: A): (xs: Iterable<B>) => A {
	return function (xs) {
		let a = i
		for (const x of xs)
			a = f(a)(x)
		return a
	}
}

export function sort<T>(f: (a: T, b: T) => number): (xs: Iterable<T>) => Array<T> {
	return function (xs) {
		return Array.from(xs).sort(f)
	}
}
