import { Unary } from './data';
export declare const of: <T>(x: Iterable<T>) => Set<T>;
export declare const inside: <T>(xs: Set<T>) => <U>(x: T | U) => x is T;
export declare const outside: <T>(xs: Set<T>) => <U>(x: T | U) => x is U;
export declare const map: <A, B>(f: Unary<A, B>) => (xs: Set<A>) => Set<B>;
/** create a new set that contains all the elements of `bs` minus the elements of `as`
 *
 * IOW, calculate a set difference between `bs` and `as`
 */
export declare const diff: <T>(as: Set<T>) => (bs: Set<T>) => Set<T>;
export declare const filter: <T>(f: Unary<T, boolean>) => (xs: Set<T>) => Set<T>;
/** returns whether set A and set B have the same contents */
export declare const same: <T>(a: Set<T>) => (b: Set<T>) => boolean;
export declare const superset: <A>(superset: Set<A>) => (subset: Set<A>) => boolean;
export declare const subset: <A>(b: Set<A>) => (c: Set<A>) => boolean;
export declare const intersect: <A>(a: Set<A>) => <B>(b: Set<B>) => Set<A & B>;
