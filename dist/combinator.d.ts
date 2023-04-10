import { Unary, Binary } from './data';
/** Bluebird Combinator
 *
 * Pass an argument C to a unary function B. Before returning the result, pass it through a final filter, A.
 */
export declare function B<B, C>(a: Unary<B, C>): <A>(b: Unary<A, B>) => (c: A) => C;
/** Blackbird Combinator
 *
 * Pass two arguments, C and D, to a binary function B. Before returning the result, pass it through a final filter, A.
 */
export declare function B1<C, D>(a: Unary<C, D>): <A, B>(b: Binary<A, B, C>) => (c: A) => (d: B) => D;
/** Cardinal combinator
 *
 * Pass arguments B and C to a binary function A, in reverse (flipped).
 */
export declare function C<A, B, C>(a: Binary<A, B, C>): (b: B) => (c: A) => C;
/** Dovekies combinator
 *
 * Pass arguments D and E to a binary function A.
 * However, before passing them, filter D through the unary function B
 * and E through the unary function C.
 */
export declare function D<A, B, C, D, E>(a: Binary<A, B, C>): (b: Unary<D, A>) => (c: Unary<E, B>) => (d: D) => (e: E) => C;
/** Dove combinator
 *
 * pass arguments *C* and *D* to a binary function *A*,
 * but first filter *D* through through the function *B*
 *
 * in other words, applies the filter on only the second argument
 */
export declare const D1: <A, B, C>(a: Binary<A, B, C>) => <D>(b: Unary<D, B>) => (c: A) => (d: D) => C;
/** inverse Dove combinator
 *
 * like Dove, but applies a filter only on the first argument
 */
export declare const D2: <A, B, C>(a: Binary<A, B, C>) => <D>(b: Unary<D, A>) => (d: D) => (c: B) => C;
/** Lifting combinator.
 *
 * Transform a binary function from A to B so that it is a binary function of C to B.
 */
export declare const L: <A, B>(a: Binary<A, A, B>) => <C>(b: Unary<C, A>) => (c: C) => (d: C) => B;
/** Identity combinator.
 *
 * Simply returns its argument.
 */
export declare function I<T>(x: T): T;
/** Kestrel combinator (true/car).
 *
 * Always returns the first argument.
 */
export declare function K<T>(a: T): (b?: any[]) => T;
/** Kite combinator (false/cdr).
 *
 * Always returns the second argument.
 */
export declare function KI<T>(a?: any): (y: T) => T;
/** Thrush combinator.
 *
 * Accepts an argument for a unary function, then the function.
 */
export declare function T<A, B>(x: A): (f: Unary<A, B>) => B;
/** Starling prime combinator, AKA phoenix combinator.
 *
 * Apply argument D to a binary function A twice.
 * The first application is filtered through the unary function B.
 * The second application is filtered through the unary function C.
 *
 * In other words, applies the same argument twice, but through different filters.
 */
export declare function S<A, B, C, D>(a: Binary<A, B, C>): (b: Unary<D, A>) => (c: Unary<D, B>) => (d: D) => C;
/** Vireo combinator AKA cons, pair.
 *
 * Accept two arguments for a binary function, then the binary function.
 */
export declare function V<A, B, C>(a: A): (b: B) => (c: Binary<A, B, C>) => C;
/** Warbler combinator AKA elementary duplicator
 *
 * Apply argument B to binary function A twice.
 */
export declare function W<A, B>(a: Binary<A, A, B>): (b: A) => B;
/** Uncurried implementation of Warbler, AKA elementary duplicator
 *
 * Apply argument B to binary function A twice.
 */
export declare function Wu<A, B, C>(a: (a: A, b: B) => C): (b: A & B) => C;
/** spread combinator */
export declare function spread<A extends Array<any>, B>(f: (...xs: A) => B): (xs: A) => B;
