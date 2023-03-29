import { Unary, Binary } from './data'

/** the result type is either a value or an error.
 * in other words, it defines the Either monad as a type union.
 */
export type Result<T> = Error | T


/** given a transformation **A** → **B**
 * apply it to a result **A** only if it isn't an error
 * such that it becomes a result of **B**
 */
export function map<A, B>(f: Unary<A, B>): Unary<Result<A>, Result<B>> {
    return function (x) {
        if (x instanceof Error)
            return x
        else
            return f(x)
    }
}

/** given a transformation **A** → **Result B**
 * apply it to a result **A** only if it isn't an error
 * such that it becomes a result of **B**
 */
export function bind<A, B>(f: Unary<A, Result<B>>): Unary<Result<A>, Result<B>> {
    return function(x) {
        if (x instanceof Error)
            return x
        else
            return f(x)
    }
}

/** apply a result of **A** to a *result* transformation **A** → **B**, producing a result of **B** */
export function apply<A>(x: Result<A>): <B>(f: Result<Unary<A, B>>) => Result<B> {
    return function (f) {
        if (x instanceof Error)
            return x
        else if (f instanceof Error)
            return f
        else
            return f(x)
    }
}

/** apply a transformation **A** → **B** to a result **A**, returning **B**.
 * if the result is an error, instead pass it through the error handler, also returning **B**.
 */
export function fold<A, B>(handler: Unary<Error, B>, f: Unary<A, B>) {
    return function (x: Result<A>): B {
        if (x instanceof Error)
            return handler(x)
        else
            return f(x)
    }
}

export function handle<A>(f: Unary<Error, A>) {
    return function (x: Result<A>): A {
        if (x instanceof Error)
            return f(x)
        else
            return x
    }
}

/** checks if the result is an error */
export function isError<T>(x: Result<T>): x is Error {
    return x instanceof Error
}

/** checks if the result is an actual value (not an error) */
export function isNothing<T>(x: Result<T>): x is T {
    return !(x instanceof Error)
}

/** *UNSAFELY* unwraps a result */
export function unwrap<T>(x: Result<T>): T {
    return x as T
}

/** lift a binary function to operate on results */
export function lift2<A, B, C>(f: Binary<A, B, C>): (a: Result<A>) => (b: Result<B>) => Result<C> {
    return function (a) {
        return function (b) {
            if (a instanceof Error)
                return a
            if (b instanceof Error)
                return b
            else
                return f(a)(b)
        }
    }
}

/** extract from an iterable of results all the correct results as an array
 *
 * if at least one is an error, return that error and abort execution prematurely as an optimisation
 */
export function every<T>(xs: Iterable<Result<T>>): Array<T> | Error {
    const ys: T[] = []
    for (const x of xs)
        if (x instanceof Error)
            return x
        else
            ys.push(x)
    return ys
}

/** pipe an argument through a number of functions
 *
 * if any of the functions return an error, exit immediately, returning the first error as an optimisation
 */
export function pipe<A, B>(
	x: A,
	a: Unary<A, Result<B>>,
): Result<B>
export function pipe<A, B, C>(
	x: A,
	a: Unary<A, Result<B>>,
	b: Unary<B, Result<C>>,
): Result<C>
export function pipe<A, B, C, D>(
	x: A,
	a: Unary<A, Result<B>>,
	b: Unary<B, Result<C>>,
	c: Unary<C, Result<D>>,
): Result<D>
export function pipe<A, B, C, D, E>(
	x: A,
	a: Unary<A, Result<B>>,
	b: Unary<B, Result<C>>,
	c: Unary<C, Result<D>>,
	d: Unary<D, Result<E>>,
): Result<E>
export function pipe<A, B, C, D, E, F>(
	x: A,
	a: Unary<A, Result<B>>,
	b: Unary<B, Result<C>>,
	c: Unary<C, Result<D>>,
	d: Unary<D, Result<E>>,
	e: Unary<E, Result<F>>,
): Result<F>
export function pipe<A, B, C, D, E, F, G>(
	x: A,
	a: Unary<A, Result<B>>,
	b: Unary<B, Result<C>>,
	c: Unary<C, Result<D>>,
	d: Unary<D, Result<E>>,
	e: Unary<E, Result<F>>,
	f: Unary<F, Result<G>>,
): Result<G>
export function pipe<A, B, C, D, E, F, G, H>(
	x: A,
	a: Unary<A, Result<B>>,
	b: Unary<B, Result<C>>,
	c: Unary<C, Result<D>>,
	d: Unary<D, Result<E>>,
	e: Unary<E, Result<F>>,
	f: Unary<F, Result<G>>,
	g: Unary<G, Result<H>>,
): Result<H>
export function pipe<A, B, C, D, E, F, G, H, I>(
	x: A,
	a: Unary<A, Result<B>>,
	b: Unary<B, Result<C>>,
	c: Unary<C, Result<D>>,
	d: Unary<D, Result<E>>,
	e: Unary<E, Result<F>>,
	f: Unary<F, Result<G>>,
	g: Unary<G, Result<H>>,
	h: Unary<H, Result<I>>,
): Result<I>
export function pipe<A, B, C, D, E, F, G, H, I, J>(
	x: A,
	a: Unary<A, Result<B>>,
	b: Unary<B, Result<C>>,
	c: Unary<C, Result<D>>,
	d: Unary<D, Result<E>>,
	e: Unary<E, Result<F>>,
	f: Unary<F, Result<G>>,
	g: Unary<G, Result<H>>,
	h: Unary<H, Result<I>>,
	i: Unary<I, Result<J>>,
): Result<J>
export function pipe<A, B, C, D, E, F, G, H, I, J, K>(
	x: A,
	a: Unary<A, Result<B>>,
	b: Unary<B, Result<C>>,
	c: Unary<C, Result<D>>,
	d: Unary<D, Result<E>>,
	e: Unary<E, Result<F>>,
	f: Unary<F, Result<G>>,
	g: Unary<G, Result<H>>,
	h: Unary<H, Result<I>>,
	i: Unary<I, Result<J>>,
	j: Unary<J, Result<K>>,
): Result<K>
export function pipe(x: any, ...fs: Array<Unary<any, Result<any>>>): any {
	let a = x
	for (const f of fs) {
		a = f(a)
		if (a instanceof Error)
			return a
	}
	return a
}
