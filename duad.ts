import type { Unary } from './data.ts'

export const of = <A, B>(a: A, b: B): [A, B] => [a, b]

export const duad = <A>(a: A) => <B>(b: B): [A, B] => [a, b]

export const prefix = <A, B>(f: Unary<A, B>) => (x: A): [B, A] => [f(x), x]

export const suffix = <A, B>(f: Unary<A, B>) => (x: A): [A, B] => [x, f(x)]

export const flip = <A, B>(x: [A, B]): [B, A] => [x[1], x[0]]

export const mapr = <A, B>(f: Unary<A, B>) => <C>(xs: [C, A]): [C, B] => [xs[0], f(xs[1])]

export const mapl = <A, B>(f: Unary<A, B>) => <C>(xs: [A, C]): [B, C] => [f(xs[0]), xs[1]]
