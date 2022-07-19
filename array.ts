import { Unary } from './data'

export function first<T>(xs: Array<T>): T|undefined {
	return xs[0]
}

export function last<T>(xs: Array<T>): T|undefined {
	return xs[xs.length-1]
}

export function of<T>(xs: Iterable<T>): Array<T> {
	return Array.from(xs)
}

export function map<A, B>(f: Unary<A, B>): Unary<Array<A>, Array<B>> {
	return function(xs) {
		return xs.map(f)
	}
}

export function filter<A>(f: Unary<A, boolean>): Unary<Array<A>, Array<A>> {
	return function(xs) {
		return xs.filter(f)
	}
}

export function bind<A, B>(f: Unary<A, Array<B>>): Unary<Array<A>, Array<B>> {
	return function(xs) {
		return xs.flatMap(f)
	}
}

export function sort<A>(f: (a: A, b: A) => number): Unary<Iterable<A>, Array<A>> {
	return function(xs) {
		return of(xs).sort(f)
	}
}

export function by<A>(f: Unary<A, number|string>): (a: A, b: A) => -1|0|1 {
	return function(a, b) {
		const fa = f(a)
		const fb = f(b)
		if (fa < fb) return -1
		else if (fa > fb) return 1
		else return 0
	}
}
