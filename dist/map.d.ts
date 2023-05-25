import { Unary } from './data';
import { Option } from './option';
/** UNSAFE!
 *
 * remove a key from a map and return its value, if it exists
 */
export declare function pop<K>(k: K): <V>(xs: Map<K, V>) => Option<V>;
/** UNSAFE!
 *
 * set a key to a value in a map
 */
export declare function set<K>(k: K): <V>(x: V) => (xs: Map<K, V>) => Map<K, V>;
/** make a map out of any iterable of tuples */
export declare function of<A, B>(xs: Iterable<[A, B]>): Map<A, B>;
/** make a map out of any iterable of values
 *
 * keys are retrieved by the provided function
 */
export declare function ofV<V, K>(f: Unary<V, K>): (xs: Iterable<V>) => Map<K, V>;
/** make a map of maps of any iterable of values
 *
 * the maps are nested with as many levels as there are functions
 */
export declare function ofVN<V, K1>(f: Unary<V, K1>): (xs: Iterable<V>) => Map<K1, V>;
export declare function ofVN<V, K1, K2>(f: Unary<V, K1>, g: Unary<V, K2>): (xs: Iterable<V>) => Map<K1, Map<K2, V>>;
export declare function ofVN<V, K1, K2, K3>(f: Unary<V, K1>, g: Unary<V, K2>, h: Unary<V, K3>): (xs: Iterable<V>) => Map<K1, Map<K2, Map<K3, V>>>;
export declare function ofVN<V, K1, K2, K3, K4>(f: Unary<V, K1>, g: Unary<V, K2>, h: Unary<V, K3>, i: Unary<V, K4>): (xs: Iterable<V>) => Map<K1, Map<K2, Map<K3, Map<K4, V>>>>;
export declare function ofVN<V, K1, K2, K3, K4, K5>(f: Unary<V, K1>, g: Unary<V, K2>, h: Unary<V, K3>, i: Unary<V, K4>, j: Unary<V, K5>): (xs: Iterable<V>) => Map<K1, Map<K2, Map<K3, Map<K4, Map<K5, V>>>>>;
/** make a map out of any iterable of keys
 *
 * values are retrieved by the provided function
 */
export declare function ofK<K, V>(f: Unary<K, V>): (xs: Iterable<K>) => Map<K, V>;
/** make a map out of any iterable
 *
 * keys are retrieved by the first function, and values by the second
 */
export declare function ofKV<T, K>(f: Unary<T, K>): <V>(g: Unary<T, V>) => (xs: Iterable<T>) => Map<K, V>;
/** make a map's keys its values and vice versa */
export declare function invert<K, V>(xs: Map<K, V>): Map<V, K>;
/** retrieve all of a map's values as an iterable */
export declare function values<A, B>(xs: Map<A, B>): Iterable<B>;
/** retrieve all of a map's keys as an iterable */
export declare function keys<A, B>(xs: Map<A, B>): Iterable<A>;
/** get a value out of a map using a key */
export declare function get<K, A extends K>(k: A): <B>(xs: Map<K, B>) => Option<B>;
/** get a value out of a map using a key unsafely (ignoring undefined checks) */
export declare function unsafeGet<K>(k: K): <V>(xs: Map<K, V>) => V;
/** get a value out of a map using a key unsafely (ignoring undefined checks) */
export declare function unsafeGetFrom<K, V>(xs: Map<K, V>): (k: K) => NonNullable<V>;
/** **UNSAFE**
 *
 * given a mapping from **A** to **B**, update a Map of **As** into a Map of **Bs** **in place**
 */
export declare function update<K, A, B>(f: Unary<A, B>): (xs: Map<K, A>) => Map<K, B>;
/** group an iterable of **As** into a Map of **As**, where the keys are the values they are grouped under
 *
 * the key is provided by a key function **f**
 */
export declare function groupBy<V, K>(f: Unary<V, K>): (xs: Iterable<V>) => Map<K, V[]>;
/** recursively group an iterable of **As** into a Map of Maps of **As**, where the keys are the values they are grouped under
 *
 * the Maps are nested with as many levels as the number of provided key functions
 */
export declare function groupByN<V, K1>(f: Unary<V, K1>): (xs: Iterable<V>) => Map<K1, V[]>;
export declare function groupByN<V, K1, K2>(f: Unary<V, K1>, g: Unary<V, K2>): (xs: Iterable<V>) => Map<K1, Map<K2, V[]>>;
export declare function groupByN<V, K1, K2, K3>(f: Unary<V, K1>, g: Unary<V, K2>, h: Unary<V, K3>): (xs: Iterable<V>) => Map<K1, Map<K2, Map<K3, V[]>>>;
export declare function groupByN<V, K1, K2, K3, K4>(f: Unary<V, K1>, g: Unary<V, K2>, h: Unary<V, K3>, i: Unary<V, K4>): (xs: Iterable<V>) => Map<K1, Map<K2, Map<K3, Map<K4, V[]>>>>;
export declare function groupByN<V, K1, K2, K3, K4, K5>(f: Unary<V, K1>, g: Unary<V, K2>, h: Unary<V, K3>, i: Unary<V, K4>, j: Unary<V, K5>): (xs: Iterable<V>) => Map<K1, Map<K2, Map<K3, Map<K4, Map<K5, V[]>>>>>;
export declare function map<A, B>(f: Unary<A, B>): <K>(xs: Map<K, A>) => Map<K, B>;
export declare function map2<K1, K2>(f: Unary<K1, K2>): <V1, V2>(g: Unary<V1, V2>) => (xs: Map<K1, V1>) => Map<K2, V2>;
export declare function mapKeys<A, B>(f: Unary<A, B>): <V>(xs: Map<A, V>) => Map<B, V>;
export declare const inside: <K, V>(xs: Map<K, V>) => <U>(x: K | U) => x is K;
export declare const outside: <K, V>(xs: Map<K, V>) => <U>(x: K | U) => x is U;
/** create a copy of a map */
export declare function copy<K, V>(xs: Map<K, V>): Map<K, V>;
/** combine two maps, returning a new map containing all the entries of the first map, plus the entries of the second map */
export declare const concat: <A, B>(xs: Map<A, B>) => (ys: Map<A, B>) => Map<A, B>;
/** combine two maps in place, putting all the entries of the first map into the second map */
export declare const concat_ip: <A, B>(xs: Map<A, B>) => (ys: Map<A, B>) => Map<A, B>;
/** delete all entries of a map in place */
export declare function empty<T extends Map<any, any>>(xs: T): T;
