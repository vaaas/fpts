import { Unary } from './data'
import { prefix } from './duad'
import { map as imap } from './iter'
import { of as mof, values } from './map'
import { compose } from './function'
import { Option } from './option'

/** return the first element of an array */
export function first<T>(xs: Array<T>): T|undefined {
	return xs[0]
}

/** return the last element of an array */
export function last<T>(xs: Array<T>): T|undefined {
	return xs[xs.length-1]
}

export function middle<T>(xs: Array<T>): T|undefined {
    return xs[xs.length >> 1];
}

export const get = (x: number) => <T>(xs: T[]): Option<T> => xs[x]

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

/** transform every element **A** of an array of **As** into an element **B**
 * using the provided function `f` **A** -> **B**
 *
 * returns an array of **Bs**
 *
 * this transformation happens *in place*, mutating the array
 */
export function map_ip<A, B>(f: Unary<A, B>) {
    return function(xs: Array<A>): Array<B> {
        for (let i = 0; i < xs.length; i++)
            // @ts-expect-error
            xs[i] = f(xs[i]);
        // @ts-expect-error
        return xs;
    }
}

/** filter implentation for arrays */
export function filter<A>(f: Unary<A, boolean>): Unary<Array<A>, Array<A>> {
	return function(xs) {
		return xs.filter(f)
	}
}

/** in-place implementation of filter
 *
 * iterates over an array, passing each element to a predicate function
 *
 * if the function returns false, the item is removed from the array **in place, modifying the original array**
 *
 * - `f` — the predicate function, returning true or false
 * - `xs` — the array to operate on
 */
export function filter_ip<A>(f: Unary<A, boolean>) {
    return function(xs: Array<A>): Array<A> {
        /** index of our current position */
        let i = 0
        /** known good length */
        let j = 0
        const len = xs.length
        while (i < len) {
            const x = xs[i]!
            if (f(x)) {
                xs[j] = x
                j++
            }
            i++
        }
        xs.length = j
        return xs
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

export const iter_slice = (start: number, end: number) => function* <T>(xs: T[]): Iterable<T> {
    const actual_end = Math.min(end, xs.length);
    for (let i = start; i < actual_end; i++)
        yield xs[i]!;
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

export function* reverseI<T>(xs: T[]): Iterable<T> {
    for (let i = xs.length - 1; i >= 0; i--)
        yield xs[i]!;
}

export function* pairs<A, B>(as: A[], bs: B[]): Iterable<[A, B]> {
    for (const a of as)
        for (const b of bs)
            yield [a, b]
}

export const inside = <T>(xs: T[]) => <U>(x: U | T): x is T => xs.includes(x as T)

export const outside = <T>(xs: T[]) => <U>(x: U | T): x is U => !xs.includes(x as T)

export function pick<T extends Array<any> | ReadonlyArray<any>>(xs: T): T[number] {
    return xs[Math.floor(Math.random() * xs.length)]
}
