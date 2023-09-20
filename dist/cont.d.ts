import { Unary } from './data';
/** continuation type, a type of suspended computation
 *
 * runs some kind of computation, and when it is done, perhaps asynchronously, passes it to a callback function
 */
export type Cont<T> = (k: (x: T) => void) => void;
/** given a mapping **A** -> **B** and a **Cont A**, return a **Cont B** */
export declare const map: <A, B>(f: Unary<A, B>) => (x: Cont<A>) => Cont<B>;
/** given a mapping **A** -> **Cont B** and a **Cont A**, return a **Cont B** */
export declare const bind: <A, B>(f: Unary<A, Cont<B>>) => (x: Cont<A>) => Cont<B>;
