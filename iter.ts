import { D1 } from './combinator'
import { Unary, Binary } from './data'
import { add } from './maths'

export function iter<T>(x: Iterable<T>) {
	return x[Symbol.iterator]()
}

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

export function alphabetically<T>(x: Iterable<T>): Array<T> {
	return Array.from(x).sort()
}

export const sum = foldl(add, 0)

export const sumBy = <T>(f: Unary<T, number>) => foldl(D1(add)(f), 0)

export function by<A>(f: Unary<A, number|string>): (a: A, b: A) => -1|0|1 {
	return function(a, b) {
		const fa = f(a)
		const fb = f(b)
		if (fa < fb) return -1
		else if (fa > fb) return 1
		else return 0
	}
}

export function first<T>(xs: Iterable<T>): T|undefined {
	const first = iter(xs).next()
	return first.done
		? undefined
		: first.value
}

export function last<T>(xs: Iterable<T>): T|undefined {
	let last = undefined
	for (const x of xs)
		last = x
	return last
}
