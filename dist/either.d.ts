import { Unary, Binary, NoValue } from './data';
/** represents the left type */
type Left<X> = [X, typeof NoValue];
/** represents the right type */
type Right<X> = [typeof NoValue, X];
/** represents a value that can have one of two distinct types, left or right */
type Either<A, B> = Left<A> | Right<B>;
/** construct a left type */
export declare const left: <X>(x: X) => Left<X>;
/** constructs a right type */
export declare const right: <X>(x: X) => Right<X>;
/** returns `true` if a value is left */
export declare const isLeft: <A, B>(x: Either<A, B>) => x is Left<A>;
/** returns `true` if a value is right */
export declare const isRight: <A, B>(x: Either<A, B>) => x is Right<B>;
/** folds both cases of an either into a single value
 *
 * requires two mappings, one for the left, and one for the right
 */
export declare const either: <A, C>(l: Unary<A, C>) => <B>(r: Unary<B, C>) => (x: Either<A, B>) => C;
/** extracts all the lefts from an iterable */
export declare function lefts<A, B>(xs: Iterable<Either<A, B>>): Iterable<A>;
/** extracts all the rights from an iterable */
export declare function rights<A, B>(xs: Iterable<Either<A, B>>): Iterable<B>;
/** unwraps a left value from an either. if the either is a right, use the default value */
export declare const fromLeft: <A>(d: A) => <B>(x: Either<A, B>) => A;
/** unwraps a right value from an either. if the either is a left, use the default value */
export declare const fromRight: <B>(d: B) => <A>(x: Either<A, B>) => B;
/** splits a sequence of eithers into an array of lefts and an array of rights in one step */
export declare function partition<A, B>(xs: Iterable<Either<A, B>>): [A[], B[]];
/** transforms the right value of an either, leaving the left one intact */
export declare const map: <B, C>(f: Unary<B, C>) => <A>(x: Either<A, B>) => Either<A, C>;
/** transforms the right value of an either, leaving the left one intact
 *
 * transformation function returns another either, and is flattened
 */
export declare const bind: <A, B, C>(f: Unary<B, Either<A, C>>) => (x: Either<A, B>) => Either<A, C>;
/** lifts a binary function to accept two eithers */
export declare const lift2: <A, B, C>(f: Binary<A, B, C>) => <D>(a: Either<D, A>) => (b: Either<D, B>) => Either<D, C>;
/** lifts a binary function to accept two eithers
 *
 * the function returns another either, and is flattened
 */
export declare const liftM2: <A, B, C, D>(f: Binary<A, B, Either<D, C>>) => (a: Either<D, A>) => (b: Either<D, B>) => Either<D, C>;
/** flattens a nested either into a single layer */
export declare const flatten: <A, B>(x: Either<A, Either<A, B>>) => Either<A, B>;
export {};
