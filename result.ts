import { Nullary, Unary, Binary } from './data'

/** the result type is either a value or an error.
 * in other words, it defines the Either monad as a type union.
 */
export type Result<T> = Error | T


/** given a transformation **A** → **B**
 * apply it to a result **A** only if it isn't an error
 * such that it becomes a result of **B**
 */
export function map<A, B>(f: Unary<A, B>): Unary<Result<A>, Result<B>> {
    return function (x) {
        if (x instanceof Error)
            return x
        else
            return f(x)
    }
}

/** given a transformation **A** → **Result B**
 * apply it to a result **A** only if it isn't an error
 * such that it becomes a result of **B**
 */
export function bind<A, B>(f: Unary<A, Result<B>>): Unary<Result<A>, Result<B>> {
    return function(x) {
        if (x instanceof Error)
            return x
        else
            return f(x)
    }
}

/** apply a result of **A** to a *result* transformation **A** → **B**, producing a result of **B** */
export function apply<A>(x: Result<A>): <B>(f: Result<Unary<A, B>>) => Result<B> {
    return function (f) {
        if (x instanceof Error)
            return x
        else if (f instanceof Error)
            return f
        else
            return f(x)
    }
}

/** apply a transformation **A** → **B** to a result **A**, returning **B**.
 * if the result is an error, instead pass it through the error handler, also returning **B**.
 */
export function fold<A, B>(handler: Unary<Error, B>, f: Unary<A, B>): (x: Result<A>) => B {
    return function (x) {
        if (x instanceof Error)
            return handler(x)
        else
            return f(x)
    }
}

/** checks if the result is an error */
export function isError<T>(x: Result<T>): x is Error {
    return x instanceof Error
}

/** checks if the result is an actual value (not an error) */
export function isNothing<T>(x: Result<T>): x is T {
    return !(x instanceof Error)
}

/** *UNSAFELY* unwraps a result */
export function unwrap<T>(x: Result<T>): T {
    return x as T
}

/** lift a binary function to operate on results */
export function lift2<A, B, C>(f: Binary<A, B, C>): (a: Result<A>) => (b: Result<B>) => Result<C> {
    return function (a) {
        return function (b) {
            if (a instanceof Error)
                return a
            if (b instanceof Error)
                return b
            else
                return f(a)(b)
        }
    }
}
