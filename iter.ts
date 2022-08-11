import { D1 } from './combinator'
import { Unary, Binary } from './data'
import { add } from './maths'
import { concat, concatWith } from './string'

/** get the iterator of any iterable
 * like python's iter
 */
export function iter<T>(x: Iterable<T>) {
	return x[Symbol.iterator]()
}

/** test if **X** is iterable */
export function is(x: any): x is Iterable<any> {
	if (x === null || x === undefined) return false
	else return typeof x[Symbol.iterator] === 'function'
}

/** map implementation for iterables
 *
 * given a mapping function **A** → **B**
 * turn a collection of **As** into a collection of **Bs**
 */
export function map<A, B>(f: Unary<A, B>): (xs: Iterable<A>) => Iterable<B> {
	return function* (xs) {
		for (const x of xs)
			yield f(x)
	}
}

/** bind implementation for iterables
 *
 * given a mapping function **A** → **Bs**
 * turn a collection af **As** into a collection of **Bs**
 *
 * in other words, it maps and then flattens the iterable
 */
export function bind<A, B>(f: Unary<A, Iterable<B>>): (xs: Iterable<A>) => Iterable<B> {
	return function* (xs) {
		for (const x of xs)
			yield* f(x)
	}
}

/** filter implementation for iterables
 *
 * given a testing function **A** → *boolean* and a collection of **As**
 * generate a new collection of **As** that only contains the elements
 * for which the testing function returns *true*
 */
export function filter<A>(f: Unary<A, boolean>): (xs: Iterable<A>) => Iterable<A> {
	return function* (xs) {
		for (const x of xs)
			if (f(x))
				yield x
	}
}

/** left fold for iterables
 *
 * successively apply a binary function **A** → **B** → **A**
 * to a collection of **Bs**, accumulating the result into **A**
 *
 * finally, return the accumulated value
 *
 * the initial value is given by **i**
 */
export function foldl<A, B>(f: Binary<A, B, A>, i: A): (xs: Iterable<B>) => A {
	return function (xs) {
		let a = i
		for (const x of xs)
			a = f(a)(x)
		return a
	}
}

/** right fold for iterables
 *
 * successively apply a binary function **B** → **A** → **A**
 * to a collection of **Bs**, accumulating the result into **A**
 *
 * finally, return the accumulated value
 *
 * the initial value is given by **i**
 */
export function foldr<A, B>(f: Binary<B, A, A>, i: A): (xs: Iterable<B>) => A {
	return function (xs) {
		let a = i
		for (const x of xs)
			a = f(x)(a)
		return a
	}
}

/** left fold for iterables without initial value
 *
 * successively apply a binary function **A** → **B** → **A**
 * to a collection of **Bs**, accumulating the result into **A**
 *
 * finally, return the accumulated value
 *
 * the initial value is the first element of the collection
 *
 * **i** represents the default value returned in case of an empty iterable
 */
export function foldl1<A>(f: Binary<A, A, A>, i: A): (xs: Iterable<A>) => A {
	return function (xs) {
		const it = iter(xs)
		let a = i
		let v = it.next()
		if (v.done) return a
		else a = v.value
		v = it.next()
		while (!v.done) {
			a = f(a)(v.value)
			v = it.next()
		}
		return a
	}
}

/** right fold for iterables without initial value
 *
 * successively apply a binary function **B** → **A** → **A**
 * to a collection of **Bs**, accumulating the result into **A**
 *
 * finally, return the accumulated value
 *
 * the initial value is the first element of the collection
 *
 * **i** represents the default value returned in case of an empty iterable
 */
export function foldr1<A>(f: Binary<A, A, A>, i: A): (xs: Iterable<A>) => A {
	return function (xs) {
		const it = iter(xs)
		let a = i
		let v = it.next()
		if (v.done) return a
		else a = v.value
		v = it.next()
		while (!v.done) {
			a = f(v.value)(a)
			v = it.next()
		}
		return a
	}
}

/** sort an iterable into an array
 *
 * the sorting function (**prev**, **next**) → *number*
 * should return negative if *prev* should be before *next*,
 * positive if *prev* should be after *next*
 * and zero if there should be no change
 */
export function sort<T>(f: (a: T, b: T) => number): (xs: Iterable<T>) => Array<T> {
	return function (xs) {
		return Array.from(xs).sort(f)
	}
}

/** sort an iterable alphabetically, which is the default sort in Javascript */
export function alphabetically<T>(x: Iterable<T>): Array<T> {
	return Array.from(x).sort()
}

/** calculate the sum of an iterable */
export const sum = foldl(add, 0)

/** calculate the sum of an iterable
 *
 * the number used for summation is provided by the function **f**.
 * for example, it could extract the property of an object
 */
export const sumBy = <T>(f: Unary<T, number>) => foldl(D1(add)(f), 0)

/** sort an iterable *by* some property, similar to python's key function */
export function by<A>(f: Unary<A, number|string>): (a: A, b: A) => -1|0|1 {
	return function(a, b) {
		const fa = f(a)
		const fb = f(b)
		if (fa < fb) return -1
		else if (fa > fb) return 1
		else return 0
	}
}

/** get the first element of an iterable */
export function first<T>(xs: Iterable<T>): T|undefined {
	const first = iter(xs).next()
	return first.done
		? undefined
		: first.value
}

/** get the last element of an iterable
 *
 * note that this requires walking through the entire iterable
 */
export function last<T>(xs: Iterable<T>): T|undefined {
	let last = undefined
	for (const x of xs)
		last = x
	return last
}

/** join an iterable of strings into a single string */
export const join = foldl(concat, '')

/** join an iterable of strings into a single string
 * separated by the delimiter **d**
 *
 * if the iterable is empty, always returns an empty string
 */
export const joinWith = (d: string) => foldl1(concatWith(d), '')
