import { Unary, Binary, NoValue } from './data.ts'

/** represents the left type */
type Left<X> = [X, typeof NoValue]

/** represents the right type */
type Right<X> = [typeof NoValue, X]

/** represents a value that can have one of two distinct types, left or right */
type Either<A, B> = Left<A> | Right<B>

/** construct a left type */
export const left = <X>(x: X): Left<X> => [x, NoValue]

/** constructs a right type */
export const right = <X>(x: X): Right<X> => [NoValue, x]

/** returns `true` if a value is left */
export const isLeft = <A, B>(x: Either<A, B>): x is Left<A> => x[1] === NoValue

/** returns `true` if a value is right */
export const isRight = <A, B>(x: Either<A, B>): x is Right<B> => x[0] === NoValue

/** folds both cases of an either into a single value
 *
 * requires two mappings, one for the left, and one for the right
 */
export const either = <A, C>(l: Unary<A, C>) => <B>(r: Unary<B, C>) => (x: Either<A, B>): C => isLeft(x) ? l(x[0]) : r(x[1])

/** extracts all the lefts from an iterable */
export function* lefts<A, B>(xs: Iterable<Either<A, B>>): Iterable<A> {
    for (const x of xs)
        if (isLeft(x))
            yield x[0]
}

/** extracts all the rights from an iterable */
export function* rights<A, B>(xs: Iterable<Either<A, B>>): Iterable<B> {
    for (const x of xs)
        if (isRight(x))
            yield x[1]
}

/** unwraps a left value from an either. if the either is a right, use the default value */
export const fromLeft = <A>(d: A) => <B>(x: Either<A, B>): A => isLeft(x) ? x[0] : d

/** unwraps a right value from an either. if the either is a left, use the default value */
export const fromRight = <B>(d: B) => <A>(x: Either<A, B>): B => isRight(x) ? x[1] : d

/** splits a sequence of eithers into an array of lefts and an array of rights in one step */
export function partition<A, B>(xs: Iterable<Either<A, B>>): [A[], B[]] {
    const ls: A[] = []
    const rs: B[] = []
    for (const x of xs)
        if (isLeft(x))
            ls.push(x[0])
        else
            rs.push(x[1])
    return [ls, rs]
}

/** transforms the right value of an either, leaving the left one intact */
export const map = <B, C>(f: Unary<B, C>) => <A>(x: Either<A, B>): Either<A, C> => isRight(x) ? [x[0], f(x[1])] : x

/** transforms the right value of an either, leaving the left one intact
 *
 * transformation function returns another either, and is flattened
 */
export const bind = <A, B, C>(f: Unary<B, Either<A, C>>) => (x: Either<A, B>): Either<A, C> => isRight(x) ? f(x[1]) : x

/** lifts a binary function to accept two eithers */
export const lift2 = <A, B, C>(f: Binary<A, B, C>) => <D>(a: Either<D, A>) => (b: Either<D, B>): Either<D, C> => {
    if (isLeft(a))
        return a
    else if (isLeft(b))
        return b
    else
        return [NoValue, f(a[1])(b[1])]
}

/** lifts a binary function to accept two eithers
 *
 * the function returns another either, and is flattened
 */
export const liftM2 = <A, B, C, D>(f: Binary<A, B, Either<D, C>>) => (a: Either<D, A>) => (b: Either<D, B>): Either<D, C> => {
    if (isLeft(a))
        return a
    else if (isLeft(b))
        return b
    else
        return f(a[1])(b[1])
}

/** flattens a nested either into a single layer */
export const flatten = <A, B>(x: Either<A, Either<A, B>>): Either<A, B> => isLeft(x) ? x : x[1]
