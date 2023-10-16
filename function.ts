import type { Unary } from './data'

/** pipeline functions
 *
 * given an argument **A** and functions **Fs**,
 * apply **A** to the first **F**, then the result of **F(A)**,
 * to the second **F'**, and so on for all functions given
 *
 * returns the result of the final function
 */
export function pipe<A, B>(
	x: A,
	a: Unary<A, B>,
): B
export function pipe<A, B, C>(
	x: A,
	a: Unary<A, B>,
	b: Unary<B, C>,
): C
export function pipe<A, B, C, D>(
	x: A,
	a: Unary<A, B>,
	b: Unary<B, C>,
	c: Unary<C, D>,
): D
export function pipe<A, B, C, D, E>(
	x: A,
	a: Unary<A, B>,
	b: Unary<B, C>,
	c: Unary<C, D>,
	d: Unary<D, E>,
): E
export function pipe<A, B, C, D, E, F>(
	x: A,
	a: Unary<A, B>,
	b: Unary<B, C>,
	c: Unary<C, D>,
	d: Unary<D, E>,
	e: Unary<E, F>,
): F
export function pipe<A, B, C, D, E, F, G>(
	x: A,
	a: Unary<A, B>,
	b: Unary<B, C>,
	c: Unary<C, D>,
	d: Unary<D, E>,
	e: Unary<E, F>,
	f: Unary<F, G>,
): G
export function pipe<A, B, C, D, E, F, G, H>(
	x: A,
	a: Unary<A, B>,
	b: Unary<B, C>,
	c: Unary<C, D>,
	d: Unary<D, E>,
	e: Unary<E, F>,
	f: Unary<F, G>,
	g: Unary<G, H>,
): H
export function pipe<A, B, C, D, E, F, G, H, I>(
	x: A,
	a: Unary<A, B>,
	b: Unary<B, C>,
	c: Unary<C, D>,
	d: Unary<D, E>,
	e: Unary<E, F>,
	f: Unary<F, G>,
	g: Unary<G, H>,
	h: Unary<H, I>,
): I
export function pipe<A, B, C, D, E, F, G, H, I, J>(
	x: A,
	a: Unary<A, B>,
	b: Unary<B, C>,
	c: Unary<C, D>,
	d: Unary<D, E>,
	e: Unary<E, F>,
	f: Unary<F, G>,
	g: Unary<G, H>,
	h: Unary<H, I>,
	i: Unary<I, J>,
): J
export function pipe<A, B, C, D, E, F, G, H, I, J, K>(
	x: A,
	a: Unary<A, B>,
	b: Unary<B, C>,
	c: Unary<C, D>,
	d: Unary<D, E>,
	e: Unary<E, F>,
	f: Unary<F, G>,
	g: Unary<G, H>,
	h: Unary<H, I>,
	i: Unary<I, J>,
	j: Unary<J, K>,
): K
export function pipe(x: any, ...fs: Array<Unary<any, any>>): any {
	let a = x
	for (const f of fs) a = f(a)
	return a
}

/** compose functions left-to-right
 *
 * given two functions, **f** and **g**, create a new function **h**
 * such that *h(x) = f(g(x))*
 *
 * likewise for three, four, ... functions
 */
export function compose<A, B, C>(
	a: Unary<A, B>,
	b: Unary<B, C>,
): Unary<A, C>
export function compose<A, B, C, D>(
	a: Unary<A, B>,
	b: Unary<B, C>,
	c: Unary<C, D>,
): Unary<A, D>
export function compose<A, B, C, D, E>(
	a: Unary<A, B>,
	b: Unary<B, C>,
	c: Unary<C, D>,
	d: Unary<D, E>,
): Unary<A, E>
export function compose<A, B, C, D, E, F>(
	a: Unary<A, B>,
	b: Unary<B, C>,
	c: Unary<C, D>,
	d: Unary<D, E>,
	e: Unary<E, F>,
): Unary<A, F>
export function compose<A, B, C, D, E, F, G>(
	a: Unary<A, B>,
	b: Unary<B, C>,
	c: Unary<C, D>,
	d: Unary<D, E>,
	e: Unary<E, F>,
	f: Unary<F, G>,
): Unary<A, G>
export function compose<A, B, C, D, E, F, G, H>(
	a: Unary<A, B>,
	b: Unary<B, C>,
	c: Unary<C, D>,
	d: Unary<D, E>,
	e: Unary<E, F>,
	f: Unary<F, G>,
	g: Unary<G, H>,
): Unary<A, H>
export function compose<A, B, C, D, E, F, G, H, I>(
	a: Unary<A, B>,
	b: Unary<B, C>,
	c: Unary<C, D>,
	d: Unary<D, E>,
	e: Unary<E, F>,
	f: Unary<F, G>,
	g: Unary<G, H>,
	h: Unary<H, I>,
): Unary<A, I>
export function compose<A, B, C, D, E, F, G, H, I, J>(
	a: Unary<A, B>,
	b: Unary<B, C>,
	c: Unary<C, D>,
	d: Unary<D, E>,
	e: Unary<E, F>,
	f: Unary<F, G>,
	g: Unary<G, H>,
	h: Unary<H, I>,
	i: Unary<I, J>,
): Unary<A, J>
export function compose<A, B, C, D, E, F, G, H, I, J, K>(
	a: Unary<A, B>,
	b: Unary<B, C>,
	c: Unary<C, D>,
	d: Unary<D, E>,
	e: Unary<E, F>,
	f: Unary<F, G>,
	g: Unary<G, H>,
	h: Unary<H, I>,
	i: Unary<I, J>,
	j: Unary<J, K>,
): Unary<A, K>
export function compose(...fs: Array<Unary<any, any>>): (x: any) => any {
	return function(x) {
		let a = x
		for (const f of fs) a = f(a)
		return a
	}
}

/** spy on a function's calls, recording them
 *
 * calls can be accessed through the `.calls` property
 */
export function spy<A extends any[], B>(f: (...xs: A) => B): ((...xs: A) => B) & { calls: any[] } {
    const calls: any[] = [];
    function wrapped() {
        calls.push([...arguments]);
        return f(...arguments as any as A);
    }
    wrapped.calls = calls;
    return wrapped;
}

/** only allow a function to be executed once. future calls will return `undefined` */
export function once<A extends Array<any>, B>(f: (...xs: A) => B) {
	let called = false
	return function(...xs: A) {
		if (called)
			return undefined
		else {
			called = true
			return f(...xs)
		}
	}
}
