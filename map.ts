import { Option } from './option';

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
