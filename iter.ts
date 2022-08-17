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

/** left scan for iterables with intermediate results
 *
 * successively apply a binary function **A** → **B** → **A**
 * to a collection of **Bs**, accumulating the result into **A**
 *
 * yields each step **A** as an iterable of accumulated values.
 * the last element is identical to *foldl*.
 *
 * the initial value is given by **i**
 */
export function scanl<A, B>(f: Binary<A, B, A>, i: A): (xs: Iterable<B>) => Iterable<A> {
	return function* (xs) {
		let a = i
		yield a
		for (const x of xs)
			yield a = f(a)(x)
	}
}

/** right scan for iterables with intermediate results
 *
 * successively apply a binary function **B** → **A** → **A**
 * to a collection of **Bs**, accumulating the result into **A**
 *
 * yields each step **A** as an iterable of accumulated values.
 * the last element is identical to *foldr*.
 *
 * the initial value is given by **i**
 */
 export function scanr<A, B>(f: Binary<B, A, A>, i: A): (xs: Iterable<B>) => Iterable<A> {
	return function* (xs) {
		let a = i
		yield a
		for (const x of xs)
			yield a = f(x)(a)
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

/** test if every member of collection **XS** passes the testing function **F** */
export function every<T>(f: Unary<T, boolean>): (xs: Iterable<T>) => Boolean {
	return function(xs) {
		for (const x of xs)
			if (!f(x))
				return false
		return true
	}
}

/** test if at least one member of collection **XS** passes the testing function **F** */
export function some<T>(f: Unary<T, boolean>): (xs: Iterable<T>) => Boolean {
	return function(xs) {
		for (const x of xs)
			if (f(x))
				return true
		return false
	}
}

/** test if an argument **X** passes all the functions **FS** */
export function and<T>(...fs: Unary<T, boolean>[]): (x: T) => Boolean {
	return function(x) {
		for (const f of fs)
			if (!f(x))
				return false
		return true
	}
}

/** test if an argument **X** passes at least one function of **FS** */
export function or<T>(...fs: Unary<T, boolean>[]): (x: T) => Boolean {
	return function(x) {
		for (const f of fs)
			if (f(x))
				return true
		return false
	}
}

/** limit iterable to N members */
export function limit(n: number): <T>(xs: Iterable<T>) => Iterable<T> {
	return function* (xs) {
		let i = 0
		for (const x of xs)
			if (i < n) {
				yield x
				i++
			} else break
	}
}

/** infinitely repeat an iterable */
export function* repeat<T>(xs: Iterable<T>): Iterable<T> {
	const arr = []
	for (const x of xs) {
		yield x
		arr.push(x)
	}

	while (true)
		yield* arr
}

/** prepend an index to an iterable */
export function* enumerate<T>(xs: Iterable<T>): Iterable<[number, T]> {
	let i = 0
	for (const x of xs)
		yield [i++, x]
}

/**
 * Apply a function to pairs of elements at the same index in two iterables, collecting the results in a new iterable.
 *
 * If one iterable is longer, elements will be discarded from the longer iterable.
 */
export function zipWith<A, B, C>(f: Binary<A, B, C>): (as: Iterable<A>) => (bs: Iterable<B>) => Iterable<C> {
	return function (as) {
		return function* (bs) {
			const ai = iter(as)
			const bi = iter(bs)
			while (true) {
				const av = ai.next()
				const bv = bi.next()
				if (av.done || bv.done)
					break
				else yield f(av.value)(bv.value)
			}
		}
	}
}
