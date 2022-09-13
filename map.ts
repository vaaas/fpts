import { Unary } from './data';
import { Option } from './option';
import { tail } from './array';

export function pop<K>(k: K): <V>(xs: Map<K, V>) => Option<V> {
    return function (xs) {
        const v = xs.get(k);
        xs.delete(k);
        return v;
    }
}

export function set<K>(k: K): <V>(x: V) => (xs: Map<K, V>) => Map<K, V> {
    return function(x) {
        return function (xs) {
            if (xs.has(k)) xs.delete(k)
            return xs.set(k, x)
        };
    };
}

export function of<A, B>(xs: Iterable<[A, B]>): Map<A, B> {
    return new Map(xs);
}

export function values<A, B>(xs: Map<A, B>): Iterable<B> {
    return xs.values();
}

export function keys<A, B>(xs: Map<A, B>): Iterable<A> {
    return xs.keys();
}

export function get<A, B>(k: A): (xs: Map<A, B>) => Option<B> {
    return function (xs) {
        return xs.get(k)
    }
}

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
