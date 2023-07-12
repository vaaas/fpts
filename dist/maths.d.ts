/** return a random integer in the range [a, b) */
export declare function randint(a: number, b: number): number;
/** flip the sign of a number */
export declare function neg(x: number): number;
/** return the sign of a number */
export declare function sign(x: number): -1 | 0 | 1;
/** add two numbers */
export declare function add(a: number): (b: number) => number;
/** multiply two numbers */
export declare function mult(a: number): (b: number) => number;
/** divide two numbers */
export declare function div(a: number): (b: number) => number;
/** the natural numbers. infinite iterable */
export declare function Naturals(): Generator<number, void, unknown>;
/** the integers. infinite iterable */
export declare function Integers(): Generator<number, void, unknown>;
/** the grandi series */
export declare function Grandi(): Generator<number, void, unknown>;
export declare function clamp(min: number, max: number): (x: number) => number;
/** create a sequence of integers starting from min and ending in max (inclusive) */
export declare function seq(min: number, max: number): Iterable<number>;
export declare const gt: (a: number) => (b: number) => boolean;
export declare const gte: (a: number) => (b: number) => boolean;
export declare const lt: (a: number) => (b: number) => boolean;
export declare const lte: (a: number) => (b: number) => boolean;
export declare const eq: (a: any) => (b: any) => boolean;
export declare const proximate: (e: number) => (a: number) => (b: number) => boolean;
export declare const is: <T>(a: T) => (b: unknown) => b is T;
export declare const isnt: <A>(a: A) => <B>(b: A | B) => b is B;
/** increment for cyclical numbers */
export declare const cyclical_increment: (start: number, end: number) => (x: number) => number;
/** decrement for cyclical numbers */
export declare const cyclical_decrement: (start: number, end: number) => (x: number) => number;
