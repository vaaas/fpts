import type { Unary } from './data.ts'

/** continuation type, a type of suspended computation
 *
 * runs some kind of computation, and when it is done, perhaps asynchronously, passes the result to a callback function
 */
export type Cont<T> = Unary<Unary<T, void>, void>

/** given a mapping **A** -> **B** and a **Cont A**, return a **Cont B** */
export const map = <A, B>(f: Unary<A, B>) => (x: Cont<A>): Cont<B> => k => x(x => k(f(x)))

/** given a mapping **A** -> **Cont B** and a **Cont A**, return a **Cont B** */
export const bind = <A, B>(f: Unary<A, Cont<B>>) => (x: Cont<A>): Cont<B> => k => x(x => f(x)(k))
