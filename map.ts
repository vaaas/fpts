import { Unary } from './data.ts';
import { Option } from './option.ts';
import { tail } from './array.ts';

/** UNSAFE!
 *
 * remove a key from a map and return its value, if it exists
 */
export function pop<K>(k: K): <V>(xs: Map<K, V>) => Option<V> {
	return function (xs) {
		const v = xs.get(k);
		xs.delete(k);
		return v;
	}
}

/** UNSAFE!
 *
 * set a key to a value in a map
 */
export function set<K>(k: K): <V>(x: V) => (xs: Map<K, V>) => Map<K, V> {
	return function(x) {
		return function (xs) {
			if (xs.has(k)) xs.delete(k)
			return xs.set(k, x)
		};
	};
}

/** make a map out of any iterable of tuples */
export function of<A, B>(xs: Iterable<[A, B]>): Map<A, B> {
	return new Map(xs);
}

/** make a map out of any iterable of values
 *
 * keys are retrieved by the provided function
 */
export function ofV<V, K>(f: Unary<V, K>): (xs: Iterable<V>) => Map<K, V> {
	return function (xs) {
		const m = new Map<K, V>()
		for (const x of xs)
			m.set(f(x), x)
		return m
	}
}

/** make a map of maps of any iterable of values
 *
 * the maps are nested with as many levels as there are functions
 */
export function ofVN<V, K1>
	(f: Unary<V, K1>)
	: (xs: Iterable<V>)
	=> Map<K1, V>
export function ofVN<V, K1, K2>
	(f: Unary<V, K1>, g: Unary<V, K2>)
	: (xs: Iterable<V>)
	=> Map<K1, Map<K2, V>>
export function ofVN<V, K1, K2, K3>
	(f: Unary<V, K1>, g: Unary<V, K2>, h: Unary<V, K3>)
	: (xs: Iterable<V>)
	=> Map<K1, Map<K2, Map<K3, V>>>
export function ofVN<V, K1, K2, K3, K4>
	(f: Unary<V, K1>, g: Unary<V, K2>, h: Unary<V, K3>, i: Unary<V, K4>)
	: (xs: Iterable<V>)
	=> Map<K1, Map<K2, Map<K3, Map<K4, V>>>>
export function ofVN<V, K1, K2, K3, K4, K5>
	(f: Unary<V, K1>, g: Unary<V, K2>, h: Unary<V, K3>, i: Unary<V, K4>, j: Unary<V, K5>)
	: (xs: Iterable<V>)
	=> Map<K1, Map<K2, Map<K3, Map<K4, Map<K5, V>>>>>
export function ofVN(...fs: Array<Unary<any, any>>): (xs: Iterable<any>) => Map<any, any> {
	return function (xs) {
		if (fs.length === 1)
			return ofV(fs[0]!)(xs)
		else
			// @ts-ignore
			return update(ofVN(...tail(fs)))(groupBy(fs[0]!)(xs))
	}
}

/** make a map out of any iterable of keys
 *
 * values are retrieved by the provided function
 */
export function ofK<K, V>(f: Unary<K, V>): (xs: Iterable<K>) => Map<K, V> {
	return function (xs) {
		const m = new Map<K, V>()
		for (const x of xs)
			m.set(x, f(x))
		return m
	}
}

/** make a map out of any iterable
 *
 * keys are retrieved by the first function, and values by the second
 */
export function ofKV<T, K>(f: Unary<T, K>) {
	return function<V>(g: Unary<T, V>) {
		return function (xs: Iterable<T>): Map<K, V> {
			const m = new Map<K, V>()
			for (const x of xs)
				m.set(f(x), g(x))
			return m
		}
	}
}

/** make a map's keys its values and vice versa */
export function invert<K, V>(xs: Map<K, V>): Map<V, K> {
	const m = new Map<V, K>()
	for (const [k, v] of xs)
		m.set(v, k)
	return m
}

/** retrieve all of a map's values as an iterable */
export function values<A, B>(xs: Map<A, B>): Iterable<B> {
	return xs.values();
}

/** retrieve all of a map's keys as an iterable */
export function keys<A, B>(xs: Map<A, B>): Iterable<A> {
	return xs.keys();
}

/** get a value out of a map using a key */
export function get<K, A extends K>(k: A): <B>(xs: Map<K, B>) => Option<B> {
	return function (xs) {
		return xs.get(k)
	}
}

/** get a value out of a map using a key unsafely (ignoring undefined checks) */
export function unsafeGet<K>(k: K): <V>(xs: Map<K, V>) => V {
    return function (xs) {
        return xs.get(k)!
    }
}

/** get a value out of a map using a key unsafely (ignoring undefined checks) */
export function unsafeGetFrom<K, V>(xs: Map<K, V>) {
    return function(k: K) {
        return xs.get(k)!
    }
}

/** **UNSAFE**
 *
 * given a mapping from **A** to **B**, update a Map of **As** into a Map of **Bs** **in place**
 */
export function update<K, A, B>(f: Unary<A, B>): (xs: Map<K, A>) => Map<K, B> {
	return function (xs) {
		for (const [k, v] of xs)
			(xs as any as Map<K, B>).set(k, f(v));
		return xs as any as Map<K, B>;
	}
}

/** group an iterable of **As** into a Map of **As**, where the keys are the values they are grouped under
 *
 * the key is provided by a key function **f**
 */
export function groupBy<V, K>(f: Unary<V, K>): (xs: Iterable<V>) => Map<K, V[]> {
	return function(xs) {
		const groups: Map<K, V[]> = new Map();
		for (const x of xs) {
			const g = f(x);
			if (groups.has(g)) groups.get(g)!.push(x);
			else groups.set(g, [x]);
		}
		return groups;
	}
}

/** recursively group an iterable of **As** into a Map of Maps of **As**, where the keys are the values they are grouped under
 *
 * the Maps are nested with as many levels as the number of provided key functions
 */
export function groupByN<V, K1>
	(f: Unary<V, K1>):
	(xs: Iterable<V>)
	=> Map<K1, V[]>
export function groupByN<V, K1, K2>
	(f: Unary<V, K1>, g: Unary<V, K2>):
	(xs: Iterable<V>)
	=> Map<K1, Map<K2, V[]>>
export function groupByN<V, K1, K2, K3>
	(f: Unary<V, K1>, g: Unary<V, K2>, h: Unary<V, K3>):
	(xs: Iterable<V>)
	=> Map<K1, Map<K2, Map<K3, V[]>>>
export function groupByN<V, K1, K2, K3, K4>
	(f: Unary<V, K1>, g: Unary<V, K2>, h: Unary<V, K3>, i: Unary<V, K4>):
	(xs: Iterable<V>)
	=> Map<K1, Map<K2, Map<K3, Map<K4, V[]>>>>
export function groupByN<V, K1, K2, K3, K4, K5>
	(f: Unary<V, K1>, g: Unary<V, K2>, h: Unary<V, K3>, i: Unary<V, K4>, j: Unary<V, K5>):
	(xs: Iterable<V>)
	=> Map<K1, Map<K2, Map<K3, Map<K4, Map<K5, V[]>>>>>
export function groupByN<V>(...fs: Array<Unary<V, any>>): (xs: Iterable<V>) => Map<any, any> {
	return function(xs) {
		if (fs.length === 1)
			return groupBy(fs[0]!)(xs);
		else
			// @ts-ignore
			return update(groupByN(...tail(fs)))(groupBy(fs[0]!)(xs));
	}
}

export function map<A, B>(f: Unary<A, B>) {
	return function <K>(xs: Map<K, A>): Map<K, B> {
		const m: Map<K, B> = new Map()
		for (const [k, v] of xs)
			m.set(k, f(v))
		return m
	}
}

export function map2<K1, K2>(f: Unary<K1, K2>) {
	return function <V1, V2>(g: Unary<V1, V2>) {
		return function (xs: Map<K1, V1>): Map<K2, V2> {
			const m: Map<K2, V2> = new Map()
			for (const [k, v] of xs)
				m.set(f(k), g(v))
			return m
		}
	}
}

export function mapKeys<A, B>(f: Unary<A, B>) {
    return function<V>(xs: Map<A, V>): Map<B, V> {
        const ys = new Map<B, V>
        for (const [k, v] of xs.entries())
            ys.set(f(k), v)
        return ys
    }
}

export const inside =
	<K, V>(xs: Map<K, V>) =>
	<U>(x: U | K): x is K =>
	xs.has(x as K)

export const outside =
	<K, V>(xs: Map<K, V>) =>
	<U>(x: U | K): x is U =>
	!xs.has(x as K)

/** create a copy of a map */
export function copy<K, V>(xs: Map<K, V>): Map<K, V> {
    const ys = new Map<K, V>()
    for (const pair of xs)
        ys.set(pair[0], pair[1])
    return ys
}

/** combine two maps, returning a new map containing all the entries of the first map, plus the entries of the second map */
export const concat = <A, B>(xs: Map<A, B>) => (ys: Map<A, B>): Map<A, B> => {
    const zs = new Map(xs.entries())
    for (const [a, b] of ys.entries())
        zs.set(a, b)
    return zs
}

/** combine two maps in place, putting all the entries of the first map into the second map */
export const concat_ip = <A, B>(xs: Map<A, B>) => (ys: Map<A, B>) => {
    for (const [k, v] of xs.entries())
        ys.set(k, v)
    return ys

}

/** delete all entries of a map in place */
export function empty<T extends Map<any, any>>(xs: T): T {
    for (const k of xs.keys())
        xs.delete(k)
    return xs
}

/** transform a map of promises into a promise of a map of awaited values
 *
 * @param xs map of promises
 * @returns a map with identical keys, but its promises are resolved
 */
export async function awaited<K, V>(xs: Map<K, Promise<V> | V>): Promise<Map<K, Awaited<V>>> {
    const ys = new Map<K, Awaited<V>>();
    for (const [k, v] of xs)
        ys.set(k, await v)
    return ys;
}
