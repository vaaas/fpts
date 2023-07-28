import { Unary, Binary } from './data';
/** the result type is either a value or an error.
 * in other words, it defines the Either monad as a type union.
 */
export type Result<T> = Error | T;
export type Right<T> = Exclude<T, Error>;
/** given a transformation **A** → **B**
 * apply it to a result **A** only if it isn't an error
 * such that it becomes a result of **B**
 */
export declare function map<A, B>(f: Unary<A, B>): Unary<Result<A>, Result<B>>;
/** given a transformation **A** → **Result B**
 * apply it to a result **A** only if it isn't an error
 * such that it becomes a result of **B**
 */
export declare function bind<A, B>(f: Unary<A, Result<B>>): Unary<Result<A>, Result<B>>;
/** apply a result of **A** to a *result* transformation **A** → **B**, producing a result of **B** */
export declare function apply<A>(x: Result<A>): <B>(f: Result<Unary<A, B>>) => Result<B>;
/** apply a transformation **A** → **B** to a result **A**, returning **B**.
 * if the result is an error, instead pass it through the error handler, also returning **B**.
 */
export declare function fold<A, B>(handler: Unary<Error, B>, f: Unary<A, B>): (x: Result<A>) => B;
export declare function handle<A>(f: Unary<Error, A>): (x: Result<A>) => A;
/** checks if the result is an error */
export declare function isError<T>(x: Result<T>): x is Error;
/** checks if the result is an actual value (not an error) */
export declare function isNothing<T>(x: Result<T>): x is T;
/** *UNSAFELY* unwraps a result */
export declare function unwrap<T>(x: Result<T>): T;
/** lift a binary function to operate on results */
export declare function lift2<A, B, C>(f: Binary<A, B, C>): (a: Result<A>) => (b: Result<B>) => Result<C>;
/** extract from an iterable of results all the correct results as an array
 *
 * if at least one is an error, return that error and abort execution prematurely as an optimisation
 */
export declare function every<T>(xs: Iterable<Result<T>>): Array<T> | Error;
/** pipe an argument through a number of functions
 *
 * if any of the functions return an error, exit immediately, returning the first error as an optimisation
 */
export declare function pipe<A, B>(x: A, a: Unary<A, Result<B>>): Result<B>;
export declare function pipe<A, B, C>(x: A, a: Unary<A, Result<B>>, b: Unary<B, Result<C>>): Result<C>;
export declare function pipe<A, B, C, D>(x: A, a: Unary<A, Result<B>>, b: Unary<B, Result<C>>, c: Unary<C, Result<D>>): Result<D>;
export declare function pipe<A, B, C, D, E>(x: A, a: Unary<A, Result<B>>, b: Unary<B, Result<C>>, c: Unary<C, Result<D>>, d: Unary<D, Result<E>>): Result<E>;
export declare function pipe<A, B, C, D, E, F>(x: A, a: Unary<A, Result<B>>, b: Unary<B, Result<C>>, c: Unary<C, Result<D>>, d: Unary<D, Result<E>>, e: Unary<E, Result<F>>): Result<F>;
export declare function pipe<A, B, C, D, E, F, G>(x: A, a: Unary<A, Result<B>>, b: Unary<B, Result<C>>, c: Unary<C, Result<D>>, d: Unary<D, Result<E>>, e: Unary<E, Result<F>>, f: Unary<F, Result<G>>): Result<G>;
export declare function pipe<A, B, C, D, E, F, G, H>(x: A, a: Unary<A, Result<B>>, b: Unary<B, Result<C>>, c: Unary<C, Result<D>>, d: Unary<D, Result<E>>, e: Unary<E, Result<F>>, f: Unary<F, Result<G>>, g: Unary<G, Result<H>>): Result<H>;
export declare function pipe<A, B, C, D, E, F, G, H, I>(x: A, a: Unary<A, Result<B>>, b: Unary<B, Result<C>>, c: Unary<C, Result<D>>, d: Unary<D, Result<E>>, e: Unary<E, Result<F>>, f: Unary<F, Result<G>>, g: Unary<G, Result<H>>, h: Unary<H, Result<I>>): Result<I>;
export declare function pipe<A, B, C, D, E, F, G, H, I, J>(x: A, a: Unary<A, Result<B>>, b: Unary<B, Result<C>>, c: Unary<C, Result<D>>, d: Unary<D, Result<E>>, e: Unary<E, Result<F>>, f: Unary<F, Result<G>>, g: Unary<G, Result<H>>, h: Unary<H, Result<I>>, i: Unary<I, Result<J>>): Result<J>;
export declare function pipe<A, B, C, D, E, F, G, H, I, J, K>(x: A, a: Unary<A, Result<B>>, b: Unary<B, Result<C>>, c: Unary<C, Result<D>>, d: Unary<D, Result<E>>, e: Unary<E, Result<F>>, f: Unary<F, Result<G>>, g: Unary<G, Result<H>>, h: Unary<H, Result<I>>, i: Unary<I, Result<J>>, j: Unary<J, Result<K>>): Result<K>;
export declare function compose<A, B, C>(a: Unary<A, Result<B>>, b: Unary<B, Result<C>>): Unary<A, Result<C>>;
