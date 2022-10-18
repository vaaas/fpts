import { Unary, Binary } from './data'

/** Bluebird Combinator
 *
 * Pass an argument C to a unary function B. Before returning the result, pass it through a final filter, A.
 */
export function B<A, B, C>(a: Unary<B, C>): (b: Unary<A, B>) => (c: A) => C {
    return function (b) {
        return function(c) {
            return a(b(c));
        }
    }
}

/** Blackbird Combinator
 *
 * Pass two arguments, C and D, to a binary function B. Before returning the result, pass it through a final filter, A.
 */
export function B1<A, B, C, D>(a: Unary<C, D>): (b: Binary<A, B, C>) => (c: A) => (d: B) => D {
    return function (b) {
        return function (c) {
            return function (d) {
                return a(b(c)(d))
            }
        }
    }
}

/** Cardinal combinator
 *
 * Pass arguments B and C to a binary function A, in reverse (flipped).
 */
export function C<A, B, C>(a: Binary<A, B, C>): (b: B) => (c: A) => C {
    return function (b) {
        return function (c) {
            return a(c)(b)
        }
    }
}

/** Dovekies combinator
 *
 * Pass arguments D and E to a binary function A.
 * However, before passing them, filter D through the unary function B
 * and E through the unary function C.
 */
export function D<A, B, C, D, E>(a: Binary<A, B, C>): (b: Unary<D, A>) => (c: Unary<E, B>) => (d: D) => (e: E) => C {
    return function (b) {
        return function (c) {
            return function (d) {
                return function (e) {
                    return a(b(d))(c(e))
                }
            }
        }
    }
}

/** Dove combinator
 *
 * pass arguments *C* and *D* to a binary function *A*,
 * but first filter *D* through through the function *B*
 *
 * in other words, applies the filter on only the second argument
 */
export function D1<A, B, C>(a: Binary<A, B, C>): <D>(b: Unary<D, B>) => (c: A) => (d: D) => C {
	return function (b) {
		return function (c) {
			return function (d) {
				return a(c)(b(d))
			}
		}
	}
}

/** Lifting combinator.
 *
 * Transform a binary function from A to B so that it is a binary function of C to B.
 */
export const L =
	<A, B>(a: Binary<A, A, B>) =>
	<C>(b: Unary<C, A>) =>
	(c: C) =>
	(d: C): B =>
	a(b(c))(b(d))

/** Identity combinator.
 *
 * Simply returns its argument.
 */
export function I<T>(x: T): T {
    return x
}

/** Kestrel combinator (true/car).
 *
 * Always returns the first argument.
 */
export function K<T>(a: T): (b?: any[]) => T {
    return function (b) {
        return a
    }
}

/** Kite combinator (false/cdr).
 *
 * Always returns the second argument.
 */
export function KI<T>(a?: any): (y: T) => T {
    return function (b) {
        return b
    }
}

/** Thrush combinator.
 *
 * Accepts an argument for a unary function, then the function.
 */
export function T<A, B>(x: A): (f: Unary<A, B>) => B {
    return function (f) {
        return f(x)
    }
}

/** Starling prime combinator, AKA phoenix combinator.
 *
 * Apply argument D to a binary function A twice.
 * The first application is filtered through the unary function B.
 * The second application is filtered through the unary function C.
 *
 * In other words, applies the same argument twice, but through different filters.
 */
export function S<A, B, C, D>(a: Binary<A, B, C>): (b: Unary<D, A>) => (c: Unary<D, B>) => (d: D) => C {
    return function (b) {
        return function (c) {
            return function (d) {
                return a(b(d))(c(d))
            }
        }
    }
}

/** Vireo combinator AKA cons, pair.
 *
 * Accept two arguments for a binary function, then the binary function.
 */
export function V<A, B, C>(a: A): (b: B) => (c: Binary<A, B, C>) => C {
    return function (b) {
        return function (c) {
            return c(a)(b)
        }
    }
}

/** Warbler combinator AKA elementary duplicator
 *
 * Apply argument B to binary function A twice.
 */
export function W<A, B>(a: Binary<A, A, B>): (b: A) => B {
    return function (b) {
        return a(b)(b)
    }
}
