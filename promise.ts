import type { Unary } from './data.ts'
import type { Result } from './result.ts'

export function next_frame(): Promise<void> {
    return new Promise((yes) => {
        requestAnimationFrame(() => yes())
    })
}

export function next_tick(): Promise<void> {
    return new Promise((yes) => yes())
}

export function sleep(n: number): Promise<void> {
    return new Promise(yes => setTimeout(() => yes(), n))
}

export function map<A, B>(f: Unary<A, B>): (x: Promise<A>) => Promise<B> {
    return function(x) {
        return x.then(f)
    }
}

export function bind<A, B>(f: Unary<A, Promise<B>>): (x: Promise<A>) => Promise<B> {
    return function(x) {
        return x.then(f)
    }
}

export function then<A, B>(f: Unary<A, B>): (x: Promise<A>) => Promise<B>
export function then<A, B>(f: Unary<A, Promise<B>>): (x: Promise<A>) => Promise<B> {
    return function(x) {
        return x.then(f)
    }
}

/** pipe an argument through a number of functions, all of which return promises
 *
 * return the result of the final function as a promise
 */
export function pipe<A, B>(
	x: A,
	a: Unary<A, Promise<B>>,
): Promise<B>
export function pipe<A, B, C>(
	x: A,
	a: Unary<A, Promise<B>>,
	b: Unary<B, Promise<C>>,
): Promise<C>
export function pipe<A, B, C, D>(
	x: A,
	a: Unary<A, Promise<B>>,
	b: Unary<B, Promise<C>>,
	c: Unary<C, Promise<D>>,
): Promise<D>
export function pipe<A, B, C, D, E>(
	x: A,
	a: Unary<A, Promise<B>>,
	b: Unary<B, Promise<C>>,
	c: Unary<C, Promise<D>>,
	d: Unary<D, Promise<E>>,
): Promise<E>
export function pipe<A, B, C, D, E, F>(
	x: A,
	a: Unary<A, Promise<B>>,
	b: Unary<B, Promise<C>>,
	c: Unary<C, Promise<D>>,
	d: Unary<D, Promise<E>>,
	e: Unary<E, Promise<F>>,
): Promise<F>
export function pipe<A, B, C, D, E, F, G>(
	x: A,
	a: Unary<A, Promise<B>>,
	b: Unary<B, Promise<C>>,
	c: Unary<C, Promise<D>>,
	d: Unary<D, Promise<E>>,
	e: Unary<E, Promise<F>>,
	f: Unary<F, Promise<G>>,
): Promise<G>
export function pipe<A, B, C, D, E, F, G, H>(
	x: A,
	a: Unary<A, Promise<B>>,
	b: Unary<B, Promise<C>>,
	c: Unary<C, Promise<D>>,
	d: Unary<D, Promise<E>>,
	e: Unary<E, Promise<F>>,
	f: Unary<F, Promise<G>>,
	g: Unary<G, Promise<H>>,
): Promise<H>
export function pipe<A, B, C, D, E, F, G, H, I>(
	x: A,
	a: Unary<A, Promise<B>>,
	b: Unary<B, Promise<C>>,
	c: Unary<C, Promise<D>>,
	d: Unary<D, Promise<E>>,
	e: Unary<E, Promise<F>>,
	f: Unary<F, Promise<G>>,
	g: Unary<G, Promise<H>>,
	h: Unary<H, Promise<I>>,
): Promise<I>
export function pipe<A, B, C, D, E, F, G, H, I, J>(
	x: A,
	a: Unary<A, Promise<B>>,
	b: Unary<B, Promise<C>>,
	c: Unary<C, Promise<D>>,
	d: Unary<D, Promise<E>>,
	e: Unary<E, Promise<F>>,
	f: Unary<F, Promise<G>>,
	g: Unary<G, Promise<H>>,
	h: Unary<H, Promise<I>>,
	i: Unary<I, Promise<J>>,
): Promise<J>
export function pipe<A, B, C, D, E, F, G, H, I, J, K>(
	x: A,
	a: Unary<A, Promise<B>>,
	b: Unary<B, Promise<C>>,
	c: Unary<C, Promise<D>>,
	d: Unary<D, Promise<E>>,
	e: Unary<E, Promise<F>>,
	f: Unary<F, Promise<G>>,
	g: Unary<G, Promise<H>>,
	h: Unary<H, Promise<I>>,
	i: Unary<I, Promise<J>>,
	j: Unary<J, Promise<K>>,
): Promise<K>
export async function pipe(x: any, ...fs: Array<Unary<any, Promise<any>>>): Promise<any> {
	let a = x
	for (const f of fs)
		a = await f(a)
	return a
}

export async function retry_exponential_backoff<T>(f: () => Promise<T>, initial = 500, multiplier = 2, max_retries = Infinity): Promise<Result<T>> {
    let i = 0
    let t = initial
    while (i <= max_retries) {
        const x = await f().catch(e => e instanceof Error ? e : new Error('something went wrong: ' + e));
        if (x instanceof Error) {
            await sleep(t)
            t *= multiplier
            i++
        } else
            return x
    }
    return new Error('max retries exceeded')
}
