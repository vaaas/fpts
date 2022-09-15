import { Unary, Binary } from './data'

export type Entries<T> = Array<{
    [K in keyof T]: [K, T[K]]
}[keyof T]>

/** return the entries of an object */
export function entries<T extends Record<string, any>>(o: T): Entries<T> {
    return Object.entries(o)
}

/** generate an object from its entries */
export function fromEntries<T extends Record<any, any>>(xs: Entries<T>): T {
    return Object.fromEntries(xs) as T;
}

/** return an array of an object's values */
export function values<T extends object>(xs: T): Array<T[keyof T]> {
    return Object.values(xs)
}

/** map implementation for objects
 *
 * given a mapping function **A** → **B** and an object of **As**,
 * return a new object of **Bs**
 */
export function map<A, B, K extends string>(f: Unary<A, B>): (x: Record<K, A>) => Record<K, B> {
    return function(xs) {
        const o: Record<string, B> = {}
        for (const [k, v] of entries(xs))
            o[k] = f(v)
        return o as Record<K, B>
    }
}

/** filter implementation for objects
 *
 * given a testing function **A** → *boolean* and an object of **As**
 * return a new object of only the **As** for which the testing function
 * returns *true*
 */
export function filter<A, K extends string>(f: Unary<A, boolean>): (x: Record<K, A>) => Partial<Record<K, A>> {
    return function (xs) {
        const o: Partial<Record<K, A>> = {}
        for (const [k, v] of entries(xs))
            if (f(v))
                o[k] = v
        return o
    }
}

/** filter implentation for objects, based on keys as well as values
 *
 * given a testing function **[K, A]** → *boolean* and an object of **As** with keys **Ks**
 * return a new object of only the **As** for which the testing function
 * returns *true*
 *
 * since the keys are also passed, it is possible to filter based on keys
 */
export function filterWithKeys<A, K extends string>(f: Binary<K, A, boolean>): (x: Record<K, A>) => Partial<Record<K, A>> {
    return function (xs) {
        const o: Partial<Record<K, A>> = {}
        for (const x of entries(xs))
            if (f(x[0])(x[1]))
                o[x[0]] = x[1]
        return o
    }
}


/** left fold for objects
 *
 * successively apply a binary function **A** → **B** → **A**
 * to a collection of **Bs**, accumulating the result into **A**
 *
 * finally, return the accumulated value
 *
 * the initial value is given by **i**
 */
export function foldl<A, B, K extends string>(f: Binary<B, A, B>, i: B): (xs: Record<K, A>) => B {
    return function(xs) {
        let a = i
        for (const x of values(xs))
            a = f(a)(x)
        return a
    }
}

/** right fold for objects
 *
 * successively apply a binary function **B** → **A** → **A**
 * to a collection of **Bs**, accumulating the result into **A**
 *
 * finally, return the accumulated value
 *
 * the initial value is given by **i**
 */
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

export function into<R extends Record<string|number|symbol, any>>(o: R): <K extends keyof R>(k: K) => (x: R[K]) => typeof o {
    return function (k) {
        return function (x) {
            o[k] = x
            return o
        }
    }
}

/** filter out keys of an object whose values are undefined */
export function defined<T extends Record<any, any>>(x: T): Partial<T> {
    const y: Partial<T> = {};
    for (const [k, v] of entries(x))
        if (v !== undefined)
            y[k] = v
    return y;
}

export function get<R extends Record<string|symbol, any>, K extends keyof R>(k: K): (x: R) => R[K] {
    return function (x) {
        return x[k]
    }
}

/** merge two objects into one object */
export function merge<T extends Record<string, any>>(a: Partial<T>): (b: T) => T {
    return function (b) {
        return { ...a, ...b }
    }
}
