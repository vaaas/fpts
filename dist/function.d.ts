import { Unary } from './data';
/** pipeline functions
 *
 * given an argument **A** and functions **Fs**,
 * apply **A** to the first **F**, then the result of **F(A)**,
 * to the second **F'**, and so on for all functions given
 *
 * returns the result of the final function
 */
export declare function pipe<A, B>(x: A, a: Unary<A, B>): B;
export declare function pipe<A, B, C>(x: A, a: Unary<A, B>, b: Unary<B, C>): C;
export declare function pipe<A, B, C, D>(x: A, a: Unary<A, B>, b: Unary<B, C>, c: Unary<C, D>): D;
export declare function pipe<A, B, C, D, E>(x: A, a: Unary<A, B>, b: Unary<B, C>, c: Unary<C, D>, d: Unary<D, E>): E;
export declare function pipe<A, B, C, D, E, F>(x: A, a: Unary<A, B>, b: Unary<B, C>, c: Unary<C, D>, d: Unary<D, E>, e: Unary<E, F>): F;
export declare function pipe<A, B, C, D, E, F, G>(x: A, a: Unary<A, B>, b: Unary<B, C>, c: Unary<C, D>, d: Unary<D, E>, e: Unary<E, F>, f: Unary<F, G>): G;
export declare function pipe<A, B, C, D, E, F, G, H>(x: A, a: Unary<A, B>, b: Unary<B, C>, c: Unary<C, D>, d: Unary<D, E>, e: Unary<E, F>, f: Unary<F, G>, g: Unary<G, H>): H;
export declare function pipe<A, B, C, D, E, F, G, H, I>(x: A, a: Unary<A, B>, b: Unary<B, C>, c: Unary<C, D>, d: Unary<D, E>, e: Unary<E, F>, f: Unary<F, G>, g: Unary<G, H>, h: Unary<H, I>): I;
export declare function pipe<A, B, C, D, E, F, G, H, I, J>(x: A, a: Unary<A, B>, b: Unary<B, C>, c: Unary<C, D>, d: Unary<D, E>, e: Unary<E, F>, f: Unary<F, G>, g: Unary<G, H>, h: Unary<H, I>, i: Unary<I, J>): J;
export declare function pipe<A, B, C, D, E, F, G, H, I, J, K>(x: A, a: Unary<A, B>, b: Unary<B, C>, c: Unary<C, D>, d: Unary<D, E>, e: Unary<E, F>, f: Unary<F, G>, g: Unary<G, H>, h: Unary<H, I>, i: Unary<I, J>, j: Unary<J, K>): K;
/** compose functions left-to-right
 *
 * given two functions, **f** and **g**, create a new function **h**
 * such that *h(x) = f(g(x))*
 *
 * likewise for three, four, ... functions
 */
export declare function compose<A, B, C>(a: Unary<A, B>, b: Unary<B, C>): Unary<A, C>;
export declare function compose<A, B, C, D>(a: Unary<A, B>, b: Unary<B, C>, c: Unary<C, D>): Unary<A, D>;
export declare function compose<A, B, C, D, E>(a: Unary<A, B>, b: Unary<B, C>, c: Unary<C, D>, d: Unary<D, E>): Unary<A, E>;
export declare function compose<A, B, C, D, E, F>(a: Unary<A, B>, b: Unary<B, C>, c: Unary<C, D>, d: Unary<D, E>, e: Unary<E, F>): Unary<A, F>;
export declare function compose<A, B, C, D, E, F, G>(a: Unary<A, B>, b: Unary<B, C>, c: Unary<C, D>, d: Unary<D, E>, e: Unary<E, F>, f: Unary<F, G>): Unary<A, G>;
export declare function compose<A, B, C, D, E, F, G, H>(a: Unary<A, B>, b: Unary<B, C>, c: Unary<C, D>, d: Unary<D, E>, e: Unary<E, F>, f: Unary<F, G>, g: Unary<G, H>): Unary<A, H>;
export declare function compose<A, B, C, D, E, F, G, H, I>(a: Unary<A, B>, b: Unary<B, C>, c: Unary<C, D>, d: Unary<D, E>, e: Unary<E, F>, f: Unary<F, G>, g: Unary<G, H>, h: Unary<H, I>): Unary<A, I>;
export declare function compose<A, B, C, D, E, F, G, H, I, J>(a: Unary<A, B>, b: Unary<B, C>, c: Unary<C, D>, d: Unary<D, E>, e: Unary<E, F>, f: Unary<F, G>, g: Unary<G, H>, h: Unary<H, I>, i: Unary<I, J>): Unary<A, J>;
export declare function compose<A, B, C, D, E, F, G, H, I, J, K>(a: Unary<A, B>, b: Unary<B, C>, c: Unary<C, D>, d: Unary<D, E>, e: Unary<E, F>, f: Unary<F, G>, g: Unary<G, H>, h: Unary<H, I>, i: Unary<I, J>, j: Unary<J, K>): Unary<A, K>;
/** spy on a function's calls, recording them
 *
 * calls can be accessed through the `.calls` property
 */
export declare function spy(f: Function): Function & {
    calls: any[];
};
/** only allow a function to be executed once. future calls will return `undefined` */
export declare function once<A extends Array<any>, B>(f: (...xs: A) => B): (...xs: A) => B | undefined;
