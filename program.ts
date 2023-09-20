import { I } from './combinator'
import type { Cont } from './cont'
import type { Unary } from './data'

/** program monad, modelling any abstract program
 *
 * given an interpreter that receives commands, run the commands and return the results as a continuation
 */
export type Program<I, O> = Unary<I, Cont<O>>

/** runs a program, outputing nothing */
export const run = <I>(i: I) => <O>(x: Program<I, O>) => x(i)(() => undefined)

/** runs a program and logs its result */
export const run_logging = <I>(i: I) => <O>(x: Program<I, O>) => x(i)(console.log)

/** runs a program and returns its result */
export const run_returning = <I>(i: I) => <O>(x: Program<I, O>) => x(i)(I)

/** given a mapping **A** -> **B** and any **Program A**, create a **Program B** */
export const map = <A, B>(f: Unary<A, B>) => <I>(x: Program<I, A>): Program<I, B> =>
	i => k => x(i)(x => k(f(x)))

/** given a mapping **A** -> **Program B**, and any **Program A**, create a **Program B**
 *
 * the new **Program B** additionally merges the interpreters of **Program A** and **Program B**, allowing arbitrary programs to be composed
 */
export const bind = <I, A, B>(f: Unary<A, Program<I, B>>) => <J>(x: Program<J, A>): Program<I & J, B> =>
	i => k => x(i)(x => f(x)(i)(k))
