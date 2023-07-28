import { Unary } from './data'
import { Result } from './result'
import { Right as RRight } from './result'

export type PromiseResult<T> = Promise<Result<T>>

type Acceptable<T> =
    PromiseResult<T>
    | Promise<T>
    | Result<T>
    | T

type Right<T> = RRight<Awaited<T>>

export function compose<A, B, C>
    (
        a: Unary<A, Acceptable<B>>,
        b: Unary<Right<B>, Acceptable<C>>,
    ): Unary<A, PromiseResult<C>>;
export function compose<A, B, C, D>
    (
        a: Unary<A, Acceptable<B>>,
        b: Unary<Right<B>, Acceptable<C>>,
        c: Unary<Right<C>, Acceptable<D>>,
    ): Unary<A, PromiseResult<D>>;
export function compose<A, B, C, D, E>
    (
        a: Unary<A, Acceptable<B>>,
        b: Unary<Right<B>, Acceptable<C>>,
        c: Unary<Right<C>, Acceptable<D>>,
        d: Unary<Right<D>, Acceptable<E>>,
    ): Unary<A, PromiseResult<E>>;
export function compose<A, B, C, D, E, F>
    (
        a: Unary<A, Acceptable<B>>,
        b: Unary<Right<B>, Acceptable<C>>,
        c: Unary<Right<C>, Acceptable<D>>,
        d: Unary<Right<D>, Acceptable<E>>,
        e: Unary<Right<E>, Acceptable<F>>,
    ): Unary<A, PromiseResult<F>>;
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
