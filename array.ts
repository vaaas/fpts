import { Unary } from './data'

/** return the first element of an array */
export function first<T>(xs: Array<T>): T|undefined {
	return xs[0]
}

/** return the last element of an array */
export function last<T>(xs: Array<T>): T|undefined {
	return xs[xs.length-1]
}

/** creates a new array from an iterable */
export function of<T>(xs: Iterable<T>): Array<T> {
	return Array.from(xs)
}

/** map implementation for arrays */
export function map<A, B>(f: Unary<A, B>): Unary<Array<A>, Array<B>> {
	return function(xs) {
		return xs.map(f)
	}
}

/** filter implentation for arrays */
export function filter<A>(f: Unary<A, boolean>): Unary<Array<A>, Array<A>> {
	return function(xs) {
		return xs.filter(f)
	}
}

/** bind / flatMap implentation for arrays */
export function bind<A, B>(f: Unary<A, Array<B>>): Unary<Array<A>, Array<B>> {
	return function(xs) {
		return xs.flatMap(f)
	}
}
