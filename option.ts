import type { Binary, Unary, Nullary } from './data.ts'

/** an optional value is a union of undefined or a value.
 *
 * in other words, it defines the Maybe monad as a union
 */
export type Option<T> = undefined | T

/** given a transformation **A** → **B**
 * apply it to an optional **A** only if it isn't undefined
 * such that it becomes an optional **B**
 */
export function map<A, B>(f: Unary<A, B>): Unary<Option<A>, Option<B>> {
    return function (x) {
        if (x === undefined)
            return undefined
        else
            return f(x)
    }
}

/** given a transformation **A** → **Optional B**
 * apply it to an optional **A** only if it isn't undefined
 * such that it becomes an optional **B**
 */
export function bind<A, B>(f: Unary<A, Option<B>>): Unary<Option<A>, Option<B>> {
    return function(x) {
        if (x === undefined)
            return undefined
        else
            return f(x)
    }
}

/** apply an optional value **A** to an *optional* transformation **A** → **B**, producing an optional **B** */
export function apply<A>(x: Option<A>): <B>(f: Option<Unary<A, B>>) => Option<B> {
    return function (f) {
        if (x === undefined || f === undefined)
            return undefined
        else
            return f(x)
    }
}

/** apply a transformation **A** → **B** to an optional **A**, returning **B**.
 * if the optional is undefined, instead of applying the function, instead return the default value **d**.
 */
export function maybe<A, B>(d: B, f: Unary<A, B>): (x: Option<A>) => B {
    return function (x) {
        if (x === undefined)
            return d
        else
            return f(x)
    }
}

/** identical to *maybe*, however the default value is provided as a function instead of a value.
 *
 * because javascript isn't lazily evaluated, this is useful for cases where the default value is expensive to compute.
 */
export function maybe_<A, B>(d: Nullary<B>, f: Unary<A, B>): (x: Option<A>) => Option<B> {
    return function (x) {
        if (x === undefined)
            return d()
        else
            return f(x)
    }
}

/** checks if the optional is an actual value (not undefined) */
export function isJust<T>(x: Option<T>): x is T {
    return x !== undefined
}

/** checks if the optional is undefined */
export function isNothing<T>(x: Option<T>): x is undefined {
    return x === undefined
}

/** *UNSAFELY* unwraps an optional */
export function unwrap<T>(x: Option<T>): T {
    return x as T
}

/** lift a binary function to operate on optional arguments */
export function lift2<A, B, C>(f: Binary<A, B, C>): (a: Option<A>) => (b: Option<B>) => Option<C> {
    return function (a) {
        return function (b) {
            if (a === undefined || b === undefined)
                return undefined
            else
                return f(a)(b)
        }
    }
}

/** extract from an iterable of options all the actual values as an array
 *
 * if at least one is undefined, return undefined prematurely as an optimisation
 */
 export function every<T>(xs: Iterable<Option<T>>): Option<Array<T>> {
    const ys: T[] = []
    for (const x of xs)
        if (isNothing(x))
            return x
        else
            ys.push(x)
    return ys
}

/** pipe an argument through a number of functions
 *
 * if any of the functions return undefined, exit immediately, returning undefined as an optimisation
 */
export function pipe<A, B>(
	x: A,
	a: Unary<A, Option<B>>,
): Option<B>
export function pipe<A, B, C>(
	x: A,
	a: Unary<A, Option<B>>,
	b: Unary<B, Option<C>>,
): Option<C>
export function pipe<A, B, C, D>(
	x: A,
	a: Unary<A, Option<B>>,
	b: Unary<B, Option<C>>,
	c: Unary<C, Option<D>>,
): Option<D>
export function pipe<A, B, C, D, E>(
	x: A,
	a: Unary<A, Option<B>>,
	b: Unary<B, Option<C>>,
	c: Unary<C, Option<D>>,
	d: Unary<D, Option<E>>,
): Option<E>
export function pipe<A, B, C, D, E, F>(
	x: A,
	a: Unary<A, Option<B>>,
	b: Unary<B, Option<C>>,
	c: Unary<C, Option<D>>,
	d: Unary<D, Option<E>>,
	e: Unary<E, Option<F>>,
): Option<F>
export function pipe<A, B, C, D, E, F, G>(
	x: A,
	a: Unary<A, Option<B>>,
	b: Unary<B, Option<C>>,
	c: Unary<C, Option<D>>,
	d: Unary<D, Option<E>>,
	e: Unary<E, Option<F>>,
	f: Unary<F, Option<G>>,
): Option<G>
export function pipe<A, B, C, D, E, F, G, H>(
	x: A,
	a: Unary<A, Option<B>>,
	b: Unary<B, Option<C>>,
	c: Unary<C, Option<D>>,
	d: Unary<D, Option<E>>,
	e: Unary<E, Option<F>>,
	f: Unary<F, Option<G>>,
	g: Unary<G, Option<H>>,
): Option<H>
export function pipe<A, B, C, D, E, F, G, H, I>(
	x: A,
	a: Unary<A, Option<B>>,
	b: Unary<B, Option<C>>,
	c: Unary<C, Option<D>>,
	d: Unary<D, Option<E>>,
	e: Unary<E, Option<F>>,
	f: Unary<F, Option<G>>,
	g: Unary<G, Option<H>>,
	h: Unary<H, Option<I>>,
): Option<I>
export function pipe<A, B, C, D, E, F, G, H, I, J>(
	x: A,
	a: Unary<A, Option<B>>,
	b: Unary<B, Option<C>>,
	c: Unary<C, Option<D>>,
	d: Unary<D, Option<E>>,
	e: Unary<E, Option<F>>,
	f: Unary<F, Option<G>>,
	g: Unary<G, Option<H>>,
	h: Unary<H, Option<I>>,
	i: Unary<I, Option<J>>,
): Option<J>
export function pipe<A, B, C, D, E, F, G, H, I, J, K>(
	x: A,
	a: Unary<A, Option<B>>,
	b: Unary<B, Option<C>>,
	c: Unary<C, Option<D>>,
	d: Unary<D, Option<E>>,
	e: Unary<E, Option<F>>,
	f: Unary<F, Option<G>>,
	g: Unary<G, Option<H>>,
	h: Unary<H, Option<I>>,
	i: Unary<I, Option<J>>,
	j: Unary<J, Option<K>>,
): Option<K>
export function pipe(x: any, ...fs: Array<Unary<any, Option<any>>>): any {
	let a = x
	for (const f of fs) {
		a = f(a)
		if (a === undefined)
			return a
	}
	return a
}
