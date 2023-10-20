import type { Unary } from './data.ts'
import { map } from './iter.ts'

type AList<A, B> = Iterable<[A, B]>

export const lefts: <A, B>(x: AList<A, B>) => Iterable<A> =
    map(x => x[0])

export const rights: <A, B>(x: AList<A, B>) => Iterable<B> =
    map(x => x[1])

export const mapr = <A, B>(f: Unary<A, B>): <K>(xs: AList<K, A>) => AList<K, B> =>
    map(x => [x[0], f(x[1])])

export const mapl = <A, B>(f: Unary<A, B>): <V>(xs: AList<A, V>) => AList<B, V> =>
    map(x => [f(x[0]), x[1]])
