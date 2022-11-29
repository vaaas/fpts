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

export function flip<A, B>(x: [A, B]): [B, A] {
    return [x[1], x[0]];
}

export function mapr<A, B>(f: Unary<A, B>) {
    return function <C>(xs: [C, A]): [C, B] {
        return [xs[0], f(xs[1])]
    }
}

export function mapl<A, B>(f: Unary<A, B>) {
    return function <C>(xs: [A, C]): [B, C] {
        return [f(xs[0]), xs[1]]
    }
}
