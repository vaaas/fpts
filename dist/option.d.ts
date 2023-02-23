import { Binary, Unary, Nullary } from './data';
/** an optional value is a union of undefined or a value.
 *
 * in other words, it defines the Maybe monad as a union
 */
export type Option<T> = undefined | T;
/** given a transformation **A** → **B**
 * apply it to an optional **A** only if it isn't undefined
 * such that it becomes an optional **B**
 */
export declare function map<A, B>(f: Unary<A, B>): Unary<Option<A>, Option<B>>;
/** given a transformation **A** → **Optional B**
 * apply it to an optional **A** only if it isn't undefined
 * such that it becomes an optional **B**
 */
export declare function bind<A, B>(f: Unary<A, Option<B>>): Unary<Option<A>, Option<B>>;
/** apply an optional value **A** to an *optional* transformation **A** → **B**, producing an optional **B** */
export declare function apply<A>(x: Option<A>): <B>(f: Option<Unary<A, B>>) => Option<B>;
/** apply a transformation **A** → **B** to an optional **A**, returning **B**.
 * if the optional is undefined, instead of applying the function, instead return the default value **d**.
 */
export declare function maybe<A, B>(d: B, f: Unary<A, B>): (x: Option<A>) => B;
/** identical to *maybe*, however the default value is provided as a function instead of a value.
 *
 * because javascript isn't lazily evaluated, this is useful for cases where the default value is expensive to compute.
 */
export declare function maybe_<A, B>(d: Nullary<B>, f: Unary<A, B>): (x: Option<A>) => Option<B>;
/** checks if the optional is an actual value (not undefined) */
export declare function isJust<T>(x: Option<T>): x is T;
/** checks if the optional is undefined */
export declare function isNothing<T>(x: Option<T>): x is undefined;
/** *UNSAFELY* unwraps an optional */
export declare function unwrap<T>(x: Option<T>): T;
/** lift a binary function to operate on optional arguments */
export declare function lift2<A, B, C>(f: Binary<A, B, C>): (a: Option<A>) => (b: Option<B>) => Option<C>;
/** extract from an iterable of options all the actual values as an array
 *
 * if at least one is undefined, return undefined prematurely as an optimisation
 */
export declare function every<T>(xs: Iterable<Option<T>>): Option<Array<T>>;
/** pipe an argument through a number of functions
 *
 * if any of the functions return undefined, exit immediately, returning undefined as an optimisation
 */
export declare function pipe<A, B>(x: A, a: Unary<A, Option<B>>): Option<B>;
export declare function pipe<A, B, C>(x: A, a: Unary<A, Option<B>>, b: Unary<B, Option<C>>): Option<C>;
export declare function pipe<A, B, C, D>(x: A, a: Unary<A, Option<B>>, b: Unary<B, Option<C>>, c: Unary<C, Option<D>>): Option<D>;
export declare function pipe<A, B, C, D, E>(x: A, a: Unary<A, Option<B>>, b: Unary<B, Option<C>>, c: Unary<C, Option<D>>, d: Unary<D, Option<E>>): Option<E>;
export declare function pipe<A, B, C, D, E, F>(x: A, a: Unary<A, Option<B>>, b: Unary<B, Option<C>>, c: Unary<C, Option<D>>, d: Unary<D, Option<E>>, e: Unary<E, Option<F>>): Option<F>;
export declare function pipe<A, B, C, D, E, F, G>(x: A, a: Unary<A, Option<B>>, b: Unary<B, Option<C>>, c: Unary<C, Option<D>>, d: Unary<D, Option<E>>, e: Unary<E, Option<F>>, f: Unary<F, Option<G>>): Option<G>;
export declare function pipe<A, B, C, D, E, F, G, H>(x: A, a: Unary<A, Option<B>>, b: Unary<B, Option<C>>, c: Unary<C, Option<D>>, d: Unary<D, Option<E>>, e: Unary<E, Option<F>>, f: Unary<F, Option<G>>, g: Unary<G, Option<H>>): Option<H>;
export declare function pipe<A, B, C, D, E, F, G, H, I>(x: A, a: Unary<A, Option<B>>, b: Unary<B, Option<C>>, c: Unary<C, Option<D>>, d: Unary<D, Option<E>>, e: Unary<E, Option<F>>, f: Unary<F, Option<G>>, g: Unary<G, Option<H>>, h: Unary<H, Option<I>>): Option<I>;
export declare function pipe<A, B, C, D, E, F, G, H, I, J>(x: A, a: Unary<A, Option<B>>, b: Unary<B, Option<C>>, c: Unary<C, Option<D>>, d: Unary<D, Option<E>>, e: Unary<E, Option<F>>, f: Unary<F, Option<G>>, g: Unary<G, Option<H>>, h: Unary<H, Option<I>>, i: Unary<I, Option<J>>): Option<J>;
export declare function pipe<A, B, C, D, E, F, G, H, I, J, K>(x: A, a: Unary<A, Option<B>>, b: Unary<B, Option<C>>, c: Unary<C, Option<D>>, d: Unary<D, Option<E>>, e: Unary<E, Option<F>>, f: Unary<F, Option<G>>, g: Unary<G, Option<H>>, h: Unary<H, Option<I>>, i: Unary<I, Option<J>>, j: Unary<J, Option<K>>): Option<K>;
