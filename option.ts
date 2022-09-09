import { Binary, Unary, Nullary } from './data'

/** an optional value is a union of undefined or a value.
 *
 * in other words, it defines the Maybe monad as a union
 */
export type Option<T> = undefined | T

/** given a transformation **A** → **B**
 * apply it to an optional **A** only if it isn't undefined
 * such that it becomes an optional **B**
 */
export function map<A, B>(f: Unary<A, B>): Unary<Option<A>, Option<B>> {
    return function (x) {
        if (x === undefined)
            return undefined
        else
            return f(x)
    }
}

/** given a transformation **A** → **Optional B**
 * apply it to an optional **A** only if it isn't undefined
 * such that it becomes an optional **B**
 */
export function bind<A, B>(f: Unary<A, Option<B>>): Unary<Option<A>, Option<B>> {
    return function(x) {
        if (x === undefined)
            return undefined
        else
            return f(x)
    }
}

/** apply an optional value **A** to an *optional* transformation **A** → **B**, producing an optional **B** */
export function apply<A>(x: Option<A>): <B>(f: Option<Unary<A, B>>) => Option<B> {
    return function (f) {
        if (x === undefined || f === undefined)
            return undefined
        else
            return f(x)
    }
}

/** apply a transformation **A** → **B** to an optional **A**, returning **B**.
 * if the optional is undefined, instead of applying the function, instead return the default value **d**.
 */
export function maybe<A, B>(d: B, f: Unary<A, B>): (x: Option<A>) => B {
    return function (x) {
        if (x === undefined)
            return d
        else
            return f(x)
    }
}

/** identical to *maybe*, however the default value is provided as a function instead of a value.
 *
 * because javascript isn't lazily evaluated, this is useful for cases where the default value is expensive to compute.
 */
export function maybe_<A, B>(d: Nullary<B>, f: Unary<A, B>): (x: Option<A>) => Option<B> {
    return function (x) {
        if (x === undefined)
            return d()
        else
            return f(x)
    }
}

/** checks if the optional is an actual value (not undefined) */
export function isJust<T>(x: Option<T>): x is T {
    return x !== undefined
}

/** checks if the optional is undefined */
export function isNothing<T>(x: Option<T>): x is undefined {
    return x === undefined
}

/** *UNSAFELY* unwraps an optional */
export function unwrap<T>(x: Option<T>): T {
    return x as T
}

/** lift a binary function to operate on optional arguments */
export function lift2<A, B, C>(f: Binary<A, B, C>): (a: Option<A>) => (b: Option<B>) => Option<C> {
    return function (a) {
        return function (b) {
            if (a === undefined || b === undefined)
                return undefined
            else
                return f(a)(b)
        }
    }
}

/** extract from an iterable of options all the actual values as an array
 *
 * if at least one is undefined, return undefined prematurely as an optimisation
 */
 export function every<T>(xs: Iterable<Option<T>>): Option<Array<T>> {
    const ys: T[] = []
    for (const x of xs)
        if (isNothing(x))
            return x
        else
            ys.push(x)
    return ys
}
