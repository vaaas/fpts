export function first<T>(xs: Array<T>): T|undefined {
	return xs[0]
}

export function last<T>(xs: Array<T>): T|undefined {
	return xs[xs.length-1]
}

export function from<T>(xs: Iterable<T>): Array<T> {
	return Array.from(xs)
}

export function map<A, B>(f: (x: A) => B): (xs: Array<A>) => Array<B> {
	return function(xs) {
		return xs.map(f)
	}
}

export function filter(f: (x: A) => boolean): (xs: Array<A>) => Array<A> {
	return function(xs) {
		return xs.filter(f)
	}
}
