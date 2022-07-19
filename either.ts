import { NoValue } from './data';

export class Either<A, B> {
	left: A | typeof NoValue;
	right: B | typeof NoValue;

	constructor(left: A | typeof NoValue, right: B | typeof NoValue) {
		this.left = left
		this.right = right
	}
}

export function left<A, B>(left: A): Either<A, B> {
	return new Either(left, NoValue) as any as Either<A, B>
}

export function right<A, B>(right: B): Either<A, B> {
	return new Either(NoValue, right) as any as Either<A, B>
}

export function map<A, B, C>(f: (x: B) => C): (either: Either<A, B>) => Either<A, C> {
	return function (either) {
		if (either.left === NoValue)
			return right(f(either.right as B)) as Either<A, C>
		else
			return this as any as Either<A, C>
	}
}

export function bind<A, B, C, D>(f: (x: B) => Either<C, D>): (either: Either<A, B>) => Either<C, D> {
	return function(either) {
		if (either.left === NoValue)
			return f(either.right as B)
		else
			return this as any as Either<C, D>
	}
}

export function fold<A, B, C>(f: (x: A) => C, g: (x: B) => C): (either: Either<A, B>) => C {
	return function(either) {
		if (this.left === NoValue)
			return g(this.right as B)
		else
			return f(this.left as A)
	}
}
