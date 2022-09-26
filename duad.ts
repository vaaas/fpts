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
