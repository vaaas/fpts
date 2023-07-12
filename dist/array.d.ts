import { Unary } from './data';
/** return the first element of an array */
export declare function first<T>(xs: Array<T>): T | undefined;
/** return the last element of an array */
export declare function last<T>(xs: Array<T>): T | undefined;
export declare function middle<T>(xs: Array<T>): T | undefined;
/** creates a new array from an iterable */
export declare function of<T>(xs: Iterable<T>): Array<T>;
/** map implementation for arrays */
export declare function map<A, B>(f: Unary<A, B>): Unary<Array<A>, Array<B>>;
/** transform every element **A** of an array of **As** into an element **B**
 * using the provided function `f` **A** -> **B**
 *
 * returns an array of **Bs**
 *
 * this transformation happens *in place*, mutating the array
 */
export declare function map_ip<A, B>(f: Unary<A, B>): (xs: Array<A>) => Array<B>;
/** filter implentation for arrays */
export declare function filter<A>(f: Unary<A, boolean>): Unary<Array<A>, Array<A>>;
/** in-place implementation of filter
 *
 * iterates over an array, passing each element to a predicate function
 *
 * if the function returns false, the item is removed from the array **in place, modifying the original array**
 *
 * - `f` — the predicate function, returning true or false
 * - `xs` — the array to operate on
 */
export declare function filter_ip<A>(f: Unary<A, boolean>): (xs: Array<A>) => Array<A>;
/** bind / flatMap implentation for arrays */
export declare function bind<A, B>(f: Unary<A, Array<B>>): Unary<Array<A>, Array<B>>;
/** return iterable without any duplicates */
export declare function unique<T>(xs: Iterable<T>): Array<T>;
/** return iterable without any duplicates
 *
 * the key by which an iterable is defined as a duplicate is provided by the function `f`
 */
export declare function uniqueBy<A, B>(f: Unary<A, B>): (xs: Iterable<A>) => Array<A>;
/** return every element of an array except the first */
export declare function tail<T>(xs: T[]): T[];
/** return every element of an array excepd the last */
export declare function head<T>(xs: T[]): T[];
export declare const iter_slice: (start: number, end: number) => <T>(xs: T[]) => Iterable<T>;
/** join all elements of an array into a string, separated by a delimitter */
export declare function joinWith(s: string): (xs: Array<string>) => string;
export declare function dup<T>(x: T): [T, T];
export declare function reverseI<T>(xs: T[]): Iterable<T>;
export declare function pairs<A, B>(as: A[], bs: B[]): Iterable<[A, B]>;
export declare const inside: <T>(xs: T[]) => <U>(x: T | U) => x is T;
export declare const outside: <T>(xs: T[]) => <U>(x: T | U) => x is U;
export declare function pick<T extends Array<any> | ReadonlyArray<any>>(xs: T): T[number];
