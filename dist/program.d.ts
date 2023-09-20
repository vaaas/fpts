import type { Cont } from './cont';
import type { Unary } from './data';
/** program monad, modelling any abstract program
 *
 * given an interpreter that receives commands, run the commands and return the results as a continuation
 */
export type Program<I, O> = Unary<I, Cont<O>>;
/** runs a program, outputing nothing */
export declare const run: <I, O>(i: I, f?: Unary<O, void>) => (x: Program<I, O>) => void;
/** given a mapping **A** -> **B** and any **Program A**, create a **Program B** */
export declare const map: <A, B>(f: Unary<A, B>) => <I>(x: Program<I, A>) => Program<I, B>;
/** given a mapping **A** -> **Program B**, and any **Program A**, create a **Program B**
 *
 * the new **Program B** additionally merges the interpreters of **Program A** and **Program B**, allowing arbitrary programs to be composed
 */
export declare const bind: <I, A, B>(f: Unary<A, Program<I, B>>) => <J>(x: Program<J, A>) => Program<I & J, B>;
