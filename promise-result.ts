import type { Unary } from './data.ts'
import type { Result } from './result.ts'
import type { Right as RRight } from './result.ts'

export type PromiseResult<T> = Promise<Result<T>>

type Acceptable<T> =
    PromiseResult<T>
    | Promise<T>
    | Result<T>
    | T

export type Right<T> = RRight<Awaited<T>>

/** function composition from left to right for functions that return `Promise<Result<any>>`
 *
 * for ease of use, functions that return plain values, plain Promises, and plain Results (not `Promise<Result<any>>`) are also accepted
 *
 * if most arguments are unwrapped, you may want to use other variants of `compose` for performance reasons
 *
 * @param fs array of several functions that map any `x` to any `y`, where `y` can be any of the following: `any | Promise<any> | Result<any> | Promise<Result<any>>`
 *
 * @returns A new function from the argument of the very first function in `fs` to the result of the last function in `fs`, passing through each function in succession. Functions are unwrapped between executions, and if an error is encountered, execution immediately stops and the error is returned.
 *
 * @example
 * declare const fetch_user: (id: number) => Promise<object | Error>
 *
 * const print_user_if_exists = compose(
 *   (x: unknown) => typeof x === 'number' ? x : new Error(),
 *   (x: number) => fetch_user(x),
 *   (x: object) => console.log(x),
 * )
 *
 * // attempts to fetch, and if successful prints
 * print_user_if_exists(1)
 *
 * // returns an error since argument is not a number
 * print_user_if_exists('1')
 */
export function compose<A, B, C>
    (
        a: Unary<A, Acceptable<B>>,
        b: Unary<Right<B>, Acceptable<C>>,
    ): Unary<A, PromiseResult<Right<C>>>;
export function compose<A, B, C, D>
    (
        a: Unary<A, Acceptable<B>>,
        b: Unary<Right<B>, Acceptable<C>>,
        c: Unary<Right<C>, Acceptable<D>>,
    ): Unary<A, PromiseResult<Right<D>>>;
export function compose<A, B, C, D, E>
    (
        a: Unary<A, Acceptable<B>>,
        b: Unary<Right<B>, Acceptable<C>>,
        c: Unary<Right<C>, Acceptable<D>>,
        d: Unary<Right<D>, Acceptable<E>>,
    ): Unary<A, PromiseResult<Right<E>>>;
export function compose<A, B, C, D, E, F>
    (
        a: Unary<A, Acceptable<B>>,
        b: Unary<Right<B>, Acceptable<C>>,
        c: Unary<Right<C>, Acceptable<D>>,
        d: Unary<Right<D>, Acceptable<E>>,
        e: Unary<Right<E>, Acceptable<F>>,
    ): Unary<A, PromiseResult<Right<F>>>;
export function compose(...fs: Array<Unary<any, Acceptable<any>>>) {
    return async function (x: any) {
        let a = x
        for (const f of fs) {
            a = f(a)
            if (a instanceof Promise)
                a = await a
            if (a instanceof Error)
                return a
        }
        return a
    }
}

export const map = <A, B>(f: Unary<A, B>) => (x: PromiseResult<A>): PromiseResult<B> => x.then(x => x instanceof Error ? x : f(x));

export const bind = <A, B>(f: Unary<A, PromiseResult<B>>) => (x: PromiseResult<A>): PromiseResult<B> => x.then(x => x instanceof Error ? x : f(x));
