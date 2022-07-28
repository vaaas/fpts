import { Unary, Binary } from './data'

export type Entries<T> = Array<{
    [K in keyof T]: [K, T[K]]
}[keyof T]>

export function entries<T extends Record<string, any>>(o: T): Entries<T> {
    return Object.entries(o)
}

export function fromEntries<T extends Record<string, any>>(xs: Entries<T>): T {
    return Object.fromEntries(xs) as T
}

export function values<T extends object>(xs: T): Array<T[keyof T]> {
    return Object.values(xs)
}

export function map<A, B, K extends string>(f: Unary<A, B>): (x: Record<K, A>) => Record<K, B> {
    return function(xs) {
        const o: Record<string, B> = {}
        for (const [k, v] of entries(xs))
            o[k] = f(v)
        return o as Record<K, B>
    }
}

export function filter<A, K extends string>(f: Unary<A, boolean>): (x: Record<K, A>) => Partial<Record<K, A>> {
    return function (xs) {
        const o: Partial<Record<K, A>> = {}
        for (const [k, v] of entries(xs))
            if (f(v))
                o[k] = v
        return o
    }
}

export function foldl<A, B, K extends string>(f: Binary<B, A, B>, i: B): (xs: Record<K, A>) => B {
    return function(xs) {
        let a = i
        for (const x of values(xs))
            a = f(a)(x)
        return a
    }
}

export function foldr<A, B, K extends string>(f: Binary<A, B, B>, i: B): (xs: Record<K, A>) => B {
    return function(xs) {
        let a = i
        for (const x of values(xs))
            a = f(x)(a)
        return a
    }
}

/**
 * Set defaults on an object IN PLACE
 * returns the mutated object
 */
export function defaults<T extends object>(x: Partial<T>): (d: T) => T {
    return function(d) {
        for (const [k, v] of entries(d))
            if (!x.hasOwnProperty(k))
                x[k] = v
        return x as T;
    }
}
