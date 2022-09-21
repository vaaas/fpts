import { Binary, Unary } from './data';

export const of = <A, B>(a: A, b: B): [A, B] => [a, b];

export const duad = <A>(a: A) => <B>(b: B): [A, B] => [a, b]

export function prefix<A, B>(f: Unary<A, B>): (x: A) => [B, A] {
	return function(x) {
		return [f(x), x]
	}
}

export function suffix<A, B>(f: Unary<A, B>): (x: A) => [A, B] {
	return function(x) {
		return [x, f(x)]
	}
}

/** map for duads
 *
 * transform a duad [A, B] into a duad [C, D] through a binary function f
 */
export function map<A, B, C, D>(f: Binary<A, B, [C, D]>): (x: [A, B]) => [C, D] {
	return function(x) {
		return f(left(x))(right(x))
	}
}

/** map for duads for the left value */
export function mapl<A, B, C>(f: Unary<A, C>): (x: [A, B]) => [C, B] {
	return function(x) {
		return [f(left(x)), right(x)]
	}
}

/** map for duads for the right value */
export function mapr<A, B, C>(f: Unary<B, C>): (x: [A, B]) => [A, C] {
	return function(x) {
		return [left(x), f(right(x))]
	}
}

/** apply the two values of a duad to a binary function */
export function into<A, B, C>(f: Binary<A, B, C>): (x: [A, B]) => C {
	return function(x) {
		return f(left(x))(right(x))
	}
}

export function left<A, B>(x: [A, B]): A {
	return x[0]
}

export function right<A, B>(x: [A, B]): B {
	return x[1]
}

export function leftAs<A, B, C>(f: Unary<A, C>): (x: [A, B]) => C {
	return function(x) {
		return f(left(x))
	}
}

export function rightAs<A, B, C>(f: Unary<B, C>): (x: [A, B]) => C {
	return function(x) {
		return f(right(x))
	}
}
