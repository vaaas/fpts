import { Unary } from './data';
export declare function next_frame(): Promise<void>;
export declare function next_tick(): Promise<void>;
export declare function sleep(n: number): Promise<void>;
export declare function map<A, B>(f: Unary<A, B>): (x: Promise<A>) => Promise<B>;
export declare function bind<A, B>(f: Unary<A, Promise<B>>): (x: Promise<A>) => Promise<B>;
export declare function then<A, B>(f: Unary<A, B>): (x: Promise<A>) => Promise<B>;
/** pipe an argument through a number of functions, all of which return promises
 *
 * return the result of the final function as a promise
 */
export declare function pipe<A, B>(x: A, a: Unary<A, Promise<B>>): Promise<B>;
export declare function pipe<A, B, C>(x: A, a: Unary<A, Promise<B>>, b: Unary<B, Promise<C>>): Promise<C>;
export declare function pipe<A, B, C, D>(x: A, a: Unary<A, Promise<B>>, b: Unary<B, Promise<C>>, c: Unary<C, Promise<D>>): Promise<D>;
export declare function pipe<A, B, C, D, E>(x: A, a: Unary<A, Promise<B>>, b: Unary<B, Promise<C>>, c: Unary<C, Promise<D>>, d: Unary<D, Promise<E>>): Promise<E>;
export declare function pipe<A, B, C, D, E, F>(x: A, a: Unary<A, Promise<B>>, b: Unary<B, Promise<C>>, c: Unary<C, Promise<D>>, d: Unary<D, Promise<E>>, e: Unary<E, Promise<F>>): Promise<F>;
export declare function pipe<A, B, C, D, E, F, G>(x: A, a: Unary<A, Promise<B>>, b: Unary<B, Promise<C>>, c: Unary<C, Promise<D>>, d: Unary<D, Promise<E>>, e: Unary<E, Promise<F>>, f: Unary<F, Promise<G>>): Promise<G>;
export declare function pipe<A, B, C, D, E, F, G, H>(x: A, a: Unary<A, Promise<B>>, b: Unary<B, Promise<C>>, c: Unary<C, Promise<D>>, d: Unary<D, Promise<E>>, e: Unary<E, Promise<F>>, f: Unary<F, Promise<G>>, g: Unary<G, Promise<H>>): Promise<H>;
export declare function pipe<A, B, C, D, E, F, G, H, I>(x: A, a: Unary<A, Promise<B>>, b: Unary<B, Promise<C>>, c: Unary<C, Promise<D>>, d: Unary<D, Promise<E>>, e: Unary<E, Promise<F>>, f: Unary<F, Promise<G>>, g: Unary<G, Promise<H>>, h: Unary<H, Promise<I>>): Promise<I>;
export declare function pipe<A, B, C, D, E, F, G, H, I, J>(x: A, a: Unary<A, Promise<B>>, b: Unary<B, Promise<C>>, c: Unary<C, Promise<D>>, d: Unary<D, Promise<E>>, e: Unary<E, Promise<F>>, f: Unary<F, Promise<G>>, g: Unary<G, Promise<H>>, h: Unary<H, Promise<I>>, i: Unary<I, Promise<J>>): Promise<J>;
export declare function pipe<A, B, C, D, E, F, G, H, I, J, K>(x: A, a: Unary<A, Promise<B>>, b: Unary<B, Promise<C>>, c: Unary<C, Promise<D>>, d: Unary<D, Promise<E>>, e: Unary<E, Promise<F>>, f: Unary<F, Promise<G>>, g: Unary<G, Promise<H>>, h: Unary<H, Promise<I>>, i: Unary<I, Promise<J>>, j: Unary<J, Promise<K>>): Promise<K>;
