import { Unary, Binary, Ternary } from './data';
export type Entries<T> = Array<{
    [K in keyof T]: [K, T[K]];
}[keyof T]>;
/** return the entries of an object */
export declare function entries<T extends Record<string, any>>(o: T): Entries<T>;
/** generate an object from its entries */
export declare function fromEntries<T extends Record<any, any>>(xs: Entries<T>): T;
/** return an array of an object's values */
export declare function values<T extends object>(xs: T): Array<T[keyof T]>;
/** map implementation for objects
 *
 * given a mapping function **A** → **B** and an object of **As**,
 * return a new object of **Bs**
 */
export declare function map<A, B>(f: Unary<A, B>): <K extends string>(xs: Record<K, A>) => Record<K, B>;
export declare function map2<K1 extends string, K2 extends string>(f: Unary<K1, K2>): <V1, V2>(g: Unary<V1, V2>) => (xs: Record<K1, V1>) => Record<K2, V2>;
export declare function mapKeys<A extends string, B extends string>(f: Unary<A, B>): <V>(xs: Record<A, V>) => Record<B, V>;
export declare function eachWithKeys<K extends string, V>(f: Binary<K, V, any>): (xs: Record<K, V>) => void;
/** filter implementation for objects
 *
 * given a testing function **A** → *boolean* and an object of **As**
 * return a new object of only the **As** for which the testing function
 * returns *true*
 */
export declare function filter<A, K extends string>(f: Unary<A, boolean>): (x: Record<K, A>) => Partial<Record<K, A>>;
/** filter implentation for objects, based on keys as well as values
 *
 * given a testing function **[K, A]** → *boolean* and an object of **As** with keys **Ks**
 * return a new object of only the **As** for which the testing function
 * returns *true*
 *
 * since the keys are also passed, it is possible to filter based on keys
 */
export declare function filterWithKeys<A, K extends string>(f: Binary<K, A, boolean>): (x: Record<K, A>) => Partial<Record<K, A>>;
/** left fold for objects
 *
 * successively apply a binary function **A** → **B** → **A**
 * to a collection of **Bs**, accumulating the result into **A**
 *
 * finally, return the accumulated value
 *
 * the initial value is given by **i**
 */
export declare function foldl<A, B, K extends string>(f: Binary<B, A, B>, i: B): (xs: Record<K, A>) => B;
export declare function foldlWithKeys<A, B, K extends string>(f: Ternary<B, K, A, B>, i: B): (xs: Record<K, A>) => B;
/** right fold for objects
 *
 * successively apply a binary function **B** → **A** → **A**
 * to a collection of **Bs**, accumulating the result into **A**
 *
 * finally, return the accumulated value
 *
 * the initial value is given by **i**
 */
export declare function foldr<A, B, K extends string>(f: Binary<A, B, B>, i: B): (xs: Record<K, A>) => B;
export declare function foldrWithKeys<A, B, K extends string>(f: Ternary<K, A, B, B>, i: B): (xs: Record<K, A>) => B;
/**
 * Set defaults on an object IN PLACE
 * returns the mutated object
 */
export declare function defaults<T extends object>(x: Partial<T>): (d: T) => T;
export declare function update_with<A extends object>(source: A): <B extends A>(dest: B) => B;
export declare function into<R extends Record<string | number | symbol, any>>(o: R): <K extends keyof R>(k: K) => (x: R[K]) => typeof o;
/** filter out keys of an object whose values are undefined */
export declare function defined<T extends Record<any, any>>(x: T): Partial<T>;
export declare function get<R extends Record<string | symbol, any>, K extends keyof R>(k: K): (x: R) => R[K];
/** merge two objects into one object */
export declare function merge<T extends Record<string, any>>(a: Partial<T>): (b: T) => T;
/** returns the number of entries any record has */
export declare function len(x: Record<any, any>): number;
export declare function ofK<K extends string, V>(f: Unary<K, V>): (xs: Iterable<K>) => Record<K, V>;
export declare function ofV<K extends string, V>(f: Unary<V, K>): (xs: Iterable<V>) => Record<K, V>;
export declare function ofKV<T, K extends string>(f: Unary<T, K>): <V>(g: Unary<T, V>) => (xs: Iterable<T>) => Record<K, V>;
export declare const assoc: <K extends string>(k: K) => <V>(v: V) => <O extends Record<any, any>>(o: O) => O & Record<K, V>;
