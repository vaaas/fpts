import { Option } from './option';

export function pop<K>(k: K): <V>(xs: Map<K, V>) => Option<V> {
    return function (xs) {
        const v = xs.get(k);
        xs.delete(k);
        return v;
    }
}
