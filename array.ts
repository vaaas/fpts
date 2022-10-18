import { Unary } from './data'
import { prefix } from './duad'
import { map as imap } from './iter'
import { of as mof, values } from './map'
import { compose } from './function'

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

/** return iterable without any duplicates */
export function unique<T>(xs: Iterable<T>): Array<T> {
	return Array.from(new Set(xs))
}

/** return iterable without any duplicates
 *
 * the key by which an iterable is defined as a duplicate is provided by the function `f`
 */
export function uniqueBy<A, B>(f: Unary<A, B>): (xs: Iterable<A>) => Array<A> {
	return compose(imap(prefix(f)), mof, values, of);
}

/** return every element of an array except the first */
export function tail<T>(xs: T[]): T[] {
	return xs.slice(1);
}

/** return every element of an array excepd the last */
export function head<T>(xs: T[]): T[] {
	return xs.slice(0, -1);
}

/** join all elements of an array into a string, separated by a delimitter */
export function joinWith(s: string): (xs: Array<string>) => string {
	return function (xs) {
		return xs.join(s)
	}
}

export function dup<T>(x: T): [T, T] {
	return [x, x]
}
