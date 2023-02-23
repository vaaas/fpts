import { Unary } from './data';
export declare const of: <T>(x: Iterable<T>) => Set<T>;
export declare const inside: <T>(xs: Set<T>) => (x: T) => boolean;
export declare const outside: <T>(xs: Set<T>) => (x: T) => boolean;
export declare const map: <A, B>(f: Unary<A, B>) => (xs: Set<A>) => Set<B>;
export declare const diff: <T>(as: Set<T>) => (bs: Set<T>) => Set<T>;
export declare const filter: <T>(f: Unary<T, boolean>) => (xs: Set<T>) => Set<T>;