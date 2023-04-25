import { Unary, UnaryP, Binary } from './data';
import { Option } from './option';
export declare const StopIteration: unique symbol;
/** get the iterator of any iterable
 * like python's iter
 */
export declare function iter<T>(x: Iterable<T>): Iterator<T, any, undefined>;
export declare function next<T>(x: Iterator<T, any, any>): T | typeof StopIteration;
/** test if **X** is iterable */
export declare function is(x: any): x is Iterable<any>;
/** map implementation for iterables
 *
 * given a mapping function **A** → **B**
 * turn a collection of **As** into a collection of **Bs**
 */
export declare function map<A, B>(f: Unary<A, B>): (xs: Iterable<A>) => Iterable<B>;
/** bind implementation for iterables
 *
 * given a mapping function **A** → **Bs**
 * turn a collection af **As** into a collection of **Bs**
 *
 * in other words, it maps and then flattens the iterable
 */
export declare function bind<A, B>(f: Unary<A, Iterable<B>>): (xs: Iterable<A>) => Iterable<B>;
/** filter implementation for iterables
 *
 * given a testing function **A** → *boolean* and a collection of **As**
 * generate a new collection of **As** that only contains the elements
 * for which the testing function returns *true*
 */
export declare function filter<A, B extends A>(f: UnaryP<A, B> | Unary<A, boolean>): (xs: Iterable<A>) => Iterable<B>;
/** left fold for iterables
 *
 * successively apply a binary function **A** → **B** → **A**
 * to a collection of **Bs**, accumulating the result into **A**
 *
 * finally, return the accumulated value
 *
 * the initial value is given by **i**
 */
export declare function foldl<A, B>(f: Binary<A, B, A>, i: A): (xs: Iterable<B>) => A;
/** right fold for iterables
 *
 * successively apply a binary function **B** → **A** → **A**
 * to a collection of **Bs**, accumulating the result into **A**
 *
 * finally, return the accumulated value
 *
 * the initial value is given by **i**
 */
export declare function foldr<A, B>(f: Binary<B, A, A>, i: A): (xs: Iterable<B>) => A;
/** left fold for iterables without initial value
 *
 * successively apply a binary function **A** → **B** → **A**
 * to a collection of **Bs**, accumulating the result into **A**
 *
 * finally, return the accumulated value
 *
 * the initial value is the first element of the collection
 *
 * **i** represents the default value returned in case of an empty iterable
 */
export declare function foldl1<A>(f: Binary<A, A, A>, i: A): (xs: Iterable<A>) => A;
/** right fold for iterables without initial value
 *
 * successively apply a binary function **B** → **A** → **A**
 * to a collection of **Bs**, accumulating the result into **A**
 *
 * finally, return the accumulated value
 *
 * the initial value is the first element of the collection
 *
 * **i** represents the default value returned in case of an empty iterable
 */
export declare function foldr1<A>(f: Binary<A, A, A>, i: A): (xs: Iterable<A>) => A;
/** left scan for iterables with intermediate results
 *
 * successively apply a binary function **A** → **B** → **A**
 * to a collection of **Bs**, accumulating the result into **A**
 *
 * yields each step **A** as an iterable of accumulated values.
 * the last element is identical to *foldl*.
 *
 * the initial value is given by **i**
 */
export declare function scanl<A, B>(f: Binary<A, B, A>, i: A): (xs: Iterable<B>) => Iterable<A>;
/** right scan for iterables with intermediate results
 *
 * successively apply a binary function **B** → **A** → **A**
 * to a collection of **Bs**, accumulating the result into **A**
 *
 * yields each step **A** as an iterable of accumulated values.
 * the last element is identical to *foldr*.
 *
 * the initial value is given by **i**
 */
export declare function scanr<A, B>(f: Binary<B, A, A>, i: A): (xs: Iterable<B>) => Iterable<A>;
/** sort an iterable into an array
 *
 * the sorting function (**prev**, **next**) → *number*
 * should return negative if *prev* should be before *next*,
 * positive if *prev* should be after *next*
 * and zero if there should be no change
 */
export declare function sort<T>(f: (a: T, b: T) => number): (xs: Iterable<T>) => Array<T>;
/** sort an iterable alphabetically, which is the default sort in Javascript */
export declare function alphabetically<T>(x: Iterable<T>): Array<T>;
/** calculate the sum of an iterable */
export declare const sum: (xs: Iterable<number>) => number;
/** calculate the sum of an iterable
 *
 * the number used for summation is provided by the function **f**.
 * for example, it could extract the property of an object
 */
export declare const sumBy: <T>(f: Unary<T, number>) => (xs: Iterable<T>) => number;
/** sort an iterable *by* some property, similar to python's key function */
export declare function by<A>(f: Unary<A, number | string>): (a: A, b: A) => -1 | 0 | 1;
/** get the first element of an iterable */
export declare function first<T>(xs: Iterable<T>): T | undefined;
/** get the last element of an iterable
 *
 * note that this requires walking through the entire iterable
 */
export declare function last<T>(xs: Iterable<T>): T | undefined;
/** join an iterable of strings into a single string */
export declare const join: (xs: Iterable<string>) => string;
/** join an iterable of strings into a single string
 * separated by the delimiter **d**
 *
 * if the iterable is empty, always returns an empty string
 */
export declare const joinWith: (d: string) => (xs: Iterable<string>) => string;
/** test if every member of collection **XS** passes the testing function **F** */
export declare function every<T>(f: Unary<T, boolean>): (xs: Iterable<T>) => boolean;
/** test if at least one member of collection **XS** passes the testing function **F** */
export declare function some<T>(f: Unary<T, boolean>): (xs: Iterable<T>) => boolean;
/** test if an argument **X** passes all the functions **FS** */
export declare function and<T>(...fs: Unary<T, boolean>[]): (x: T) => boolean;
/** test if an argument **X** passes at least one function of **FS** */
export declare function or<T>(...fs: Unary<T, boolean>[]): (x: T) => boolean;
/** limit iterable to N members */
export declare function limit(n: number): <T>(xs: Iterable<T>) => Iterable<T>;
/** infinitely repeat an iterable */
export declare function repeat<T>(xs: Iterable<T>): Iterable<T>;
/** prepend an index to an iterable */
export declare function enumerate<T>(xs: Iterable<T>): Iterable<[number, T]>;
/**
 * Apply a function to pairs of elements at the same index in two iterables, collecting the results in a new iterable.
 *
 * If one iterable is longer, elements will be discarded from the longer iterable.
 */
export declare function zipWith<A, B, C>(f: Binary<A, B, C>): (as: Iterable<A>) => (bs: Iterable<B>) => Iterable<C>;
export declare const zip: <A, B>(as: Iterable<A>) => (bs: Iterable<B>) => Iterable<[A, B]>;
/** execute a function on each member of a collection
 *
 * - `f` — the function to execute
 * - `xs` — the collection
 */
export declare function each<T>(f: (x: T) => void): (xs: Iterable<T>) => void;
/** partition iterable in two halves depending on a boolean function
 *
 * elements for which the function returns true are inserted to the right
 *
 * elements for which the function returns false are inserted to the left
 */
export declare function partition<A, B extends A>(f: UnaryP<A, B>): (xs: Iterable<A>) => [Array<Exclude<A, B>>, B[]];
export declare function partition<A, L, R>(f: Unary<A, boolean>): (xs: Iterable<A>) => [L[], R[]];
/** search a collection for the first item for which a function returns true */
export declare function find<T>(f: Unary<T, boolean>): (xs: Iterable<T>) => Option<T>;
/** given several functions, return the first item for which each function returns true */
export declare function multifind<T>(a: Unary<T, boolean>, b: Unary<T, boolean>): (xs: Iterable<T>) => [Option<T>, Option<T>];
export declare function multifind<T>(a: Unary<T, boolean>, b: Unary<T, boolean>, c: Unary<T, boolean>): (xs: Iterable<T>) => [Option<T>, Option<T>, Option<T>];
export declare function multifind<T>(a: Unary<T, boolean>, b: Unary<T, boolean>, c: Unary<T, boolean>, d: Unary<T, boolean>): (xs: Iterable<T>) => [Option<T>, Option<T>, Option<T>, Option<T>];
export declare function multifind<T>(a: Unary<T, boolean>, b: Unary<T, boolean>, c: Unary<T, boolean>, d: Unary<T, boolean>, e: Unary<T, boolean>): (xs: Iterable<T>) => [Option<T>, Option<T>, Option<T>, Option<T>, Option<T>];
/** search a collection for the index of first item for which a function returns true */
export declare function findIndex<T>(f: Unary<T, boolean>): (x: Iterable<T>) => Option<number>;
/** find the optimal value in an iterable (typically minimum or maximum)
 *
 * the definition of optimality is defermined by repeated application of a comparison function.
 *
 * returns undefined on empty iterables
 *
 * - `f` — the comparison function. use `maths/gt` for maximum, and `maths/lt` for minimum
 * - `xs` — the iterable
 */
export declare function optimum<A>(f: Binary<A, A, boolean>): (xs: Iterable<A>) => Option<A>;
/** find the optimal value in an iterable (typically minimum or maximum)
 *
 * the definition of optimality is defermined by repeated application of a comparison function.
 *
 * before comparing, first map the elements of the iterables through a mapping function to get proper values
 *
 * returns undefined on empty iterables
 *
 * - `map` — the function determining how we get values to be compared out of the elements of the iterables
 * - `f` — the comparison function. use `maths/gt` for maximum, and `maths/lt` for minimum
 * - `xs` — the iterable
 */
export declare function optimumBy<A, B>(map: Unary<A, B>): (comp: Binary<B, B, boolean>) => (xs: Iterable<A>) => Option<A>;
/** returns true if any element is truthy */
export declare function any(xs: Iterable<any>): boolean;
/** returns true if every element is truthy */
export declare function all(xs: Iterable<any>): boolean;
/** flattens an iterable of iterables into a continuous iterable */
export declare function flatten<T>(xs: Iterable<Iterable<T>>): Iterable<T>;
export declare function batch(n: number): <T>(xs: Iterable<T>) => Iterable<T[]>;
export declare function count<T>(xs: Iterable<T>): Map<T, number>;
/** generate integers from `start` until `end`, inclusive */
export declare function seq(start: number, end: number): Generator<number, void, unknown>;
/** yields all possible combinations of pairs between two iterables, **As** and **Bs** */
export declare function combinations<A>(as: Iterable<A>): <B>(bs: Iterable<B>) => Iterable<[A, B]>;
