import { Unary } from './data';
export declare const of: <A, B>(a: A, b: B) => [A, B];
export declare const duad: <A>(a: A) => <B>(b: B) => [A, B];
export declare function prefix<A, B>(f: Unary<A, B>): (x: A) => [B, A];
export declare function suffix<A, B>(f: Unary<A, B>): (x: A) => [A, B];
export declare function flip<A, B>(x: [A, B]): [B, A];
export declare function mapr<A, B>(f: Unary<A, B>): <C>(xs: [C, A]) => [C, B];
export declare function mapl<A, B>(f: Unary<A, B>): <C>(xs: [A, C]) => [B, C];
