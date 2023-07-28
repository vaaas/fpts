import { Unary } from './data';
import { Result } from './result';
export type PromiseResult<T> = Promise<Result<T>>;
type Acceptable<T> = T | Result<T> | Promise<T> | PromiseResult<T>;
export declare function compose<A, B, C>(a: Unary<A, Acceptable<B>>, b: Unary<B, Acceptable<C>>): Unary<A, PromiseResult<C>>;
export declare function compose<A, B, C, D>(a: Unary<A, Acceptable<B>>, b: Unary<B, Acceptable<C>>, c: Unary<C, Acceptable<D>>): Unary<A, PromiseResult<D>>;
export declare function compose<A, B, C, D, E>(a: Unary<A, Acceptable<B>>, b: Unary<B, Acceptable<C>>, c: Unary<C, Acceptable<D>>, d: Unary<D, Acceptable<E>>): Unary<A, PromiseResult<E>>;
export declare function compose<A, B, C, D, E, F>(a: Unary<A, Acceptable<B>>, b: Unary<B, Acceptable<C>>, c: Unary<C, Acceptable<D>>, d: Unary<D, Acceptable<E>>, e: Unary<E, Acceptable<F>>): Unary<A, PromiseResult<F>>;
export {};
