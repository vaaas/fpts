import { D1 } from './combinator'
import { Unary, UnaryP, Binary } from './data'
import { add } from './maths'
import { concat, concatWith } from './string'
import { Option } from './option'
import { duad } from './duad'

export const StopIteration = Symbol()

/** get the iterator of any iterable
 * like python's iter
 */
export function iter<T>(x: Iterable<T>) {
	return x[Symbol.iterator]()
}

export function next<T>(x: Iterator<T, any, any>): T | typeof StopIteration {
    const n = x.next()
    return n.done
        ? StopIteration
        : n.value
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
export function filter<A, B extends A>(f: UnaryP<A, B> | Unary<A, boolean>): (xs: Iterable<A>) => Iterable<B> {
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
export function every<T>(f: Unary<T, boolean>): (xs: Iterable<T>) => boolean {
	return function(xs) {
		for (const x of xs)
			if (!f(x))
				return false
		return true
	}
}

/** test if at least one member of collection **XS** passes the testing function **F** */
export function some<T>(f: Unary<T, boolean>): (xs: Iterable<T>) => boolean {
	return function(xs) {
		for (const x of xs)
			if (f(x))
				return true
		return false
	}
}

/** test if an argument **X** passes all the functions **FS** */
export function and<T>(...fs: Unary<T, boolean>[]): (x: T) => boolean {
	return function(x) {
		for (const f of fs)
			if (!f(x))
				return false
		return true
	}
}

/** test if an argument **X** passes at least one function of **FS** */
export function or<T>(...fs: Unary<T, boolean>[]): (x: T) => boolean {
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
            for (
                let a = next(ai), b = next(bi);
                a !== StopIteration && b !== StopIteration;
                a = next(ai), b = next(bi)
            )
                yield f(a)(b)
		}
	}
}

export const zip = zipWith(duad) as <A, B>(as: Iterable<A>) => (bs: Iterable<B>) => Iterable<[A, B]>

/** execute a function on each member of a collection
 *
 * - `f` — the function to execute
 * - `xs` — the collection
 */
export function each<T>(f: (x: T) => void): (xs: Iterable<T>) => void {
	return function(xs) {
		for (const x of xs)
			f(x)
	}
}

/** partition iterable in two halves depending on a boolean function
 *
 * elements for which the function returns true are inserted to the right
 *
 * elements for which the function returns false are inserted to the left
 */
export function partition<A, B extends A>(f: UnaryP<A, B>): (xs: Iterable<A>) => [Array<Exclude<A, B>>, B[]];
export function partition<A, L, R>(f: Unary<A, boolean>): (xs: Iterable<A>) => [L[], R[]];
export function partition<T>(f: Unary<T, boolean>): (xs: T[]) => [T[], T[]] {
	return function(xs) {
		const ls: T[] = []
		const rs: T[] = []

		for (const x of xs)
			if (f(x))
				rs.push(x)
			else
				ls.push(x)
		return [ls, rs]
	}
}

/** search a collection for the first item for which a function returns true */
export function find<T>(f: Unary<T, boolean>) {
	return function(xs: Iterable<T>): Option<T> {
		for (const x of xs)
			if (f(x))
				return x
		return undefined
	}
}

/** given several functions, return the first item for which each function returns true */
export function multifind<T> (
    a: Unary<T, boolean>,
    b: Unary<T, boolean>,
): (xs: Iterable<T>) => [Option<T>, Option<T>];
export function multifind<T> (
    a: Unary<T, boolean>,
    b: Unary<T, boolean>,
    c: Unary<T, boolean>,
): (xs: Iterable<T>) => [Option<T>, Option<T>, Option<T>];
export function multifind<T> (
    a: Unary<T, boolean>,
    b: Unary<T, boolean>,
    c: Unary<T, boolean>,
    d: Unary<T, boolean>,
): (xs: Iterable<T>) => [Option<T>, Option<T>, Option<T>, Option<T>];
export function multifind<T> (
    a: Unary<T, boolean>,
    b: Unary<T, boolean>,
    c: Unary<T, boolean>,
    d: Unary<T, boolean>,
    e: Unary<T, boolean>,
): (xs: Iterable<T>) => [Option<T>, Option<T>, Option<T>, Option<T>, Option<T>];
export function multifind<T>(...fs: Array<Unary<T, boolean>>) {
    return function (xs: Iterable<T>): Array<Option<T>> {
        const res: Array<Option<T>> = fs.map(() => undefined)
        let remaining = res.length
        for (const x of xs) {
            for (let i = 0; i < fs.length; i++) {
                if (res[i] !== undefined)
                    continue;
                const f = fs[i]!
                if (f(x)) {
                    res[i] = x
                    remaining--
                }
            }
            if (remaining === 0)
                return res
        }
        return res
    }
}

/** search a collection for the index of first item for which a function returns true */
export function findIndex<T>(f: Unary<T, boolean>): (x: Iterable<T>) => Option<number> {
	return function(xs) {
		let i = 0
		for (const x of xs)
			if (f(x)) return i
			else i++
		return undefined
	}
}

/** find the optimal value in an iterable (typically minimum or maximum)
 *
 * the definition of optimality is defermined by repeated application of a comparison function.
 *
 * returns undefined on empty iterables
 *
 * - `f` — the comparison function. use `maths/gt` for maximum, and `maths/lt` for minimum
 * - `xs` — the iterable
 */
export function optimum<A>(f: Binary<A, A, boolean>): (xs: Iterable<A>) => Option<A> {
	return function (xs) {
		const it = iter(xs)
		let v = it.next()
		if (v.done) return undefined
		let max = v.value
		v = it.next()
		while (!v.done) {
			if (f(max)(v.value))
				max = v.value
			v = it.next()
		}
		return max
	}
}

/** find the optimal value in an iterable (typically minimum or maximum)
 *
 * the definition of optimality is defermined by repeated application of a comparison function.
 *
 * before comparing, first map the elements of the iterables through a mapping function to get proper values
 *
 * returns undefined on empty iterables
 *
 * - `map` — the function determining how we get values to be compared out of the elements of the iterables
 * - `f` — the comparison function. use `maths/gt` for maximum, and `maths/lt` for minimum
 * - `xs` — the iterable
 */
export function optimumBy<A, B>(map: Unary<A, B>) {
	return function (comp: Binary<B, B, boolean>) {
		return function (xs: Iterable<A>): Option<A> {
			const it = iter(xs)
			let v = it.next()
			if (v.done) return undefined
			let max = v.value
			let maxv = map(v.value)
			v = it.next()
			while (!v.done) {
				const nv = map(v.value)
				if (comp(maxv)(nv)) {
					max = v.value
					maxv = nv
				}
				v = it.next()
			}
			return max
		}
	}
}

/** returns true if any element is truthy */
export function any(xs: Iterable<any>): boolean {
	for (const x of xs)
		if (x)
			return true
	return false
}

/** returns true if every element is truthy */
export function all(xs: Iterable<any>): boolean {
	for (const x of xs)
		if (!x)
			return false
	return true
}

/** flattens an iterable of iterables into a continuous iterable */
export function* flatten<T>(xs: Iterable<Iterable<T>>): Iterable<T> {
    for (const ys of xs)
        yield* ys
}

export function batch(n: number) {
    return function* batch<T>(xs: Iterable<T>): Iterable<Array<T>> {
        let group = []
        for (const x of xs) {
            group.push(x)
            if (group.length === n) {
                yield group
                group = []
            }
        }
        if (group.length)
            yield group
    };
}

export function count<T>(xs: Iterable<T>): Map<T, number> {
    const m = new Map<T, number>()
    for (const x of xs)
        if (m.has(x))
            m.set(x, m.get(x)! + 1)
        else
            m.set(x, 1)
    return m
}

/** generate integers from `start` until `end`, inclusive */
export function* seq(start: number, end: number) {
    for (let i = start; i <= end; i++)
        yield i
}

/** yields all possible combinations of pairs between two iterables, **As** and **Bs** */
// TODO: optimise memory further by using lazy array
export function combinations<A>(as: Iterable<A>) {
    return function* <B>(bs: Iterable<B>): Iterable<[A, B]> {
        const frozen_b = Array.from(bs)
        for (const a of as)
            for (const b of frozen_b)
                yield [a, b]
    }
}

/** composition of two left folds
 *
 * this is primarily useful for computing composite accumulators, such as an average
 *
 * fold a collection of **Xs** into an accumulated value **A** using the binary function **f**: **A** → **X** → **A**
 *
 * fold the same collection into an accumulated value **B** using the binary function **g**: **B** → **X** → **B**
 *
 * combine **A** and **B** into **C** using the binary function **h**: **A** → **B** → **C**
 */
export function double_foldl<A, B, X, C>(
    f: Binary<A, X, A>,
    i: A,
    g: Binary<B, X, B>,
    j: B,
    h: Binary<A, B, C>,
) {
    return function (xs: Iterable<X>): C {
        let a = i
        let b = j
        for (const x of xs) {
            a = f(a)(x)
            b = g(b)(x)
        }
        return h(a)(b)
    }
}

/** skip **n** elements of an iterable */
export const skip = (n: number) => function* <T>(xs: Iterable<T>): Iterable<T> {
    const it = iter(xs)
    {
        let v: IteratorResult<T> | undefined = undefined
        let i = 0
        while (i < n && !v?.done) {
            i++
            v = it.next()
        }
    }

    for (let v = it.next(); !v.done; v = it.next())
        yield v.value
}

/** get the tail of an iterable (all items except for the first) */
export const tail = skip(1);
